import { KANJI_REGEX } from "@/src/const";
import { MutationResolvers, WordInsertInput } from "@/types";
import { FieldValue } from "firebase-admin/firestore";
import { convertSnapshot } from "@/src/graphql/utils/convert";
import { prisma } from "@/src/db";
import { Prisma } from ".prisma/client";

async function convertGqlInputToPrismaInput(
  word: Omit<WordInsertInput, "id">
): Promise<Prisma.WordCreateArgs> {
  const { explain, tags, ..._word } = word;

  const kanji = await word.word.split("").reduce(async (acc, val) => {
    if (KANJI_REGEX.test(val)) {
      let kanjiDoc = await prisma.kanji.findUnique({ where: { id: val } });
      if (!kanjiDoc) {
        kanjiDoc = await prisma.kanji.create({ data: { id: val, hv: "" } });
      }
      return [...(await acc), kanjiDoc!.id];
    }
    return await acc;
  }, Promise.resolve([] as string[]));

  return {
    data: {
      ..._word,
      explain: {
        createMany: {
          data: explain,
        },
      },
      tags: {
        connect: tags?.map((id) => ({ id })),
      },
      kanji: {
        connect: kanji.map((id) => ({ id })),
      },
    },
    include: {
      explain: true,
    },
  };
}

const addNewWord: MutationResolvers["addNewWord"] = async (
  _: any,
  { word: { id: existId, ...word } },
  { cache, fsCollection }
) => {
  const arg = await convertGqlInputToPrismaInput(word);
  if (existId) {
    const rs = await prisma.word.update({
      where: { id: Number(existId) },
      ...arg,
    });
    await cache.invalidate([{ typename: "Word" }]);
    return rs as any;
  } else {
    const rs = await prisma.word.create(arg);
    await cache.invalidate([{ typename: "Word" }]);
    return rs as any;
  }
};

export default addNewWord;

export const setOppositeWord: MutationResolvers["setOppositeWord"] = async (
  _,
  { wordID, oppositeWordId },
  { fsCollection, firestore }
) => {
  const batch = firestore.batch();

  batch.update(fsCollection("vocabulary").doc(wordID), {
    opposite: FieldValue.arrayUnion(
      fsCollection("vocabulary").doc(oppositeWordId)
    ),
  });
  batch.update(fsCollection("vocabulary").doc(oppositeWordId), {
    opposite: FieldValue.arrayUnion(fsCollection("vocabulary").doc(wordID)),
  });

  await batch.commit();
  return convertSnapshot(await fsCollection("vocabulary").doc(wordID).get());
};
