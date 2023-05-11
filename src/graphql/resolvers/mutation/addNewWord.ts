import { FirestoreCollections, KANJI_REGEX } from "@/src/const";
import { MutationResolvers } from "@/types";

const addNewWord: MutationResolvers["addNewWord"] = async (
  _: any,
  { word: { tags: _tags = [], ...word } },
  { firestore }
) => {
  const kanji = await word.word.split("").reduce(async (acc, val) => {
    if (KANJI_REGEX.test(val)) {
      let kanjiRef = firestore.collection(FirestoreCollections.Kanji).doc(val);
      const kanjiDoc = await kanjiRef.get();
      if (!kanjiDoc.exists) {
        await kanjiRef.set({ hv: "" });
      }
      return [...(await acc), kanjiRef as unknown as string];
    }
    return await acc;
  }, Promise.resolve([] as string[]));
  const tags = _tags!.map((id) =>
    firestore.collection(FirestoreCollections.Tag).doc(id)
  );
  const result = await firestore
    .collection(FirestoreCollections.Vocabulary)
    .add({
      ...word,
      kanji,
      tags,
    });
  return {
    id: result!.id,
    tags,
    ...word,
  } as any;
};

export default addNewWord;
