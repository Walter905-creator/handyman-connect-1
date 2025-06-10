import AIAssistant from "./pages/AIAssistant";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Subscribe from "./components/Subscribe"; // adjust the path if needed
import Terms from "./pages/Terms"; // make sure this file exists
import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <h1>🛠️ Handyman Connect</h1>
        <Routes><Route path="/ai" element={<AIAssistant />} />
          <Route
            path="/"
            element={
              <>
                <Subscribe />
                <p>Server message: {message}</p>
              </>
            }
          />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
