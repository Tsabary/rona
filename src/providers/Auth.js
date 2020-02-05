import React, { useEffect, useState } from "react";
import firebase from "../firebase";
const db = firebase.firestore();

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);

    if (currentUser) {
      const fetchData = async () => {
        const doc = await db
          .collection("users")
          .doc(currentUser.uid)
          .get();

        setCurrentUserProfile(doc.data());
      };
      fetchData();
    }
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
