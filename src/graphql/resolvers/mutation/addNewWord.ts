import { KANJI_REGEX } from "@/src/const";
import { MutationResolvers } from "@/types";
import { FieldValue } from "firebase-admin/firestore";
import { convertSnapshot } from "@/src/graphql/utils/convert";

const addNewWord: MutationResolvers["addNewWord"] = async (
  _: any,
  { word: { id: existId, tags: _tags = [], ...word } },
  { cache, fsCollection }
) => {
  const kanji = await word.word.split("").reduce(async (acc, val) => {
    if (KANJI_REGEX.test(val)) {
      let kanjiRef = fsCollection("kanji").doc(val);
      const kanjiDoc = await kanjiRef.get();
      if (!kanjiDoc.exists) {
        await kanjiRef.set({ hv: "" });
      }
      return [...(await acc), kanjiRef as unknown as string];
    }
    return await acc;
  }, Promise.resolve([] as string[]));
  const tags = _tags!.map((id) => fsCollection("tag").doc(id));
  if (existId) {
    await fsCollection("vocabulary")
      .doc(existId)
      .update({
        ...word,
        tags: FieldValue.arrayUnion(...tags),
      });
    await cache.invalidate([{ typename: "Word" }]);
    return {
      id: existId,
      tags,
      ...word,
    };
  } else {
    const result = await fsCollection("vocabulary").add({
      ...word,
      kanji,
      tags,
      createdAt: FieldValue.serverTimestamp(),
    });
    await cache.invalidate([{ typename: "Word" }]);
    return {
      id: result!.id,
      tags,
      ...word,
    } as any;
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
