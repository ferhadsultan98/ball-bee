// src/Components/Admin/IPDashAdmin/IPDashAdmin.jsx
import React, { useState, useEffect } from 'react';
import { db, ref, onValue } from '../../../Firebase/Firebase';
import './IPDashAdmin.scss';

const IPDashAdmin = () => {
  const [visitorIPs, setVisitorIPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const ipRef = ref(db, 'visitorIPs');
    const unsubscribe = onValue(ipRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ipList = Object.entries(data).map(([id, info]) => ({
          id,
          ...info,
        }));
        setVisitorIPs(ipList.reverse());
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching IP data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalPages = Math.ceil(visitorIPs.length / itemsPerPage);
  const paginatedIPs = visitorIPs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
              <th>IP Addresi</th>
              <th>Country</th>
              <th>Region</th>
              <th>City</th>
              <th>Timestamp</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {paginatedIPs.map((visitor) => (
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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IPDashAdmin;