import { HashRouter } from "react-router-dom";
import Router from "./router";
import Navbar from "../components/Navbar";
import "../styles/App.css";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Router />
    </HashRouter>
  );
}

export default App;
