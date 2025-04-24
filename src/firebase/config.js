
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {} from 'firebase/firestore/lite';
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
const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);
const FirebaseAuth = getAuth(FirebaseApp);