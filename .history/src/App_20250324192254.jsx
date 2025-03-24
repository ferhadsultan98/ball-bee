// App.jsx
import React, { useState } from 'react'; // useEffect'e gerek kalmadı
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


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
        <Route path="/" element={<BallBeeHone />} />
        <Route path="/login" element={<BallBeeLogin onLogin={setIsAuthenticated} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BallBeeAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;