// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6EIjP8Q_byuCXjKuoh0Z7ZdfD2gbDRX4",
  authDomain: "signal-clone-3a5c8.firebaseapp.com",
  projectId: "signal-clone-3a5c8",
  storageBucket: "signal-clone-3a5c8.appspot.com",
  messagingSenderId: "614409485655",
  appId: "1:614409485655:web:d5616cb6ee7daa8cb71212",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
