/* eslint-disable react/prop-types */

import "../modal.scss";

const MoveOrgModal = ({ openPopup, setOpenPopup }) => {
  return (
    <div
            className={`modal fade ${openPopup ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: openPopup ? "block" : "none" }}
            aria-hidden={!openPopup}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Move To Organization</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setOpenPopup(false)}
                        ></button>
                    </div>
                    <div className="modal-body pt-4 pb-4" style={{ textAlign: "left" }}>
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
                        className="modal-footer"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button type="button" className="btn btn-primary">
                            Move
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => setOpenPopup(false)}
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