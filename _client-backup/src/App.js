import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Subscribe from "./pages/Subscribe";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'https://handyman-connect-1-1.onrender.com';
    
    axios
      .get(`${API_URL}/api`)
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <Router>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <Navbar />
        <h1>� Fixlo</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
