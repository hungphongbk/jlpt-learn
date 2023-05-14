import { initializeAdmin } from "../src/firebase-admin/firestore";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { FirestoreCollections } from "../src/const";

(async function () {
  initializeAdmin();
  const db = getFirestore();
  const batch = db.batch();
  const docs = (await db.collection(FirestoreCollections.Vocabulary).get())
    .docs;

  const time = new Date();
  docs.forEach((doc) => {
    // if (doc.get("createdAt"))
    //   batch.update(doc.ref, {
    //     createdAt: FieldValue.delete(),
    //   });
    if (!doc.get("createdAt"))
      batch.update(doc.ref, {
        createdAt: time,
        tags: FieldValue.arrayUnion(
          db.collection("tag").doc("jlpt:n5"),
          db.collection("tag").doc("minna-no-nihongo:1")
        ),
      });
  });
  const rs = await batch.commit();
  console.log(`updated ${rs.length} words!`);
})();
