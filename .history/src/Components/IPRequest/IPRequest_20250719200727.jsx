import { db } from "../../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const IPRequest = () =>{
  useEffect(() => {
    const fetchAndStoreIP = async () => {
      try {
        // Fetch IP information from ipwho.is
        const response = await axios.get('https://ipwho.is/');
        const ipData = response.data;

        // Prepare data to store
        const ipInfo = {
          ip: ipData.ip,
          country: ipData.country,
          city: ipData.city,
          region: ipData.region,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        };

        // Store in Firebase
        const ipRef = ref(db, 'visitorIPs');
        const newIpRef = push(ipRef);
        await set(newIpRef, ipInfo);
      } catch (error) {
        console.error('Error fetching or storing IP:', error);
      }
    };

    fetchAndStoreIP();
  }, []);

  return null; // This component doesn't render anything
};

export default IPRequest;