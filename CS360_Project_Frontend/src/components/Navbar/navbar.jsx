import "./navbar.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("username");
      setUser(null);
      navigate("/login");
    };


    return (
        <nav className="navbar">
            <div className="navbar-inner">

                <ul className="nav-left nav-list">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/library">Library</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
//                     <li><NavLink to="/analytics">Analytics</NavLink></li>
                </ul>

                <div className="nav-center">
{/*                     <input type="text" id="search" placeholder="Search" /> */}
{/*                     <button className="btn">Search</button> */}
                </div>

                <div className="nav-right">
                    {user ? (
                        <>
                            <span className="username-display">
                                Hello, {user.username}
                            </span>
                            <button className="btn logout-btn" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn">Login</NavLink>
                    )}
                </div>

            </div>
        </nav>
    );
}
