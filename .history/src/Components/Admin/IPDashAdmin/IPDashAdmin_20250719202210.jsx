import React, { useState, useEffect } from 'react';
import { db, ref, onValue } from '../../../Firebase/Firebase';
import './IPDashAdmin.scss';

const IPDashAdmin = () => {
  const [visitorIPs, setVisitorIPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

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

  const countries = [...new Set(visitorIPs.map((visitor) => visitor.country))].sort();

  const filteredIPs = visitorIPs.filter((visitor) => {
    const matchesSearch = 
      visitor.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.userAgent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry ? visitor.country === selectedCountry : true;
    return matchesSearch && matchesCountry;
  });

  const totalPages = Math.ceil(filteredIPs.length / itemsPerPage);
  const paginatedIPs = filteredIPs.slice(
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
      <div className="filters">
        <input
          type="text"
          placeholder="Axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="country-select"
        >
          <option value="">Bütün ölkələr</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="ip-table">
        <table>
          <thead>
            <tr>
              <th>IP Addresi</th>
              <th>Ölkə</th>
              <th>Region</th>
              <th>Şəhər</th>
              <th>Tarix</th>
              <th>Agentlik</th>
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