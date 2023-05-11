import { QueryResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";

export const queryTags: QueryResolvers["tags"] = async (
  _1,
  _2,
  { firestore }
) => {
  const docs = (
    await firestore.collection(FirestoreCollections.Tag).get()
  ).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log(docs);
  return docs as any;
};
