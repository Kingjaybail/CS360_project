import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../src/context/UserContext"
import Navbar from "../src/components/Navbar/navbar";
import Home from "./pages/Home/home.jsx";
import Login from "../src/pages/Login/login";
import Contact from "./pages/Contact/contact.jsx";
import About from "./pages/About/about.jsx";
import Library from "./pages/Library/library.jsx";
import Signup from "./pages/Signup/signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute/protectedroute.jsx";

export default function App() {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </UserProvider>
    </div>
  );
}
