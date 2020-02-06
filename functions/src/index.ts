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

      switch (silcedPath[1]) {
        case "user-avatars":
          return db
            .collection("users")
            .doc(silcedPath[2])
            .set({ avatar: FieldValue.arrayUnion(url) }, { merge: true });

        case "items":
          return db
            .collection("items")
            .doc(silcedPath[2])
            .set({ image: FieldValue.arrayUnion(url) }, { merge: true });

        default:
          return null;
      }
    });
});
