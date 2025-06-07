import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(\`\${process.env.REACT_APP_API_URL}/api\`)
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛠️ Handyman Connect</h1>
      <p>Server message: {message}</p>
    </div>
  );
}

export default App;
