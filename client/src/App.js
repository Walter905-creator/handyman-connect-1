import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import ContactUs from "./pages/ContactUs";

// 🚀 New conversion-focused components
import UrgencyPopup from "./components/UrgencyPopup";
import ExitIntentModal from "./components/ExitIntentModal";
import StickySignupBar from "./components/StickySignupBar";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'https://fixloapp.onrender.com';
    
    axios
      .get(`${API_URL}/api`)
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <Router>
      <div style={{ fontFamily: "sans-serif" }}>
        <Navbar />
        
        {/* 🚀 Conversion-focused UX components */}
        <UrgencyPopup />
        <ExitIntentModal />
        <StickySignupBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<DownloadApp />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pro-support" element={<ProSupport />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
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
