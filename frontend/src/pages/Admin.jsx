import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminData, refresh, logout } from "../services/auth";

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
        try {
          const r = await refresh();
          localStorage.setItem("accessToken", r.data.accessToken);
          const res = await adminData(r.data.accessToken);
          setData(res.data);
        } catch {
          navigate("/login");
        }
      }
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!data) return <p>Loading…</p>;

  return (
    <>
      <h1>{data.message}</h1>
      <p>Visits: {data.visits}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Admin;
