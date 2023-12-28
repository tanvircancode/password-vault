import { useState } from "react";
import "./Login.scss";
import { BsBag } from "react-icons/bs";
import rightImage from "../../assets/login_img.png";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission logic here

    return (
        <div className="login-page">
            
            <div className="left-section">
                <div className="form-top-section">
                    <BsBag />
                    <h2>Login</h2>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="bottom-section">
                        <button type="submit">Login</button>
                        <span style={{ fontSize: 12 }}>
                            New here? Create Account
                        </span>
                    </div>
                </form>
            </div>
            <div className="right-section">
                <img src={rightImage} alt="image here" />
            </div>
        </div>
    );
}

export default Login;
