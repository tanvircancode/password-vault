/* eslint-disable react/prop-types */

import { useState } from "react";
import "../modal.scss";
import { toast } from 'react-toastify';

const AddOrgModal = ({ openAddModal, setOpenAddModal }) => {

    const [orgname, setOrgname] = useState('');
    const [email, setEmail] = useState('');

    const handleAddOrg = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if(!isValidEmail) {
            toast.error('invalid email');
        }
        else if(orgname.length === 0 || orgname.length > 50) {
            toast.error("Invalid Name");
        }
        else {
            
        }

    }

    return (
        <div
            className={`modal fade ${openAddModal ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: openAddModal ? "block" : "none" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Organization</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setOpenAddModal(false)}
                        ></button>
                    </div>
                    <div
                        className="modal-body pt-4 pb-4"
                        style={{ textAlign: "left" }}
                    >
                        <div className="mb-3">
                            <label className="form-label fw-bold text-left">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                aria-label="Username"
                                onChange={(e) => setOrgname(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="form-label fw-bold text-left">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="modal-footer"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button type="button" className="btn btn-primary" onClick={handleAddOrg}>
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => setOpenAddModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrgModal;
