// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quickmart-app-93f4e.firebaseapp.com",
  projectId: "quickmart-app-93f4e",
  storageBucket: "quickmart-app-93f4e.appspot.com",
  messagingSenderId: "855570077638",
  appId: "1:855570077638:web:1586e69a47278da337c4c7",
  measurementId: "G-GFD45NW646"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);