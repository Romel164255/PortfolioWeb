import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminData, logout } from "../services/auth";

function Admin() {
  const [data, setData]     = useState(null);
  const [error, setError]   = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await adminData(token);
        setData(res.data);
      } catch {
        navigate("/login");
      }
    };

    load();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // logout endpoint failure is non-critical
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  if (!data) return <p className="loading-text">Loading…</p>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Visitors</h4>
          <span>{data.totalVisitors}</span>
        </div>
        <div className="stat-card">
          <h4>Total Messages</h4>
          <span>{data.totalMessages}</span>
        </div>
      </div>

      <hr className="admin-divider" />

      <h2>Messages</h2>

      {data.messages.length === 0 && (
        <p style={{ color: "var(--text-muted)" }}>No messages yet.</p>
      )}

      {data.messages.map((msg) => (
        <div key={msg.id} className="admin-message-card">
          <strong>{msg.name}</strong>
          <p>{msg.message}</p>
          <small>{new Date(msg.created_at).toLocaleString()}</small>
        </div>
      ))}

      <button onClick={handleLogout} style={{ marginTop: "2rem" }}>
        Logout
      </button>
    </div>
  );
}

export default Admin;
