// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optional: Only import analytics in browser environments
// import { getAnalytics, isSupported } from "firebase/analytics"; // Uncomment only if you're using analytics in the browser

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Analytics (only if you need it and are in browser context)
// let analytics;
// if (typeof window !== "undefined") {
//   isSupported().then((yes) => {
//     if (yes) analytics = getAnalytics(app);
//   });
// }

export const auth = getAuth(app);
export const db = getFirestore(app);
// export { analytics };
