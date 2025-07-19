import React, { useEffect } from "react";
import { db } from "../../"; // Assuming firebase-config.js exists with initialized Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function IPRequest() {
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((response) => response.json())
      .then((data) => {
        if (data.ip) {
          addDoc(collection(db, "ip_logs"), {
            ip: data.ip,
            city: data.city || "Unknown",
            country: data.country || "Unknown",
            timestamp: serverTimestamp(),
          }).catch((error) => console.error("Error logging IP:", error));
        }
      })
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  return null;
}

export default IPRequest;