import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// FIRESTORE
export const db = getFirestore(app);



