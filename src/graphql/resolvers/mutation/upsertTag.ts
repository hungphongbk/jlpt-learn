import { MutationResolvers, TagUpsertInput } from "@/types";
import { Prisma } from ".prisma/client";
import { prisma } from "@/src/db";

async function convertGqlInputToPrismaInput({
  id,
  parentId,
  ...tag
}: TagUpsertInput): Promise<Prisma.TagUpsertArgs> {
  return {
    where: { id },
    create: { id, ...(tag as any), parent: { connect: { id: parentId } } },
    update: {
      ...(tag as any),
      parent: { connect: { id: parentId ?? undefined } },
    },
  };
}

export const upsertTag: MutationResolvers["upsertTag"] = async (
  _,
  { tag },
  { cache }
) => {
  const rs = await prisma.tag.upsert(await convertGqlInputToPrismaInput(tag));
  await cache.invalidate([{ typename: "Tag" }]);
  return rs;
};
