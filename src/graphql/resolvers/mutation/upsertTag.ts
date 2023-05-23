import { MutationResolvers } from "@/types";
import { FieldValue } from "firebase-admin/firestore";
import { convertSnapshot } from "@/src/graphql/utils/convert";

export const upsertTag: MutationResolvers["upsertTag"] = async (
  _,
  { tag: { id, parentId, ...tag } },
  { fsCollection, firestore, cache }
) => {
  const tagRef = fsCollection("tag").doc(id);
  const batch = firestore.batch();

  if (parentId) {
    const parent = fsCollection("tag").doc(parentId);
    batch.set(tagRef, {
      ...tag,
      parent,
    });
    batch.update(parent, {
      children: FieldValue.arrayUnion(tagRef),
    });
  } else {
    batch.set(tagRef, tag);
  }

  await batch.commit();
  await cache.invalidate([{ typename: "Tag" }]);
  return convertSnapshot(await tagRef.get()) as any;
};
