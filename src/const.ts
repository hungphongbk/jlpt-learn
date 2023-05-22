export enum FirestoreCollections {
  Vocabulary = "vocabulary",
  Kanji = "kanji",
  Tag = "tag",
}

export const KANJI_REGEX = /^[一-龥]+$/;
export type FirebaseDocs = "vocabulary" | "kanji" | "tag";
