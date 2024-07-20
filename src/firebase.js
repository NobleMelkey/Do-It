import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAEiyCODY-a_SarujnaPoIB5imZKwqStNA",
  authDomain: "react-auth-1e1e7.firebaseapp.com",
  projectId: "react-auth-1e1e7",
  storageBucket: "react-auth-1e1e7.appspot.com",
  messagingSenderId: "995331811429",
  appId: "1:995331811429:web:1e17800c6ee46ede0f7e8c"
};
 
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);