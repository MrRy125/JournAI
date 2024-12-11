// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAjEBW5LwOj1BfypiMgpxI97dug5UZluI",
  authDomain: "journai-f705a.firebaseapp.com",
  projectId: "journai-f705a",
  storageBucket: "journai-f705a.firebasestorage.app",
  messagingSenderId: "800813181848",
  appId: "1:800813181848:web:083c623a90c9404d73d9ed",
  measurementId: "G-5QK2RNBZFR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const db = getAnalytics(app);