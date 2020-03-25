import firebase from 'firebase';

firebase.initializeApp(JSON.parse(process.env.REACT_APP_FB_CONFIG));
export default firebase;