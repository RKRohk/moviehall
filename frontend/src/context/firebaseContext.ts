import firebase from "firebase";
import React from "react";
import { auth, firebaseApp } from "../config/firebaseConfig";

export const FirebaseContext = React.createContext({ app: firebaseApp, auth: auth })