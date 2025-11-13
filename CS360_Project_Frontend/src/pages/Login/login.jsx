import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import routed_connectors from "../../components/Connector/connector";
import "./login.scss";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await routed_connectors.login_user(username, password);
        console.log(response)
        if (response.Success) {
            // Redirect or perform further actions upon successful login
            setUser({ username });
            setMessage("Login successful!");
            navigate("/");
        } else {
            setMessage(response.Failed || "Login failed. Please try again.");
        }

    };

    const handleSignup = async () => {
        navigate("/signup");
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
                <button type="submit" onClick={handleSignup}>Signup</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
