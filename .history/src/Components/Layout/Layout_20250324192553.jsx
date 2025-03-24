// src/components/Layout.jsx
import React from 'react';

import { Outlet } from 'react-router-dom'; // To render child routes
import Header from '../Common/Header/Header';

const Layout = () => {
  return (
    <div className="layout">
      <Header/>
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;