import admin from "firebase-admin";
import serviceAccount from "./jlpt-learn-acdbb-firebase-adminsdk-oofq2-a8b220f7fb.json";

export function initializeAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // create certificate
  const cert = admin.credential.cert(serviceAccount as any);

  // initialize admin app
  return admin.initializeApp({
    credential: cert,
    // projectId: params.projectId,
    // storageBucket: params.storageBucket,
  });
}
