import firebase from "firebase";
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREABASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREABASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp =
  firebase.apps.length > 0
    ? firebase.apps[0]
    : firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// if (location.hostname === 'localhost') {
//   auth.useEmulator('http://localhost:9099/');
// }
// const analytics = getAnalytics(firebaseApp);
