import { useState } from "react";
import "./register.scss";
import { BsPersonFillUp } from "react-icons/bs";
import rightImage from "../../assets/register.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { REGISTER_TOKEN, BASE_URL } from "../../config";

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");
    const [passwordHint, setPasswordHint] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length === 0) {
            toast.error("Name is too short");
        } else if (name.length === 0) {
            toast.error("Name is too short");
        } else if (password.length === 0 || password.length < 5) {
            toast.error("Name is too short");
        } else {
            var formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("password_hint", passwordHint);
            formData.append("token", REGISTER_TOKEN);

            const response = await axios
                .post(`${BASE_URL}/api/register`, formData)
                .then((res) => {
                    console.log(res.data.status);
                    if(res.data.status){
                        toast.success("Registration Successful")
                        navigate("/login")
                    }
                    else  {
                        toast.error("Server is not responding");
                    }
                })
                .catch((error) => {
                   
                    if(error.response && error.response.status === 401) {
                        toast.error(error.response.data.message)
                    }else{
                        toast.error("Server is not responding");
                    }
                });
            // navigate("/signin");
        }

        // alert('asd');
    };

    return (
        <div className="login-page">
            <div className="right-section">
                <img src={rightImage} alt="image here" />
            </div>
            <div className="left-section">
                <div className="form-top-section">
                    <BsPersonFillUp style={{ fontSize: 30, marginBottom: 6 }} />
                    <h2>Register</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-input">
                        <label className="form-label" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-input">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={email}
                            aria-describedby="emailHelp"
                            required
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            id="exampleInputPassword1"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 form-input">
                        <label className="form-label">Password Hint</label>
                        <input
                            type="text"
                            value={passwordHint}
                            className="form-control"
                            id="exampleInputPasswordHint"
                            required
                            onChange={(e) => setPasswordHint(e.target.value)}
                        />
                    </div>
                    <div className="form-input">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
