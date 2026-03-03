import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminData } from "../services/auth";

function Admin() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await adminData(token);
        setData(res.data);
      } catch {
        navigate("/login");
      }
    };
    load();
  }, [navigate]);

  if (!data) return <p>Loading…</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      <h3>Total Visitors: {data.totalVisitors}</h3>
      <h3>Total Messages: {data.totalMessages}</h3>

      <hr />

      <h2>Messages</h2>

      {data.messages.map((msg) => (
        <div key={msg.id} style={{
          background: "#1a1f2b",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px"
        }}>
          <strong>{msg.name}</strong>
          <p>{msg.message}</p>
          <small>{new Date(msg.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Admin;