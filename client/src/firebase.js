// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrbWca-GAN7JXORYHG2ciRPeBaFeye2X4",
  authDomain: "dreamtravel-48c15.firebaseapp.com",
  projectId: "dreamtravel-48c15",
  storageBucket: "dreamtravel-48c15.appspot.com",
  messagingSenderId: "148316414791",
  appId: "1:148316414791:web:9949d8db5dca6616caa262"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
