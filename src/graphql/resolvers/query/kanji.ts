import { QueryResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";

export const queryOneKanji: QueryResolvers["kanji"] = async (
  _,
  { id },
  { firestore }
) => {
  const doc = await firestore
    .collection(FirestoreCollections.Kanji)
    .doc(id)
    .get();

  return {
    id: doc.id,
    ...doc.data(),
  };
};
