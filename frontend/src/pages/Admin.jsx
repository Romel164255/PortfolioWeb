import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setData(res.data);
      } catch {
        navigate("/login");
      }
    };

    load();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`);
    } catch {}

    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!data) return <p>Loading…</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      <h3>Total Visitors: {data.totalVisitors}</h3>
      <h3>Total Messages: {data.totalMessages}</h3>

      <hr />

      <h2>Messages</h2>

      {data.messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            background: "#1a1f2b",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px"
          }}
        >
          <strong>{msg.name}</strong>
          <p>{msg.message}</p>
          <small>{new Date(msg.created_at).toLocaleString()}</small>
        </div>
      ))}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Admin;