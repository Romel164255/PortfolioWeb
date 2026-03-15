import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminData, logout } from "../services/auth";
import { getProjectStats } from "../services/Projects";

/* ─── small helper: render every key/value pair from a stats object ─── */
function StatBlock({ title, stats }) {
  if (!stats) return null;

  // Service returned an error object
  if (stats.error) {
    return (
      <div className="stat-card project-stat-card">
        <h4>{title}</h4>
        <p style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
          ⚠ Service unavailable
          {stats.status ? ` (HTTP ${stats.status})` : ""}
        </p>
      </div>
    );
  }

  const entries = Object.entries(stats);

  return (
    <div className="stat-card project-stat-card">
      <h4>{title}</h4>
      {entries.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
          No data returned.
        </p>
      ) : (
        entries.map(([key, val]) => (
          <div key={key} className="project-stat-row">
            <span className="project-stat-key">{key}</span>
            <span className="project-stat-val">{String(val)}</span>
          </div>
        ))
      )}
    </div>
  );
}

/* ─── loading skeleton ─── */
function SkeletonCard() {
  return (
    <div className="stat-card project-stat-card skeleton-card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
      <div className="skeleton skeleton-line" />
    </div>
  );
}

function Admin() {
  const [data, setData]                 = useState(null);
  const [projectStats, setProjectStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError]     = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("accessToken");

      /* ── 1. Auth-guarded admin data ── */
      try {
        const res = await adminData(token);
        setData(res.data);
      } catch {
        navigate("/login");
        return;
      }

      /* ── 2. Project stats (non-blocking — failure won't kick user out) ── */
      try {
        const statsRes = await getProjectStats();
        setProjectStats(statsRes.data);
      } catch (err) {
        console.error("Project stats error:", err);
        setStatsError("Could not load project stats. The external APIs may be down.");
      } finally {
        setStatsLoading(false);
      }
    };

    load();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // non-critical
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  if (!data) return <p className="loading-text">Loading dashboard…</p>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* ── Site Stats ── */}
      <section>
        <h2>Site Overview</h2>
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
      </section>

      <hr className="admin-divider" />

      {/* ── Project Stats ── */}
      <section>
        <h2>Live Project Stats</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "1.2rem" }}>
          Fetched live from each project's <code>/api/stats</code> endpoint via the backend aggregator.
        </p>

        {statsError && (
          <div className="stats-error-banner">
            ⚠ {statsError}
          </div>
        )}

        <div className="stats-row">
          {statsLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : projectStats ? (
            <>
              <StatBlock title="RChat"        stats={projectStats.rchat} />
              <StatBlock title="URL Shortener" stats={projectStats.shortener} />
              <StatBlock title="E-Commerce"   stats={projectStats.ecommerce} />
            </>
          ) : null}
        </div>
      </section>

      <hr className="admin-divider" />

      {/* ── Messages ── */}
      <section>
        <h2>Messages</h2>

        {data.messages.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No messages yet.</p>
        ) : (
          data.messages.map((msg) => (
            <div key={msg.id} className="admin-message-card">
              <strong>{msg.name}</strong>
              <p>{msg.message}</p>
              <small>{new Date(msg.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Admin;
