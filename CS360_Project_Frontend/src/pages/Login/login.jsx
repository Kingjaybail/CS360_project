import { useState } from "react";
import routed_connectors from "../../components/connector/connector"
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await routed_connectors.auth.login(username, password);

    if (response.success?.toLowerCase().includes("success")) {
            setMessage("Login successful!");
            // Redirect or perform further actions upon successful login
        } else {
            setMessage(response.message || "Login failed. Please try again.");
        }

    };

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
            </form>
            <p>{message}</p>
        </div>
    );
}
