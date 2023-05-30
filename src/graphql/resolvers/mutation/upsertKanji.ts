import { MutationResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";
import { Prisma } from ".prisma/client";
import { prisma } from "@/src/db";

export const upsertKanji: MutationResolvers["upsertKanji"] = async (
  _,
  { id, kanji },
  { firestore, cache }
) => {
  // convert
  const arg: Prisma.KanjiUpsertArgs = {
    where: { id },
    create: { id, ...kanji },
    update: kanji,
  };

  // execute
  const rs = await prisma.kanji.upsert(arg);
  await cache.invalidate([{ typename: "Kanji", id }]);

  return rs;
};

/**
 * @deprecated
 * @param _
 * @param kanjis
 * @param firestore
 */
export const upsertKanjis: MutationResolvers["upsertKanjis"] = async (
  _,
  { kanjis },
  { firestore }
) => {
  const batch = firestore.batch();
  for (const { id, hv } of kanjis) {
    batch.set(firestore.collection(FirestoreCollections.Kanji).doc(id), { hv });
  }
  await batch.commit();

  return true;
};
