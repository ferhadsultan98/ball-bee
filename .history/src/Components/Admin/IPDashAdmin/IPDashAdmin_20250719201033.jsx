// src/Components/Admin/IPDashAdmin/IPDashAdmin.jsx
import React, { useState, useEffect } from 'react';
import { db, ref, onValue } from '../../../Firebase/Firebase';
import './IPDashAdmin.scss'; // Create this SCSS file for styling

const IPDashAdmin = () => {
  const [visitorIPs, setVisitorIPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ipRef = ref(db, 'visitorIPs');
    const unsubscribe = onValue(ipRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ipList = Object.entries(data).map(([id, info]) => ({
          id,
          ...info,
        }));
        setVisitorIPs(ipList.reverse()); // Reverse to show latest first
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching IP data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="ip-dashboard">
      <h2>Visitor IP Dashboard</h2>
      <div className="ip-table">
        <table>
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Country</th>
              <th>Region</th>
              <th>City</th>
              <th>Timestamp</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {visitorIPs.map((visitor) => (
              <tr key={visitor.id}>
                <td>{visitor.ip}</td>
                <td>{visitor.country}</td>
                <td>{visitor.region}</td>
                <td>{visitor.city}</td>
                <td>{new Date(visitor.timestamp).toLocaleString()}</td>
                <td>{visitor.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IPDashAdmin;