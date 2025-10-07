//to register
import firebase from "firebase/compat/app";
//auth:autentication
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlvT7L4y4FXzw0Cdtd9Qfc9dYWLLNLQtM",
  authDomain: "clone-e1bfe.firebaseapp.com",
  projectId: "clone-e1bfe",
  storageBucket: "clone-e1bfe.firebasestorage.app",
  messagingSenderId: "280083990947",
  appId: "1:280083990947:web:51e437e8339ab340493216",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//set file to auth related
export const auth = getAuth(app);
//database
export const db = app.firestore();