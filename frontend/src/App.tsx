import "./index.css";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { FirebaseContext } from "./context/firebaseContext";
import Login from "./pages/Login";
import MovieHall from "./pages/MovieHall";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "/query",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/query",
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  const { auth } = useContext(FirebaseContext);

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const subs = auth.onAuthStateChanged((user) => {
      setSignedIn(!!user);
      console.log(user);
    });

    return () => subs();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/room/:roomCode">
            {signedIn ? <MovieHall /> : <Login />}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
