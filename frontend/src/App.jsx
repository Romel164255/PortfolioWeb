import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Contact from "./Contact";
import Login from "./Login";
import Admin from "./Admin";
import "./App.css";

function Navbar() {
  return (
    <nav className="Navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
      <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
      <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin</NavLink>
    </nav>
  );
}


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
