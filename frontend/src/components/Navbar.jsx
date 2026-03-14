import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const navigate   = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>

      {isLoggedIn ? (
        <>
          <NavLink to="/admin">Admin</NavLink>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontFamily: "Syne, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "1.1rem 1.5rem",
              cursor: "pointer",
              boxShadow: "none",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}

export default Navbar;
