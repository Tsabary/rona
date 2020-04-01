import firebase from 'firebase/app';
import 'firebase/analytics';


firebase.initializeApp(JSON.parse(process.env.REACT_APP_FB_CONFIG));
firebase.analytics().logEvent('notification_received');
export default firebase;