import "./index.css";
import { StyledFirebaseAuth } from "react-firebaseui"
import firebase from 'firebase'
import { firebaseApp } from "./config/firebaseConfig";
import { useEffect, useState } from "react";
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
const app = firebaseApp
function App() {

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const [signedin, setSignedIn] = useState(false)
  if (!signedin) {
    return <div>
      <p>Please Sign In</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  }
  else {
    return <>
      <p>Signed In</p>
      <p>Welcome {firebase.auth().currentUser?.displayName}</p>
      <img src={firebase.auth().currentUser?.photoURL ?? " "} />
      <button onClick={() => firebase.auth().signOut()}>SignOut</button>
    </>
  }
}

export default App;
