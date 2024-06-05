// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwfufL8nA4eNczxpZPdmDy7DbatZqENLE",
  authDomain: "reactnative-fireb.firebaseapp.com",
  projectId: "reactnative-fireb",
  storageBucket: "reactnative-fireb.appspot.com",
  messagingSenderId: "426514859400",
  appId: "1:426514859400:web:dfe2f2a0161c058d12663d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, `images/${file.fileName}`);
    try {
      const response = await fetch(file.uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      console.log('Uploaded a blob or file!');
      const url = await getDownloadURL(storageRef);
      console.log(url);
      return url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
  