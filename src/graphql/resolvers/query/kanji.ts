import { QueryResolvers } from "@/types";
import { prisma } from "@/src/db";

export const queryOneKanji: QueryResolvers["kanji"] = async (_, { id }) => {
  const doc = await prisma.kanji.findUnique({
    where: { id },
  });

  return doc! as any;
};
