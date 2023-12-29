// import { useState } from "react";
import "./register.scss";
import { BsPersonFillUp  } from "react-icons/bs";
import rightImage from "../../assets/register.jpg";

function Register() {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // Handle form submission logic here

    return (
        <div className="login-page">
            <div className="right-section">
                <img src={rightImage} alt="image here" />
            </div>
            <div className="left-section">
                <div className="form-top-section">
                    <BsPersonFillUp  style={{fontSize: 30, marginBottom: 6}}/>
                    <h2>Register</h2>
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
                    <div className="mb-4 form-input">
                        <label className="form-label">Password Hint</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="form-input" >
                        <button type="submit" className="btn btn-primary" style={{width:'100%'}} >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Register;
