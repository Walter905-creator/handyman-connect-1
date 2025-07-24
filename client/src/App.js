import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import other existing pages for full functionality
import Subscribe from "./pages/Subscribe";
import Terms from "./pages/Terms";
import TermsOfService from "./pages/TermsOfService";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import DownloadApp from "./pages/DownloadApp";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import SignUp from "./pages/SignUp";
import ProSupport from "./pages/ProSupport";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  useEffect(() => {
    console.log("🚀 Fixlo Professional UI Loaded");
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          {/* Main routes as specified in requirements */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Additional existing functionality */}
          <Route path="/download" element={<DownloadApp />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pro-support" element={<ProSupport />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
