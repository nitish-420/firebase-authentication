// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from "firebase/auth";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebaseConfig from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db=firebase.firestore()
const googleProvider= new GoogleAuthProvider();

export {auth,db,googleProvider}