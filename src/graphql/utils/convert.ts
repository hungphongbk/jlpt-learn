import { firestore } from "firebase-admin";
import DocumentSnapshot = firestore.DocumentSnapshot;

export function convertSnapshot(snapshot: DocumentSnapshot): any {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
