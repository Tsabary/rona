import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCDfwfZYXYpN6iJqtafYzoULyiOD88cg2c",
  authDomain: "bdude-d4c05.firebaseapp.com",
  databaseURL: "https://bdude-d4c05.firebaseio.com",
  projectId: "bdude-d4c05",
  storageBucket: "bdude-d4c05.appspot.com",
  messagingSenderId: "301644723160",
  appId: "1:301644723160:web:2709d1a8057e422d99b8ad",
  measurementId: "G-ES17CQLX4D"
  };

firebase.initializeApp(config);
export default firebase;