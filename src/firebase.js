// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRfL9ENNwgTJeX9jyrF8J-VquNE-NZRQ0",
  authDomain: "edu-mart-4ca37.firebaseapp.com",
  projectId: "edu-mart-4ca37",
  storageBucket: "edu-mart-4ca37.firebasestorage.app",
  messagingSenderId: "330259455071",
  appId: "1:330259455071:web:787f8f4723897edc780fea",
  measurementId: "G-L17H9CY8CF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export { auth, provider, signInWithPopup, signOut };