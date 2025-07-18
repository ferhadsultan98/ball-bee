import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation, // Import useLocation
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./Languages/i18n";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Gallery from "./Pages/Gallery/Gallery";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/Products/ProductDetails";
import Contact from "./Pages/Contact/Contact";
import BallBeeAdmin from "./Components/Admin/BallBeeAdmin";
import BallBeeLogin from "./Pages/Login/BallBeeLogin";
import ScrollButton from "./Components/ScroolButton/ScroolButton"; // Fixed typo in import
import BeeLoader from "./Components/Loading/BeeLoader";
import HomeDetails from "./Pages/Home/HomeDetails/HomeDetails";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Create a ScrollToTop component to handle scrolling on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling for better UX
    });
  }, [pathname]); // Trigger on pathname change

  return null; // This component doesn't render anything
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (loading) {
    return <BeeLoader progress={progress} />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ScrollToTop /> {/* Add ScrollToTop component */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            
            <Route path="contact" element={<Contact />} />
            <Route path="details/:topicId" element={<HomeDetails />} />
          </Route>

          <Route
            path="/bee"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BallBeeAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<BallBeeLogin onLogin={setIsAuthenticated} />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ScrollButton /> 
      </Router>
    </I18nextProvider>
  );
}

export default App;