// database/firebaseDb.js
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDRQVvCdqFDxMfNwPBRRPupnutnBkgCpYA",
    authDomain: "la-salle-96499.firebaseapp.com",
    projectId: "la-salle-96499",
    storageBucket: "la-salle-96499.appspot.com",
    messagingSenderId: "328378263456",
    appId: "1:328378263456:web:356e4f71f3dbdc247866c5",
    measurementId: "G-W3QP6SPNGX"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;