// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIUTN5G_wHmiT8HS9VRvxNmxo-EpzgrLo",
  authDomain: "todo-app-3c6b0.firebaseapp.com",
  projectId: "todo-app-3c6b0",
  storageBucket: "todo-app-3c6b0.appspot.com",
  messagingSenderId: "452520877652",
  appId: "1:452520877652:web:dd72568b7e41291474d7c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Export firestore database
// It will be imported into your react app whenever it is needed
export {db};