import { firestore } from "firebase-admin";
import { FirebaseDocs } from "@/src/const";
import { getFirestore } from "firebase-admin/firestore";
import DocumentSnapshot = firestore.DocumentSnapshot;

export function convertSnapshot(snapshot: DocumentSnapshot): any {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export function idToRef(doc: FirebaseDocs) {
  const fs = getFirestore();
  return (id: string) => fs.collection(doc).doc(id);
}
