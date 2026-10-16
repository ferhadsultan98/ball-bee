"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA10P0eLd-NWyUunvcqx42ggvKb7jHMRs0",
  authDomain: "ball-bee.firebaseapp.com",
  databaseURL: "https://ball-bee-default-rtdb.firebaseio.com",
  projectId: "ball-bee",
  storageBucket: "ball-bee.firebasestorage.app",
  messagingSenderId: "236339293455",
  appId: "1:236339293455:web:2c7b6f592eda746a80a27a",
  measurementId: "G-M650RBQRXW",
};

export function getDb() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getDatabase(app);
}

export { ref, set, onValue, update, remove, push, increment } from "firebase/database";
