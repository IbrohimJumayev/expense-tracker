import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCIdcpm0hQLLLp0OlIxypd7vKDrl9DiZeU",
  authDomain: "expence-tracker-571ae.firebaseapp.com",
  projectId: "expence-tracker-571ae",
  storageBucket: "expence-tracker-571ae.appspot.com",
  messagingSenderId: "409693409992",
  appId: "1:409693409992:web:1009e88ddc615568078bfd",
  measurementId: "G-N35LXB6P5T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
