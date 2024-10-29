import { initializeApp } from "firebase/app";
import{ getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyALyFu53bMmnrF66nqmH43tKci1eWJr4Bc",
  authDomain: "imageuploaddb-aa598.firebaseapp.com",
  projectId: "imageuploaddb-aa598",
  storageBucket: "imageuploaddb-aa598.appspot.com",
  messagingSenderId: "1051353225597",
  appId: "1:1051353225597:web:83ccc8b0d7c00e1e259414"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)