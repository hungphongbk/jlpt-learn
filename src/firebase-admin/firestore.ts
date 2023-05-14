import admin from "firebase-admin";
import serviceAccount from "./jlpt-learn-acdbb-firebase-adminsdk-oofq2-78a8e93407.json";

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
