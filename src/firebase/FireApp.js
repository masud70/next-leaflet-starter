// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3DLFaeNFlOxMcrQuF2Z80WImPvotlshw",
  authDomain: "project-bd-c3e74.firebaseapp.com",
  projectId: "project-bd-c3e74",
  storageBucket: "project-bd-c3e74.appspot.com",
  messagingSenderId: "778058149275",
  appId: "1:778058149275:web:888f86a348ea0bec57453e",
  measurementId: "G-7QL1568MMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app