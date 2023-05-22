import { initializeAdmin } from "../src/firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { FirestoreCollections } from "../src/const";

(async function () {
  initializeAdmin();
  const db = getFirestore();
  const batch = db.batch();
  const docs = (await db.collection(FirestoreCollections.Vocabulary).get())
    .docs;

  docs.forEach((doc) => {
    //
    const explain = doc.get("explain");
    if (typeof explain === "string") {
      batch.update(doc.ref, {
        explain: [
          {
            explain: explain,
          },
        ],
      });
    }
  });

  const rs = await batch.commit();
  console.log(`updated ${rs.length} words!`);
})();
