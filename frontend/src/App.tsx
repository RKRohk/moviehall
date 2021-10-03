import "./index.css";
import firebase from 'firebase'
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { FirebaseContext } from "./context/firebaseContext";
import VideoPlayer from "./components/VideoPlayer";
import Login from "./pages/Login";
import MovieHall from "./pages/MovieHall";

function App() {
  const { auth } = useContext(FirebaseContext)

  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const subs = auth.onAuthStateChanged((user) => {
      setSignedIn(!!user)
      console.log(user)
    })

    return () => subs()
  }, [])

  return <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/room/:id">
        {/* {signedIn ? <VideoPlayer /> : <Redirect to="/login" from={"/"} />} */}
        <MovieHall />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
}

export default App;
