import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Automatically attach the admin token (from localStorage) to all axios requests
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("adminToken")}`;

export default function AdminDashboard() {
  const [pros, setPros] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPro, setNewPro] = useState({ name: "", phone: "", trade: "" });
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_API_URL || 'https://handyman-connect-1-1.onrender.com';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError("");
      const proRes = await axios.get(`${API}/api/admin/pros`);
      const reqRes = await axios.get(`${API}/api/admin/job-requests`);
      setPros(proRes.data);
      setRequests(reqRes.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error loading admin data:", err);
      setLoading(false);
      
      if (err.response?.data?.message) {
        setError(`Server Error: ${err.response.data.message}`);
      } else if (err.response?.status === 503) {
        setError("Database not connected. Please check environment variables in Render dashboard.");
      } else if (err.response?.status === 500) {
        setError("Server configuration issue. Check Render logs and environment variables.");
      } else {
        setError("Unable to connect to server. Please check your deployment.");
      }
    }
  };

  const toggleNotifications = async (proId) => {
    try {
      await axios.put(`${API}/api/admin/pros/${proId}/toggle`);
      fetchData();
    } catch (err) {
      console.error("❌ Error toggling notifications:", err);
    }
  };

  const deletePro = async (proId) => {
    if (!window.confirm("Are you sure you want to delete this pro?")) return;
    try {
      await axios.delete(`${API}/api/admin/pros/${proId}`);
      fetchData();
    } catch (err) {
      console.error("❌ Error deleting pro:", err);
    }
  };

  const addPro = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/admin/pros`, newPro);
      setNewPro({ name: "", phone: "", trade: "" });
      fetchData();
    } catch (err) {
      console.error("❌ Error adding pro:", err);
    }
  };

  if (loading) return <p>Loading Admin Dashboard...</p>;

  if (error) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>🛠️ Admin Dashboard</h1>
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#f8d7da", 
          border: "1px solid #f5c6cb", 
          borderRadius: "5px",
          marginBottom: "20px"
        }}>
          <h3>❌ Configuration Error</h3>
          <p><strong>Error:</strong> {error}</p>
          <hr />
          <h4>🔧 How to Fix:</h4>
          <ol>
            <li>Go to your <a href="https://dashboard.render.com" target="_blank" rel="noopener noreferrer">Render Dashboard</a></li>
            <li>Find your service and click "Environment"</li>
            <li>Add the missing environment variables</li>
            <li>Save and wait for redeploy</li>
          </ol>
          <p><strong>Test URLs:</strong></p>
          <ul>
            <li><a href={`${API}/api/env-check`} target="_blank" rel="noopener noreferrer">Check Environment Variables</a></li>
            <li><a href={`${API}/api/health`} target="_blank" rel="noopener noreferrer">Check Database Health</a></li>
          </ul>
          <button onClick={fetchData} style={{ marginTop: "10px", padding: "8px 16px" }}>
            🔄 Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛠️ Admin Dashboard</h1>

      {/* Add New Pro Form */}
      <section style={{ marginBottom: "3rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Add New Pro</h2>
        <form onSubmit={addPro} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Name"
            value={newPro.name}
            onChange={(e) => setNewPro({ ...newPro, name: e.target.value })}
            required
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <input
            type="tel"
            placeholder="Phone (+1234567890)"
            value={newPro.phone}
            onChange={(e) => setNewPro({ ...newPro, phone: e.target.value })}
            required
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <select
            value={newPro.trade}
            onChange={(e) => setNewPro({ ...newPro, trade: e.target.value })}
            required
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <option value="">Select Trade</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Painting">Painting</option>
            <option value="HVAC">HVAC</option>
            <option value="Roofing">Roofing</option>
          </select>
          <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "4px" }}>
            Add Pro
          </button>
        </form>
      </section>

      {/* Pros Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Pros</h2>
        {pros.map((pro) => (
          <div key={pro._id} style={{ marginBottom: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
            <p><strong>Name:</strong> {pro.name}</p>
            <p><strong>Trade:</strong> {pro.trade}</p>
            <p><strong>Phone:</strong> {pro.phone}</p>
            <p><strong>Wants SMS:</strong> {pro.wantsNotifications ? "✅ Yes" : "❌ No"}</p>
            <button onClick={() => toggleNotifications(pro._id)} style={{ marginRight: "1rem" }}>
              Toggle SMS
            </button>
            <button onClick={() => deletePro(pro._id)} style={{ backgroundColor: "#dc2626", color: "white" }}>
              Delete
            </button>
          </div>
        ))}
      </section>

      {/* Client Requests Section */}
      <section>
        <h2>Client Job Requests</h2>
        {requests.map((req) => (
          <div key={req._id} style={{ marginBottom: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
            <p><strong>Trade:</strong> {req.trade}</p>
            <p><strong>Name:</strong> {req.name}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Phone:</strong> {req.phone}</p>
            <p><strong>Address:</strong> {req.address}</p>
            <p><strong>Description:</strong> {req.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
