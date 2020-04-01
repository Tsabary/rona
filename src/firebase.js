import firebase from 'firebase';

firebase.initializeApp(JSON.parse(process.env.REACT_APP_FB_CONFIG));
firebase.analytics().logEvent('notification_received');
export default firebase;