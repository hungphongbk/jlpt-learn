import { MutationResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";

export const upsertKanji: MutationResolvers["upsertKanji"] = async (
  _,
  { id, kanji },
  { firestore, cache }
) => {
  let kanjiRef = firestore.collection(FirestoreCollections.Kanji).doc(id);
  await kanjiRef.set(kanji);
  await cache.invalidate([{ typename: "Kanji", id }]);

  return { id, ...(await kanjiRef.get()).data() };
};

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
