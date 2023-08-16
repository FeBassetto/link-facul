import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZJ8gKKlRmFbu_nP8-4uaEfSdgADdgiAo",
  authDomain: "facul-link.firebaseapp.com",
  projectId: "facul-link",
  storageBucket: "facul-link.appspot.com",
  messagingSenderId: "41131668587",
  appId: "1:41131668587:web:e3f754ed1375a754c66d2e",
  measurementId: "G-KL74RB357R",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
