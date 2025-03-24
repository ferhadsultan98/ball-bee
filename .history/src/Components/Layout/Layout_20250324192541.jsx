// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; // To render child routes

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;