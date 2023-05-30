import { QueryResolvers } from "@/types";
import { prisma } from "@/src/db";
import { Prisma } from ".prisma/client";
import WordWhereInput = Prisma.WordWhereInput;

export const queryWords: QueryResolvers["words"] = async (
  _,
  { where, limit, page = -1 }
) => {
  const whereInput: WordWhereInput = {};
  if (where?.word?.eq) {
    whereInput.word = where.word.eq;
  }
  if (where?.tags?.arrayContainsAny) {
    whereInput.tags = {
      some: { id: { equals: where.tags.arrayContainsAny[0] } },
    };
  }

  let totalPage = -1;
  if (page! >= 0) {
    totalPage = Math.floor(
      (await prisma.word.count({ where: whereInput })) / 10
    );
  }

  const docs = await prisma.word.findMany({
    where: whereInput,
    skip: page! < 0 ? undefined : page! * 10,
    take: page! < 0 ? undefined : 10,
    include: {
      explain: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  // console.log(docs);
  return {
    pagination: {
      page: page!,
      totalPage,
    },
    data: docs as any,
  };
};

export const queryOneWord: QueryResolvers["word"] = async (
  _,
  { id },
  { firestore }
) => {
  const doc = await prisma.word.findUnique({
    where: { id: Number(id) },
    include: { explain: true },
  });

  return doc as any;
};
