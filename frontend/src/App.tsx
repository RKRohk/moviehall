import "./index.css";
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirebaseContext } from "./context/firebaseContext";
import Login from "./pages/Login";
import MovieHall from "./pages/MovieHall";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { auth } from "./config/firebaseConfig";
import { setContext } from "@apollo/client/link/context";
const httpLink = new HttpLink({
  uri: "/query",
});

const wsLink = new WebSocketLink({
  uri: `${
    window.location.hostname === "localhost"
      ? "ws://localhost:8080/query"
      : "wss://" + window.location.hostname + "/query"
  }`,
  options: {
    connectionParams: async () => {
      const token = await auth.currentUser?.getIdToken();
      return {
        Auth: `Bearer ${token}`,
      };
    },
    reconnect: true,
  },
});

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

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await auth.currentUser?.getIdToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Auth: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
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
