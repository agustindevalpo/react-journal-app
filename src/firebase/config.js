
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGMWCLnEqRSTNJqpfSW9Isq4xZbn4AsYY",
  authDomain: "react-cursos-27bfc.firebaseapp.com",
  projectId: "react-cursos-27bfc",
  storageBucket: "react-cursos-27bfc.firebasestorage.app",
  messagingSenderId: "573200371299",
  appId: "1:573200371299:web:8907f76a777cd0ea05f256",
  measurementId: "G-XZP1PLTGK0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FirebaseApp);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FireBaseDB = getFirestore(FirebaseApp);