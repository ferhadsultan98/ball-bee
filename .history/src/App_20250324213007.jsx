// src/App.jsx
import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './Languages/AZ'; 
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Gallery from './Pages/Gallery/Gallery';
import Products from './Pages/Products/Products';
import Contact from './Pages/Contact/Contact';
import BallBeeAdmin from './Components/Admin/BallBeeAdmin';
import BallBeeLogin from './Pages/Login/BallBeeLogin';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          {/* Routes with Header and Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
    </I18nextProvider>
  );
}

export default App;