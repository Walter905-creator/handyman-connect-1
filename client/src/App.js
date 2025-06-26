import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AIAssistant from "./pages/AIAssistant";
import Subscribe from "./pages/Subscribe";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/AdminDashboard";  // ✅ NEW ADMIN PAGE

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api`)
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <Router>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <Navbar />
        <h1>🛠️ Handyman Connect</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<AdminDashboard />} />  {/* ✅ Admin Dashboard */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
