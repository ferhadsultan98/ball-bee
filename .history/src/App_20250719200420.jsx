import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import ScrollButton from "./Components/ScroolButton/ScroolButton";
import BeeLoader from "./Components/Loading/BeeLoader";
import HomeDetails from "./Pages/Home/HomeDetails/HomeDetails";
import BlogPage from "./Pages/Blog/BlogPage";
import BlogPageDetails from "./Pages/Blog/BlogPageDetails";
import IPRequest from "./Components/IPRequest/IPRequest";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
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
    }, 0);

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
        <ScrollToTop />
        <IPRequest />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:postId" element={<BlogPageDetails />} />
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
```

<xaiArtifact artifact_id="94ebe548-3195-4832-81c0-d9d9dfd53007" artifact_version_id="5aef793a-7ab5-44e7-8265-d092ca354295" title="IPRequest.jsx" contentType="text/jsx">
```jsx
import { db } from "../../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function IPRequest() {
  fetch("https://ipwho.is/")
    .then((response) => response.json())
    .then((data) => {
      if (data.ip) {
        addDoc(collection(db, "ip_logs"), {
          ip: data.ip,
          city: data.city || "Unknown",
          country: data.country || "Unknown",
          timestamp: serverTimestamp(),
        }).catch((error) => console.error("Error logging IP:", error));
      }
    })
    .catch((error) => console.error("Error fetching IP:", error));

  return null;
}

export default IPRequest;