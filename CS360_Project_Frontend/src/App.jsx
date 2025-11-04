import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Navbar from "../src/components/Navbar/navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}
