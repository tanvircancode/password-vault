// import { useState } from "react";
import "./Login.scss";
import { BsBag } from "react-icons/bs";
import rightImage from "../../assets/login_img.png";

function Login() {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // Handle form submission logic here

    return (
        <div className="login-page">
            <div className="left-section">
                <div className="form-top-section">
                    <BsBag />
                    <h2>Login</h2>
                </div>
                <form>
                    <div className="mb-3 form-input">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">
                            We will never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3 form-input">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="form-input">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="right-section" style={{width:'50%'}}>  
                <img src={rightImage} alt="image here" />
            </div>
        </div>
    );
}

export default Login;
