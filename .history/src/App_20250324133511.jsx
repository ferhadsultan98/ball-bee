// App.jsx
import React from 'react';
import './App.css';
import BallBeeHoney from './SinglePage/BallBeeHoney';
import BallBeeAdmin from './SinglePage/BallBeeAdmin';
import Login from './Login'; // Login componentini ayrı dosyadan import ediyoruz
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<BallBeeHoney />}
        />
        <Route 
          path="/login" 
          element={<Login onLogin={setIsAuthenticated} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BallBeeAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;