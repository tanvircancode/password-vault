/* eslint-disable react/prop-types */

import { setMakeBlur, setPopup } from "../../store";
import "../modal.scss";
import { useSelector , useDispatch } from "react-redux";


const MoveOrgModal = () => {
    
    const organizations = useSelector((state) => state.organizations);
    const popup = useSelector((state) => state.popup);
    
    const dispatch = useDispatch();

    const closePopup = () => {
        
        dispatch(setPopup(null));
        dispatch(setMakeBlur({ makeBlur: false }));
    };

  return (
    <div
            className={`modal fade ${popup === "moveToOrg" ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: popup === "moveToOrg"  ? "block" : "none" }}
            aria-hidden={popup===null}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header custom-modal-bg">
                        <h5 className="modal-title">Move To Organization</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={closePopup}
                        ></button>
                    </div>
                    <div className="modal-body pt-4 pb-4 custom-modal-body" style={{ textAlign: "left" }}>
                        <h5>Organizations</h5>
                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle custom-dropdown"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Select
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="modal-footer custom-modal-bg"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button type="button" className="btn btn-primary">
                            Move
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={closePopup}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MoveOrgModal