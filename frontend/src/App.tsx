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
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { auth } from "./config/firebaseConfig";

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

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(async ({ headers = {} }) => ({
    headers: {
      ...headers,
      Auth: `Bearer ${await auth.currentUser?.getIdToken()}` || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(splitLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
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
