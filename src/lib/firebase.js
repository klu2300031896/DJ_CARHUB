import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY6gTXV-TsG4aVehR3-owp9KmEGOCdojU",
  authDomain: "dj-carhub-6ecb1.firebaseapp.com",
  projectId: "dj-carhub-6ecb1",
  storageBucket: "dj-carhub-6ecb1.firebasestorage.app",
  messagingSenderId: "70985841527",
  appId: "1:70985841527:web:59a94127c13e79edc37f72"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);