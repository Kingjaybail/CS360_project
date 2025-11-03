import { Routes, Route, NavLink } from "react-router-dom";
import Home from "../CS360_Project_Frontend/src/Home/home";
import Navbar from "../CS360_Project_Frontend/src/components/Navbar/navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <nav style={{ padding: "1rem" }}>
        <NavLink to="/" end style={{ marginRight: 8 }}>Home</NavLink>
        <NavLink to="/about" style={{ marginRight: 8 }}>About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink> {/* samples */}
      </nav>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}
