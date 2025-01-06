import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

//  configuracion  para Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyA3Q21EHXVI1urOAA_7EOQM6lpZGrG8j7g",
    authDomain: "gestion-proyecto-3630e.firebaseapp.com",
    projectId: "gestion-proyecto-3630e",
    storageBucket: "gestion-proyecto-3630e.firebasestorage.app",
    messagingSenderId: "547684576364",
    appId: "1:547684576364:web:6f97981a6aaa626e623c49"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const functions = getFunctions(app);
