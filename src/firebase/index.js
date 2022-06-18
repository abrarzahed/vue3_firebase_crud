import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA33U8ZxM63iXL18vRswDG_lxGflMGssgo",
  authDomain: "v-todos-90c06.firebaseapp.com",
  projectId: "v-todos-90c06",
  storageBucket: "v-todos-90c06.appspot.com",
  messagingSenderId: "478143438348",
  appId: "1:478143438348:web:5da8f692294587bcaf9829",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
