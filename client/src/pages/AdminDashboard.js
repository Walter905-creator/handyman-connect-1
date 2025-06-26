// client/src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [pros, setPros] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const proRes = await axios.get(`${API}/api/admin/pros`);
      const reqRes = await axios.get(`${API}/api/admin/job-requests`);
      setPros(proRes.data);
      setRequests(reqRes.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error loading admin data:", err);
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

  if (loading) return <p>Loading Admin Dashboard...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛠️ Admin Dashboard</h1>

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
