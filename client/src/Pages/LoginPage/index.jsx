// import { useState } from "react";
import "./Login.scss";
import { BsBag } from "react-icons/bs";
import rightImage from "../../assets/login_img.png";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
         if (email.length === 0) {
            toast.error("Email is Required");
        } else if (password.length === 0 || password.length>255) {
            toast.error("Invalid Input For Password");
        } else {
            await axios
            .post(
                `${BASE_URL}/api/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
            .then((res) => {
            //    console.log(res)
                if(res.data.status && res.data.token){
                    toast.success("Logged in Successfully")
                    dispatch(
                        setLogin({
                            user: res.data.user,
                            token: res.data.token,
                        })
                    );
                    navigate("/home");
                }
                else  {
                    toast.error("Server is not responding");
                }
            })
            .catch((error) => {
                // console.log(error)
                if(error.response.status === 404 && !error.response.data.status) {
                    toast.error(error.response.data.message)
                }else{
                    toast.error("Server is not responding");
                }
            });
        }
       
    };

    // Handle form submission logic here

    return (
        <div className="login-page">
            <div className="left-section">
                <div className="form-top-section">
                    <BsBag />
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-input">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                    </div>
                    <div className="mb-3 form-input">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-input">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="right-section" style={{ width: "50%" }}>
                <img src={rightImage} alt="image here" />
            </div>
        </div>
    );
}

export default Login;
