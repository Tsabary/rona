import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBvcAhyLAqc05namFVG-gxYzjoX25nGGkg",
  authDomain: "project-template-5c65a.firebaseapp.com",
  databaseURL: "https://project-template-5c65a.firebaseio.com",
  projectId: "project-template-5c65a",
  storageBucket: "project-template-5c65a.appspot.com",
  messagingSenderId: "550178105554",
  appId: "1:550178105554:web:ba60faa7873d5076d7250b",
  measurementId: "G-RF7N6HNHH5"
  };

firebase.initializeApp(config);
export default firebase;