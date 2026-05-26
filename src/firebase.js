import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhfW9yZk7R6titOPXPblTJik3AnfwEQ1Y",
  authDomain: "fir-web-app-171b8.firebaseapp.com",
  projectId: "fir-web-app-171b8",
  storageBucket: "fir-web-app-171b8.firebasestorage.app",
  messagingSenderId: "464309625818",
  appId: "1:464309625818:web:3b62d6cd9119262725d6e3",
  measurementId: "G-9VGR6L71GB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// FIRESTORE
export const db = getFirestore(app);

export default app;