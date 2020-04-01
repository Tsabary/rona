import firebase from "../firebase";
import {
  FETCH_POSTS,
  FETCH_SINGLE,
  NEW_POST,
  DELETE_POST,
  SET_PAGE,
  FETCH_MY_POSTS,
  DELETE_MY_POST,
  TOGGLE_POPUP,
  CHANGE_ADDRESS
} from "./types";
import 'firebase/firestore';
import 'firebase/storage';
const db = firebase.firestore();
const storageRef = firebase.storage().ref();

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

            if (err.code === "auth/wrong-password") {
              setSubmitting(0);
              setFormError("Wrong password");
            }
          });
      } else {
        console.log("signup error:", err);
        setSubmitting(4);
      }
    });
};

export const logOut = () => () => {
  firebase.auth().signOut();
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
      break;
    case "facebook":
      firebase.auth().signInWithPopup(facebookProvider);
      break;
  }
};

export const updateProfile = (values, user, imageObj, updateLocaly) => () => {
  db.collection("users")
    .doc(user.uid)
    .set(values, { merge: true })
    .then(() => {
      if (imageObj)
        storageRef.child(`images/user-avatars/${user.uid}`).put(imageObj);
      updateLocaly();
      window.location.hash = "";
    });
};

export const newRequest = (values, reset) => dispatch => {
  const newDoc = db.collection("posts").doc();
  const post = { ...values, id: newDoc.id, timestamp: Date.now() };

  newDoc
    .set(post)
    .then(() => {
      reset();
      window.location.hash = "";

      dispatch({
        type: FETCH_SINGLE,
        payload: post
      });
    })
    .catch(error => {
      reset(error);
      console.log(`Error: while adding document:${error}`);
      throw new Error(`Error: while adding document:${error}`); // throw an Error
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

export const fetchAllPosts = () => async dispatch => {
  const data = await db.collection("posts").get();

  dispatch({
    type: FETCH_POSTS,
    payload: !!data.docs ? data.docs.map(doc => doc.data()) : []
  });
};

export const removePost = post => dispatch => {
  db.collection("posts")
    .doc(post.id)
    .delete();

  // dispatch({
  //   type: DELETE_MY_POST,
  //   payload: post.id
  // });

  dispatch({
    type: DELETE_POST,
    payload: post.id
  });
};

export const fetchMyPosts = userID => async dispatch => {
  const data = await db
    .collection("posts")
    .where("user_ID", "==", userID)
    .get();

  dispatch({
    type: FETCH_MY_POSTS,
    payload: !!data.docs ? data.docs.map(doc => doc.data()) : []
  });
};

export const setCurrentPage = value => {
  return {
    type: SET_PAGE,
    payload: value
  };
};


export const togglePopup = () => {
  return {
    type: TOGGLE_POPUP
  };
};


export const changeAddress = address => {
  return {
    type: CHANGE_ADDRESS,
    payload : address
  };
};

