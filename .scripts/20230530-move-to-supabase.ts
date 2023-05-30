import { initializeAdmin } from "../src/firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { prisma } from "../src/db";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;

(async function () {
  initializeAdmin();
  const fs = getFirestore();

  // const tags = await fs.collection("tag").get();
  // const tagsInput: Prisma.TagCreateManyInput[] = tags.docs.map((tag) => ({
  //   id: tag.id,
  //   label: tag.get("label"),
  //   parentId: (tag.get("parent") as DocumentReference | undefined)?.id.replace(
  //     "/tag/",
  //     ""
  //   ),
  // }));
  // const tagsCreateResult = await prisma.tag.createMany({ data: tagsInput });
  // console.log(JSON.stringify(tagsCreateResult, null, 2));
  //
  // const kanji = await fs.collection("kanji").get();
  // const kanjisInput: Prisma.KanjiCreateManyInput[] = kanji.docs.map(
  //   (kanji) => ({
  //     id: kanji.id,
  //     hv: kanji.get("hv"),
  //   })
  // );
  // const kanjiCreateResult = await prisma.kanji.createMany({
  //   data: kanjisInput,
  // });
  // console.log(JSON.stringify(kanjiCreateResult, null, 2));

  const words = await fs.collection("vocabulary").get();

  const wordCreateInputs = words.docs.map((word) => ({
    word: word.get("word"),
    pronounce: word.get("pronounce"),
    tags: {
      connect: (word.get("tags") as DocumentReference[] | undefined)?.map(
        (tag) => ({
          id: tag.id.replace("/tag/", ""),
        })
      ),
    },
    kanji: {
      connect: (word.get("kanji") as DocumentReference[] | undefined)?.map(
        (kanji) => ({
          id: kanji.id.replace("/kanji/", ""),
        })
      ),
    },
    explain: {
      createMany: {
        data: (word.get("explain") as any[]).map((explain) => ({
          explain: explain.explain,
          preferredKana: explain.preferredKana,
        })),
      },
    },
  }));

  for (const w of wordCreateInputs) {
    await prisma.word.create({ data: w });
  }
})();
