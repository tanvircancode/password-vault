// import { useNavigate } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import "./layout.scss";

const Header = () => {
    // const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" style={{marginBottom:4}}>
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
                            style={{color:'black', border:'none',padding:0}}
                        >
                           Username
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" href="#">
                                Logged in as Username
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Logout
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
