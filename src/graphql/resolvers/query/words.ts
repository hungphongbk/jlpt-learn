import { QueryResolvers, WordResolvers } from "@/types";
import { FirestoreCollections } from "@/src/const";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;

export const queryWords: QueryResolvers["words"] = async (
  _,
  { where, limit },
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
  if (limit) {
    ref = ref.limit(limit);
  }

  const docs = (await ref.get()).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log(docs);
  return docs as any;
};

export const queryOneWord: QueryResolvers["word"] = async (
  _,
  { id },
  { firestore }
) => {
  const doc = (
    await firestore.collection(FirestoreCollections.Vocabulary).doc(id).get()
  ).data();

  return doc as any;
};

export const queryKanjiInWord: WordResolvers["kanji"] = async (parent, _) => {
  const kanji = parent.kanji as unknown as DocumentReference[];
  return (await Promise.all(kanji.map((ref) => ref.get()))).map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  })) as any;
};
