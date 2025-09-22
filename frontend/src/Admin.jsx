import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Admin() {
  const [message, setMessage] = useState("");
  const [visits, setVisits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("accessToken");

      try {
        const res = await axios.get("http://localhost:5000/api/admin", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(res.data.message);
        setVisits(res.data.visits);
      } catch (err) {
        // Try refresh
        try {
          const refreshRes = await axios.post("http://localhost:5000/api/refresh");
          localStorage.setItem("accessToken", refreshRes.data.accessToken);

          const retryRes = await axios.get("http://localhost:5000/api/admin", {
            headers: { Authorization: `Bearer ${refreshRes.data.accessToken}` }
          });
          setMessage(retryRes.data.message);
          setVisits(retryRes.data.visits);
        } catch (refreshErr) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <h1>{message || "Loading..."}</h1>
      <p>Total Admin Visits: {visits}</p>
      <button className="logout-button"  onClick={logout}>Logout</button>
    </div>
  );
}

export default Admin;
