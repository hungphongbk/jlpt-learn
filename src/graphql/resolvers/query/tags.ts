import { QueryResolvers } from "@/types";

export const queryTags: QueryResolvers["tags"] = async (
  _1,
  _2,
  { firestore, fsCollection }
) => {
  const docs = (
    await fsCollection("tag").where("parent", "==", null).get()
  ).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log(docs);
  return docs as any;
};
