import { useState } from "react";
import "./register.scss";
import { BsPersonFillUp } from "react-icons/bs";
import rightImage from "../../assets/register.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");
    const [passwordHint, setPasswordHint] = useState("");

    // eslint-disable-next-line no-undef
    // const registerToken = process.env.REACT_APP_REGISTER_TOKEN;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Name must be minimum 2")
            .max(30, "Name must not be more than 30 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        passwordHint: Yup.string().required("Password Hint is required"),
    });
    const initialValues = {
        name: "",
        email: "",
        password: "",
        passwordHint: "",
    };

    // Handle form submission logic here
    const handleSubmit =  () => {
        // const response = await axios.post(
        //     `process.env.REACT_APP_BASE_URL/signup`,
        //     {
        //         name,
        //         password,
        //         passwordHint
        //     }
        // );
        // navigate("/signin");
        alert('asd');
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
                <Formik
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={handleSubmit} 
                >
                    {({ isSubmitting, errors, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 form-input">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input  
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="exampleInputName"
                                    onChange={(e) => setName(e.target.value)}
                                />  
                            </div>
                            <div className="mb-3 form-input">
                                <label className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                               

                                <div id="emailHelp" className="form-text">
                                    We will never share your email with anyone
                                    else.
                                </div>
                                
                            </div>
                            <div className="mb-3 form-input">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                               
                            </div>
                            <div className="mb-4 form-input">
                                <label className="form-label">
                                    Password Hint
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPasswordHint"
                                    onChange={(e) =>
                                        setPasswordHint(e.target.value)
                                    }
                                />
                              
                            </div>
                            <div className="form-input">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Register;
