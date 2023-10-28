import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyCYeJAXtxjfVZD28ZGVEYtwYTNkQ2vas2w",
    authDomain: "authentication-tutorial-1a7a2.firebaseapp.com",
    projectId: "authentication-tutorial-1a7a2",
    storageBucket: "authentication-tutorial-1a7a2.appspot.com",
    messagingSenderId: "555680626403",
    appId: "1:555680626403:web:b8358efaa76521dfb8f7d6",
    measurementId: "G-FMKLPBML51"
  };
  
  const akun = initializeApp(firebaseConfig,"configApp")

  export const auth = getAuth(akun)