import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const defaultStorage = admin.storage();

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("posts");
// index.setSettings({
//   searchableAttributes: [
//       'title',
//       'details',
//   ],
//   customRanking: ["desc(answers)", "desc(timestamp)"]
// })

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
        name: user.providerData[0].displayName.split(" ")[0],
        avatar: user.providerData[0].photoURL,
        email: user.email
      })
    );

    return Promise.all(promises);
  } else {
    return db.doc("users/" + user.uid).set({
      uid: user.uid,
      email: user.email ? user.email : ""
    });
  }
});

exports.newPost = functions.firestore
  .document("posts/{postID}")
  .onCreate((snap, context) => {
    const post = snap.data();
    return post
      ? index
          .saveObject({
            user_name: post.user_name,
            user_gender: post.user_gender,
            user_avatar: post.user_avatar,
            user_ID: post.user_ID,
            title: post.title,
            phone_number: post.phone_number,
            objectID : post.id,
            body: post.body,
            address_text: post.address_text,
            _geoloc: {
              lat: post.address_coords.latitude,
              lng: post.address_coords.longitude
            }
          })
          .then(res => console.log(res))
      : "Why this shit ain't happening";
  });

exports.writeFileToDatabase = functions.storage.object().onFinalize(object => {
  const bucket = defaultStorage.bucket();
  const path = object.name as string;
  const file = bucket.file(path);

  return file
    .getSignedUrl({
      action: "read",
      expires: "03-17-2100"
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

        default:
          return null;
      }
    });
});
