import "./index.css";
import firebase from 'firebase'
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { FirebaseContext } from "./context/firebaseContext";
import VideoPlayer from "./components/VideoPlayer";
// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};
function App() {
  const { auth } = useContext(FirebaseContext)
  return <Router>
    <Switch>
      <Route path="/room/:id">
        {auth.currentUser ? <VideoPlayer /> : <Redirect to="/login" from={"/"} />}
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
}

export default App;
