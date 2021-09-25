import "./index.css";
import { StyledFirebaseAuth } from "react-firebaseui"
import firebase from 'firebase'
import { auth, firebaseApp } from "./config/firebaseConfig";
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
function App() {

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setSignedIn(!!user);
      console.log(user?.getIdToken())
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const [signedin, setSignedIn] = useState(false)
  if (!signedin) {
    return <div>
      <p>Please Sign In</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  }
  else {
    return <>
      <p>Signed In</p>
      <p>Welcome {auth.currentUser?.displayName}</p>
      <img src={auth.currentUser?.photoURL ?? " "} />
      <button onClick={() => auth.signOut()}>SignOut</button>
    </>
  }
}

export default App;
