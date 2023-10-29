// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEefw_YmhuzdK_3jG9tmkIFo0lRSC62gY",
  authDomain: "belajar-f464e.firebaseapp.com",
  projectId: "belajar-f464e",
  storageBucket: "belajar-f464e.appspot.com",
  messagingSenderId: "593724356470",
  appId: "1:593724356470:web:7a46265bc8d2bcaaeaac57",
  measurementId: "G-DMH20EDCY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
