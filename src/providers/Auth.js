import React, { useEffect, useState } from "react";
import firebase from "../firebase";
const db = firebase.firestore();

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  firebase.auth().onAuthStateChanged(setCurrentUser);

  useEffect(() => {
    if (currentUser) {
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
