// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC-0mUwxOXvRXxj-mVOkXdmTf31cKna2Q",
  authDomain: "shopco-44f3d.firebaseapp.com",
  projectId: "shopco-44f3d",
  storageBucket: "shopco-44f3d.firebasestorage.app",
  messagingSenderId: "895630707187",
  appId: "1:895630707187:web:8d97c3a46f87b1f235ea86",
  measurementId: "G-KNWZ0QJS27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {app};