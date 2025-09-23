// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG92W0F3lESrRwdLHW-d2tmjGFDcpKMSo",
  authDomain: "studio-3132237263-6c506.firebaseapp.com",
  projectId: "studio-3132237263-6c506",
  storageBucket: "studio-3132237263-6c506.appspot.com",
  messagingSenderId: "149882375215",
  appId: "1:149882375215:web:afbf61974fd48ac8fdcada",
  measurementId: "G-K3PN27KCLL"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
