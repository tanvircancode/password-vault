/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsCopy, BsEye, BsEyeSlash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import "../modal.scss";
import { Types } from "../../constants/variables";
import AddLoginModal from "./AddLoginModal";
import AddCardModal from "./AddCardModal";

function AddItemModal({ openPopup, setOpenPopup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [copiedUsername, setCopiedUsername] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const userId = useSelector((state) => state.user.id);
    const types = Types;
    // console.log(userId);

    const fieldValues = {
        selectItemType: 1,
        orgId: "",
        itemName: "",
        folderId: "",
        userName: "",
        password: "",
        loginUrl: [],
        note: "",
        favorite: "",
        cardHolderName: "",
        brand: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        securityCode: "",
        title: "",
        identityEmail: "",
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        security: "",
        license: "",
        address: "",
    };

    const [stateValues, setStateValues] = useState({ ...fieldValues });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCopyToClipboard = (val) => {
        return () => {
            if (val === 0) {
                setCopiedUsername(true);

                setTimeout(() => {
                    setCopiedUsername(false);
                }, 2000);
            } else {
                setCopiedPassword(true);

                setTimeout(() => {
                    setCopiedPassword(false);
                }, 2000);
            }
        };
    };

    return (
        <div
            className={`modal fade ${openPopup ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: openPopup ? "block" : "none" }}
            aria-hidden={!openPopup}
        >
            <div className="modal-dialog modal-dialog-scrollable custom-width">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Item</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setOpenPopup(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Add your modal content here */}
                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label fw-bold label-text">
                                    What type of item is this?
                                </label>
                                <select
                                    className="form-select"
                                    value={stateValues.selectItemType}
                                    onChange={(e) =>
                                        setStateValues({
                                            ...stateValues,
                                            selectItemType: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                >
                                    {types.map((type, index) => (
                                        <option key={index} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label fw-bold label-text">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    aria-label="Username"
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold label-text">
                                    Folder
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="1">--Select--</option>
                                </select>
                            </div>
                        </div>

                        {stateValues.selectItemType === 1 && (
                            <AddLoginModal
                                stateValues={stateValues}
                                setStateValues={setStateValues}
                            />
                        )}

                        {stateValues.selectItemType === 2 && (
                            <AddCardModal
                                stateValues={stateValues}
                                setStateValues={setStateValues}
                            />
                        )}

                        <div className="row mb-4">
                            <div className="col-12">
                                <label className="form-label fw-bold label-text">
                                    Notes
                                </label>
                                <textarea
                                    className="form-control"
                                    style={{ resize: "none" }}
                                    rows="4"
                                    aria-label="With textarea"
                                ></textarea>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-12 col-md-8 col-lg-6">
                                <label className="form-label fw-bold label-text">
                                    Who owns this item?
                                </label>
                                <select
                                    className="form-select"
                                    value={stateValues.selectItemType}
                                    onChange={(e) =>
                                        setStateValues({
                                            ...stateValues,
                                            selectItemType: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                >
                                    {types.map((type, index) => (
                                        <option key={index} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />
                                    <label
                                        className="form-check-label pl-2"  style={{textAlign:'left', paddingTop: 3,marginLeft:5}}
                                        htmlFor="flexCheckDefault"
                                    >
                                       Favorite
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal-footer"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button type="button" className="btn btn-success">
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setOpenPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddItemModal;
