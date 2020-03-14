import firebase from "../firebase";
import {
  FETCH_GROUP,
  FETCH_SINGLE,
  FETCH_USERS,
  FETCH_SINGLE_USER,
  SET_PAGE,
  FETCH_POSITIONS,
  FETCH_SINGLE_POSITION
} from "./types";

const db = firebase.firestore();
const storageRef = firebase.storage().ref();

// export const logIn = (email, password) => () => {
//   console.log("logIn");
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(() => {
//       window.location.hash = "";
//     });
// };

export const logOut = () => () => {
  firebase.auth().signOut();
};

export const signUp = (email, password, setSubmitting, setFormError) => () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      result.user.sendEmailVerification();
      setSubmitting(2);
    })
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setSubmitting(3);
          })
          .catch(err => {
            console.log("login error:", err);

            if(err.code === "auth/wrong-password"){
              setSubmitting(0);
              setFormError("Wrong password")
            }
          });
      } else {
        console.log("signup error:", err);
        setSubmitting(4);
      }
    });
};

export const resendVerification = () => () => {
  firebase.auth().currentUser.sendEmailVerification();
};

export const providerSignIn = provider => () => {
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  switch (provider) {
    case "google":
      firebase.auth().signInWithPopup(googleProvider);
    case "facebook":
      firebase.auth().signInWithPopup(facebookProvider);
  }
};

export const updateProfile = (values, user, imageObj) => () => {
  db.collection("users")
    .doc(user.uid)
    .set(values, { merge: true });
  storageRef.child(`images/user-avatars/${user.uid}`).put(imageObj);
};

export const fetchAllItems = () => async dispatch => {
  const data = await db.collection("items").get();

  if (data.docs !== undefined) {
    const docsData = [];
    data.docs.map(doc => {
      docsData.push(doc.data());
    });

    dispatch({
      type: FETCH_GROUP,
      payload: docsData
    });
  } else {
    dispatch({
      type: FETCH_GROUP,
      payload: []
    });
  }
};


export const fetchPositions = () => async dispatch => {
  const data = await db.collection("positions").get();

  dispatch({
    type: FETCH_POSITIONS,
    payload: !!data.docs
      ? data.docs.map(doc => {
          return doc.data();
        })
      : []
  });
};

export const fetchSinglePosition = id => async dispatch => {
  const data = await db
    .collection("positions")
    .doc(id)
    .get();

  // setPosition(data.data());

  dispatch({
    type: FETCH_SINGLE_POSITION,
    payload: data.data() ? data.data() : {}
  });
};

export const fetchSingleItem = (id, setEvent) => async dispatch => {
  const data = await db
    .collection("items")
    .doc(id)
    .get();

  setEvent(data.data());

  if (!!data) {
    dispatch({
      type: FETCH_SINGLE,
      payload: data.data()
    });
  }
};

export const fetchAllUsers = () => async dispatch => {
  const data = await db.collection("users").get();

  if (data.docs !== undefined) {
    const docsData = [];
    data.docs.map(doc => {
      docsData.push(doc.data());
    });

    dispatch({
      type: FETCH_USERS,
      payload: docsData
    });
  } else {
    dispatch({
      type: FETCH_USERS,
      payload: []
    });
  }
};

export const fetchSingleUser = (id, setEvent) => async dispatch => {
  const data = await db
    .collection("users")
    .doc(id)
    .get();

  // setEvent(data.data());

  if (!!data) {
    dispatch({
      type: FETCH_SINGLE_USER,
      payload: data.data()
    });
  }
};

export const newItem = (values, image, setValues) => () => {
  const newDoc = db.collection("items").doc();

  newDoc
    .set({ ...values, id: newDoc.id })
    .then(() => {
      storageRef
        .child(`images/items/${newDoc.id}`)
        .put(image)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    })
    // .then(() => {
    //   setValues({});
    // })
    .catch(err => {
      console.log(err);
    });
};

export const updateItem = (values, image, setValues) => () => {
  
  console.log(image);
  db.collection("items")
    .doc(values.id)
    .set(values)
    .then(() => {
      if (!!image)
        storageRef
          .child(`images/items/${values.id}`)
          .put(image)
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
    })
    // .then(() => {
    //   setValues({});
    // })
    .catch(err => {
      console.log(err);
    });
};

export const setCurrentPage = value => {
  return {
    type: SET_PAGE,
    payload: value
  };
};
