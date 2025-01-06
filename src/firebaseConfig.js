import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

//  configuracion  para Firebase 
const firebaseConfig = {
    apiKey: "Eliminada",
    authDomain: "Eliminada",
    projectId: "Eliminada",
    storageBucket: "gestion-proyecto-3630e.firebasestorage.app",
    messagingSenderId: "Eliminada",
    appId: "1:Eliminada"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const functions = getFunctions(app);
