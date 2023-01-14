import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDEBVpT87t8_f8RYJMxnkdzDJ91K5vNKcU",
  authDomain: "medical-5bcc8.firebaseapp.com",
  projectId: "medical-5bcc8",
  storageBucket: "medical-5bcc8.appspot.com",
  messagingSenderId: "558390366302",
  appId: "1:558390366302:web:f48cc7b4a976d775a6a4cf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);