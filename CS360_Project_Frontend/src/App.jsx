import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Navbar from "../src/components/Navbar/navbar";
import Login from "../src/pages/Login/login";
import Contact from "./pages/Contact/contact.jsx";
import About from "./pages/About/about.jsx";
import Library from "./pages/Library/library.jsx";
import Signup from "./pages/Signup/signup.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
