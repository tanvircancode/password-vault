/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import "../modal.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setOrganizations, setMakeBlur } from "../../store";
import { BASE_URL } from "../../config";

const AddOrgModal = ({ openAddModal, setOpenAddModal }) => {
    const [orgname, setOrgname] = useState("");
    const [email, setEmail] = useState("");
    const token = useSelector((state) => state.token);
    const blur = useSelector((state) => state.makeBlur);
    const userId = localStorage.getItem("user_id");

    const dispatch = useDispatch();

    const handleAddOrg = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) {
            toast.error("invalid email");
        } else if (orgname.length === 0 || orgname.length > 50) {
            toast.error("Invalid Name");
        } else {
            var formData = new FormData();
            formData.append("orgname", orgname);
            formData.append("email", email);
            formData.append("user_id", userId);

            //api
            await axios
                .post(`${BASE_URL}/api/organization`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                    },
                })
                .then((res) => {
                    //    console.log(res);

                    if (res.data.status && res.status === 200) {
                        dispatch(
                            setOrganizations({
                                organizations: res.data.data.organizations,
                            })
                        );
                        toast.success(res.data.message);
                    } else {
                        toast.error("Server is not responding");
                    }
                })
                .catch((error) => {
                    // console.log(error)
                    if (
                        error.response &&
                        error.response.status === 404 &&
                        !error.response.data.status
                    ) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("Server is not responding");
                    }
                });
            setEmail("");
            setOrgname("");
            setOpenAddModal(false);
        }
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    const cancelModal = () => {
        setEmail("");
        setOrgname("");
        setOpenAddModal(false);
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    return (
        <div
            className={`modal fade ${openAddModal ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: openAddModal ? "block" : "none" , marginTop:'5em'}}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header custom-modal-bg">
                        <h5 className="modal-title">Add Organization</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={cancelModal}
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
                                value={orgname}
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
                                value={email}
                                aria-label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="modal-footer custom-modal-bg"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button
                            type="button"
                            className="modal-save"
                            onClick={handleAddOrg}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="modal-cancel"
                            data-bs-dismiss="modal"
                            onClick={cancelModal}
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
