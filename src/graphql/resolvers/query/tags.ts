import { QueryResolvers, TagResolvers } from "@/types";
import { convertSnapshot } from "@/src/graphql/utils/convert";

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

export const queryChildrenTags: TagResolvers["children"] = async (
  { children },
  _,
  { fsCollection, firestore }
) => {
  if (!children) return null;
  const docRefs = await firestore.getAll(...(children as any));
  return docRefs.map(convertSnapshot);
};
