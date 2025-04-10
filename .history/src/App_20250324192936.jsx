// App.jsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BallBeeHoney from './SinglePage/BallBeeHoney';
import BallBeeLogin from './Login/BallBeeLogin';
import BallBeeAdmin from './Admin/BallBeeAdmin';
import Layout from './Components/Layout/Layout';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  return (
    <Router>
      <Routes>
        {/* Routes with Header and Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<BallBeeHoney />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BallBeeAdmin />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Login route without Header and Footer */}
        <Route path="/login" element={<BallBeeLogin onLogin={setIsAuthenticated} />} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;