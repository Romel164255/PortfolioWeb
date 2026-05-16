import { NavLink, useNavigate } from "react-router-dom";
import { GiMolecule } from "react-icons/gi";

function Navbar() {

  const isLoggedIn = Boolean(
    localStorage.getItem("accessToken")
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (

    <nav className="navbar">

      <div className="nav-left">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <div className="nav-right">

        {isLoggedIn ? (
          <>
            <NavLink to="/admin">
              Admin
            </NavLink>

            <button
              onClick={handleLogout}
              className="logout-btn-nav"
            >
              Logout
            </button>
          </>
        ) : (

          <NavLink
            to="/login"
            className="secret-login"
            title="Neural Node"
          >
            <GiMolecule />
          </NavLink>

        )}

      </div>

    </nav>

  );
}

export default Navbar;