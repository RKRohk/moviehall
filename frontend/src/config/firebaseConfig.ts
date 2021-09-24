import firebase from "firebase"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREABASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREABASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export { firebaseApp }