// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update, remove, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA10P0eLd-NWyUunvcqx42ggvKb7jHMRs0",
  authDomain: "ball-bee.firebaseapp.com",
  projectId: "ball-bee",
  storageBucket: "ball-bee.firebasestorage.app",
  messagingSenderId: "236339293455",
  appId: "1:236339293455:web:2c7b6f592eda746a80a27a",
  measurementId: "G-M650RBQRXW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export all necessary Firebase functions and instances
export { db, auth, analytics, ref, set, onValue, update, remove, push };