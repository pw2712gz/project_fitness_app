import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importing the getStorage

const firebaseConfig = {
  apiKey: 'AIzaSyBkuKXiZZz-sYQhIEE_Jnk_oaIoqLjllSs',
  authDomain: 'capstoneproject-c7d68.firebaseapp.com',
  projectId: 'capstoneproject-c7d68',
  storageBucket: 'capstoneproject-c7d68.appspot.com',
  messagingSenderId: '620979246412',
  appId: '1:620979246412:web:29118a38f13c4ff045ebe9',
  measurementId: 'G-XTPTQ8PFSZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initializing storage and exporting it
