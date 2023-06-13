// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';

const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBRWkC6yhJqMZOCkh9GPLfccZWoEoGl2fo",
    authDomain: "hw3-cc.firebaseapp.com",
    projectId: "hw3-cc",
    storageBucket: "hw3-cc.appspot.com",
    messagingSenderId: "91662115841",
    appId: "1:91662115841:web:f61674aea638718de80c00",
    measurementId: "G-ML244LFXZ6"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
console.log("I am in db config with db:");
// console.log(db);

module.exports = db;