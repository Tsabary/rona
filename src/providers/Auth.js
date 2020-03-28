import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import ReactGA from 'react-ga';
const db = firebase.firestore();


export const AuthContext = React.createContext();


ReactGA.initialize(process.env.GA);



export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  firebase.auth().onAuthStateChanged(setCurrentUser);

  useEffect(() => {
    if (currentUser) {

     // GA
     ReactGA.set({
      userId: currentUser.uid,
      // any data that is relevant to the user session
      // that you would like to track with google analytics
     })



      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then(doc => setCurrentUserProfile(doc.data()))
        .catch(err => {
          setCurrentUserProfile(null);
        });
    } else {
      setCurrentUserProfile(null);
    }
    window.location.hash = "";
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserProfile,
        setCurrentUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
