import { QueryResolvers } from "@/types";
import { prisma } from "@/src/db";

export const queryTags: QueryResolvers["tags"] = async (
  _1,
  _2,
  { firestore, fsCollection }
) => {
  const docs = await prisma.tag.findMany({
    where: {
      parentId: null,
    },
  });
  return docs as any;
};
