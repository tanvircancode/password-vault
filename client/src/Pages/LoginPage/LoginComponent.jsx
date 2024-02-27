import { useState } from "react";
import "./LoginCompStyles.scss";
import LoginForm from "./LoginForm";

const LoginComponent = () => {
    const [mode, setMode] = useState("login");

    const toggleMode = () => {
        const newMode = mode === "login" ? "signup" : "login";
        setMode(newMode);
    };

    return (
        <div className={`app app--is-${mode}`}>
            <div
                className={`form-block-wrapper form-block-wrapper--is-${mode}`}
            ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header">
                    <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
                    <div className="form-block__toggle-block">
                        <span>
                            {mode === "login" ? "Don't" : "Already"} have an
                            account?{" "}
                            <span className="auth-link" onClick={toggleMode}>
                                {mode === "login" ? "Register" : "Login"} here
                            </span>
                        </span>

                        {/* <div className="checkbox-label">
                            <input
                                id="form-toggler"
                                type="checkbox"
                                onClick={toggleMode}
                                className={
                                    mode === "login" || mode === "signup"
                                        ? "hidden"
                                        : ""
                                }
                            />

                            <label
                                htmlFor="form-toggler"
                                className={
                                    mode === "login" || mode === "signup"
                                        ? "hide-label"
                                        : "input-label"
                                }
                            ></label>
                        </div> */}
                    </div>
                </header>
                <LoginForm mode={mode} />
            </section>
        </div>
    );
};

export default LoginComponent;
