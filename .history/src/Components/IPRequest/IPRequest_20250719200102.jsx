import { db } from "../../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function IPRequest() {
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

  return null;
}

export default IPRequest;