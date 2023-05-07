import { MutationResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";

export const upsertKanji: MutationResolvers["upsertKanji"] = async (
  _,
  { id, kanji },
  { firestore }
) => {
  let kanjiRef = firestore.collection(FirestoreCollections.Kanji).doc(id);
  await kanjiRef.set(kanji);

  return { id, ...(await kanjiRef.get()).data() };
};
