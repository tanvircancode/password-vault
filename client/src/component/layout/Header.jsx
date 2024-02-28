import { useDispatch, useSelector } from "react-redux";
import { BsBoxArrowRight } from "react-icons/bs";
import "./layout.scss";

const Header = () => {
    const username = useSelector((state) => state.user.name);
    const initials = username
        .split(" ")
        .map((word) => word[0])
        .join("");

    const handleLogout = () => {
        alert('s')
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary xxx">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Vault Manager
                </a>
                <button
                    className="navbar-toggler "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse position-relative"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav">
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
                    <div className="fff d-flex ">
                        <button className="circular-button">{initials}</button>
                        <button
                            onClick={handleLogout}
                            className="signout-button"
                        >
                            <span className="logout-text">Logout</span>
                            <BsBoxArrowRight className="signout-icon" />
                        </button>

                        {/* <BsBoxArrowRight className="arr" style={{fontSize: '25px'}} /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
