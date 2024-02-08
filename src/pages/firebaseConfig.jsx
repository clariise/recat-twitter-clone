// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2a6ujyPaypR_zXXMrT7yBazEXMUiV7qE",
  authDomain: "twitter-69c69.firebaseapp.com",
  projectId: "twitter-69c69",
  storageBucket: "twitter-69c69.appspot.com",
  messagingSenderId: "779397052580",
  appId: "1:779397052580:web:8b22f8606bc8205e814e31",
  measurementId: "G-3R9MTK3RN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;