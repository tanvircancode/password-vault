import { BsFillShieldLockFill } from "react-icons/bs";
import "./layout.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import axios from "axios";
import { setLogout } from "../../store";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeLink, setActiveLink] = useState("");

    const token = useSelector((state) => state.token);
    const userData = useSelector((state) => state.user);
    const blur = useSelector((state) => state.makeBlur);

    const dispatch = useDispatch();

    

    const handleNavLinkClick = (path) => {
        setActiveLink(path);
        navigate(path);
    };

    const handleLogout = async () => {
        await axios
            .get(`${BASE_URL}/api/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.status) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user_id");
                    toast.success(res.data.message);
                    dispatch(setLogout());
                    navigate("/login");
                }
            })
            .catch((error) => {
                toast.error("Server is not responding");
            });
    };

    useEffect(() => {
        if (userData === null) {
            navigate("/login");
        }
        setActiveLink(location.pathname);
    }, [userData,location.pathname]);

    let loggedUserName = "";

    if (userData !== null) {
        loggedUserName = userData.name;
    }

    return (
        <nav
            className={`navbar navbar-expand-lg bg-body-tertiary ${
                blur ? "is-blur" : ""
            }`}
        >
            <div className="container-fluid d-flex">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="navbar-brand" style={{ marginBottom: 4 }}>
                        <BsFillShieldLockFill style={{ color: "#0D6EFD" }} />
                    </div>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className={`nav-item ${activeLink==="/home" ? "active" : ''}`}>
                                <a
                                    className="nav-link"
                                    aria-current="page"
                                    onClick={() => handleNavLinkClick("/home")}
                                >
                                    Home
                                </a>
                            </li>
                            <li
                                className={`nav-item ${activeLink==="/tools" ? "active" : ''}`}
                            >
                                <a
                                    className="nav-link"
                                    onClick={() => handleNavLinkClick("/tools")}
                                >
                                    Tools
                                </a>
                            </li>
                        </ul>
                    </div>
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
                            {userData !== null && (
                                <span> Hi,{loggedUserName}</span>
                            )}
                        </button>
                        <ul className="dropdown-menu">
                            {/* <li>Logged in as {userData.firstName}</li> */}
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
