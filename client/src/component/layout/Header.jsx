import { BsFillShieldLockFill } from "react-icons/bs";
import "./layout.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../store";

const Header = () => {
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    console.log(token);
    console.log(userData);

    useEffect(() => {
        if (userData === null) {
            navigate("/login");
        }
    }, [userData]);

    let loggedUserName = "";

    if (userData !== null) {
        loggedUserName = userData.name;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" style={{ marginBottom: 4 }}>
                    <BsFillShieldLockFill style={{ color: "#0D6EFD" }} />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Tools
                            </a>
                        </li>
                    </ul>
                </div>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle bg-transparent"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                                color: "black",
                                border: "none",
                                padding: 0,
                            }}
                        >
                            Hi, {userData !== null && loggedUserName}
                        </button>
                        <ul className="dropdown-menu">
                            {/* <li>Logged in as {userData.firstName}</li> */}
                            <li
                                onClick={() => {
                                    localStorage.setItem("token", null);
                                    dispatch(setLogout());
                                }}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
