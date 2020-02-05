import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const defaultStorage = admin.storage();
const FieldValue = admin.firestore.FieldValue;

exports.writeFileToDatabase = functions.storage.object().onFinalize(object => {
  const bucket = defaultStorage.bucket();
  const path = object.name as string;
  const file = bucket.file(path);

  return file
    .getSignedUrl({
      action: "read",
      expires: "03-17-2025"
    })
    .then(results => {
      const url = results[0];
      const silcedPath = path.split("/", 3);

      return db
        .collection(silcedPath[1])
        .doc(silcedPath[2])
        .set({ image: FieldValue.arrayUnion(url) }, { merge: true });
    });
});
