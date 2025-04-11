import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./Languages/i18n";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Gallery from "./Pages/Gallery/Gallery";
import Products from "./Pages/Products/Products";
import Contact from "./Pages/Contact/Contact";
import BallBeeAdmin from "./Components/Admin/BallBeeAdmin";
import BallBeeLogin from "./Pages/Login/BallBeeLogin";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScroolButton from "./Components/ScroolButton/ScroolButton";
import BeeLoader from "./Components/Loading/BeeLoader";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = oldProgress + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    // Set a timer to hide loader after completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="products" element={<Products />} />
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
      </Router>
      <ScroolButton />
    </I18nextProvider>
  );
}

export default App;