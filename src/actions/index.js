import firebase from "../firebase";
import {
  FETCH_GROUP,
  FETCH_SINGLE,
  FETCH_USERS,
  FETCH_SINGLE_USER,
  SET_PAGE
} from "./types";

const db = firebase.firestore();
const storageRef = firebase.storage().ref();

export const logIn = (email, password) => () => {
  console.log("logIn");
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.hash = "";
    });
};

export const logOut = () => () => {
  firebase.auth().signOut();
};

export const signUp = (email, password, setSent) => () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      result.user.sendEmailVerification();
      setSent(true);
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
