// src/components/Layout.jsx
import React from 'react';

import { Outlet } from 'react-router-dom'; // To render child routes
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';

const Layout = () => {
  return (
    <div className="layout">
      <Header/>
      <main>
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;