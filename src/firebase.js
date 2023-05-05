// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADTaH11XtXtGukJycLHCTMvA7Voe6wONo",
  authDomain: "artefact-afd9c.firebaseapp.com",
  projectId: "artefact-afd9c",
  storageBucket: "artefact-afd9c.appspot.com",
  messagingSenderId: "835758993180",
  appId: "1:835758993180:web:3cf54c9b3d17fdbf9d94d9",
  measurementId: "G-MJNM422M8E",
  databaseURL : "https://artefact-afd9c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);