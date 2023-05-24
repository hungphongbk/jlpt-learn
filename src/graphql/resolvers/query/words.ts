import { QueryResolvers, WordResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";
import { firestore } from "firebase-admin";
import { convertSnapshot } from "@/src/graphql/utils/convert";
import DocumentReference = firestore.DocumentReference;

export const queryWords: QueryResolvers["words"] = async (
  _,
  { where, limit, page = -1 },
  { fsCollection }
) => {
  let ref: firestore.Query<firestore.DocumentData> = fsCollection(
    "vocabulary"
  ).orderBy("createdAt", "desc");
  if (where?.word?.eq) {
    ref = ref.where("word", "==", where.word.eq!);
  }
  if (where?.tags?.arrayContainsAny) {
    ref = ref.where(
      "tags",
      "array-contains-any",
      where.tags.arrayContainsAny.map((id) => fsCollection("tag").doc(id))
    );
  }
  if (limit && page! < 0) {
    ref = ref.limit(limit);
  }

  let totalPage = -1;
  if (page! >= 0) {
    totalPage = Math.floor((await ref.count().get()).data().count / 10);
    ref = ref.limit(10).offset(page! * 10);
  }

  const docs = (await ref.get()).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
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
  const doc = await firestore
    .collection(FirestoreCollections.Vocabulary)
    .doc(id)
    .get();

  return convertSnapshot(doc) as any;
};

export const queryKanjiInWord: WordResolvers["kanji"] = async (parent, _) => {
  const kanji = parent.kanji as unknown as DocumentReference[];
  return (await Promise.all(kanji.map((ref) => ref.get()))).map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  })) as any;
};

export const queryTagsInWord: WordResolvers["tags"] = async (
  parent,
  _,
  { firestore }
) => {
  const tags = parent.tags as unknown as DocumentReference[];
  const refs = await firestore.getAll(...tags);
  return refs.map(convertSnapshot);
};

export const queryOppositesInWord: WordResolvers["opposite"] = async (
  { opposite: _ops },
  _,
  { firestore }
) => {
  const docRefs = await firestore.getAll(...(_ops as any));
  return docRefs.map(convertSnapshot);
};
