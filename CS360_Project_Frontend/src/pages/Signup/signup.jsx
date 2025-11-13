import { useState } from "react";
import routed_connectors from "../../components/Connector/connector";
import "./signup.scss";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await routed_connectors.signup_user(username, password);
        console.log(response)
        if (response.Success) {
            // Redirect or perform further actions upon successful login
            setMessage("Login successful!");
            navigate("/login");
        } else {
            console.log(response)
            setMessage(response.Failed || "Login failed. Please try again.");
        }

    };

    return (
        <div className="login-container">
            <h2>Create new account</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
