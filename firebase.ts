import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAP6t_sFjXPcUVTGmh4_v6ykAI2AM7I63g",
    authDomain: "dropbox-clone-efc01.firebaseapp.com",
    projectId: "dropbox-clone-efc01",
    storageBucket: "dropbox-clone-efc01.appspot.com",
    messagingSenderId: "394855549453",
    appId: "1:394855549453:web:682789fde21ad3e66f6344"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };