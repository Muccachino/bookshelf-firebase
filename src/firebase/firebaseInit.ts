// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXmNx87qn4CBRdXtZeivF8hfjWogwgaGU",
  authDomain: "bookshelf-2-0-9d489.firebaseapp.com",
  projectId: "bookshelf-2-0-9d489",
  storageBucket: "bookshelf-2-0-9d489.appspot.com",
  messagingSenderId: "687573184969",
  appId: "1:687573184969:web:a10f38848a13bc6bd8b818"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize Authentication
export const auth = getAuth(app)

//Initialize Database
export const db = getFirestore(app)

//Initialize Storage
export const storage = getStorage(app)