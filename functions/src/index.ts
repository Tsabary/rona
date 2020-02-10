import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const defaultStorage = admin.storage();
// const FieldValue = admin.firestore.FieldValue;

exports.userCreated = functions.auth.user().onCreate(user => {
  if (
    user.providerData &&
    ["facebook.com", "google.com"].includes(user.providerData[0].providerId)
  ) {
    const promises: any = [];

    if (user.providerData[0].providerId === "facebook.com") {
      promises.push(
        admin.auth().updateUser(user.uid, {
          emailVerified: true
        })
      );
    }

    promises.push(
      db.doc("users/" + user.uid).set({
        uid: user.uid,
        name: user.providerData[0].displayName,
        avatar: user.providerData[0].photoURL
      })
    );

    return Promise.all(promises);
  } else {
    return null;
  }
});

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
            .set({ avatar: url }, { merge: true });

        case "items":
          return db
            .collection("items")
            .doc(silcedPath[2])
            .set({ image: url }, { merge: true });

        default:
          return null;
      }
    });
});
