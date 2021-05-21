import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyAEkSwGQ9GfzHdBeTG2ZOvKaaObEmzvY1c",
    authDomain: "admin-panel-auth.firebaseapp.com",
    projectId: "admin-panel-auth",
    storageBucket: "admin-panel-auth.appspot.com",
    messagingSenderId: "973388219685",
    appId: "1:973388219685:web:2bfa85b2fb93e33e2f86cc",
    measurementId: "G-V95R8W9EE1"
};

// Initialize Firebase
const backend = firebase.initializeApp(config, "adminPanel");

export default backend;