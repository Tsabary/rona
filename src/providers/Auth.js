import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import  'firebase/firestore';
import  'firebase/auth';
//import ReactGA from 'react-ga';
import Modal from '../components/popups/modal';
const db = firebase.firestore();


export const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [lang, setLang] = useState('he');
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [modalShown, setModal] = useState(false);
  const toggleModal = () => setModal(!modalShown);
  firebase.auth().onAuthStateChanged(setCurrentUser);

  useEffect(() => {
    if (currentUser) {
      firebase.analytics().logEvent('user_authenticated');
      setModal(true);


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
        lang,
        setLang,
        setCurrentUserProfile
      }}
    >
      {modalShown ? (
      <Modal>   
        <header>
          <h4>Please Note</h4>
        </header>
        <main className="modal-body">        
           במהלך מתן או קבלת עזרה אנא שימרו בקפידה על הוראות משרד הבריאות כפי שמפורסמות
           <a href="https://www.health.gov.il/Subjects/disease/corona/Pages/default.aspx ">
             באתר משרד הבריאות
           </a>
           למען שמירה על בריאותכם ובריאות הציבור.
        </main>
        <footer>
          <button className="primary-btn" onClick={toggleModal}>OK</button>
        </footer>
      </Modal>) : null}
      {children}
    </AuthContext.Provider>
  );
};
