/* eslint-disable react/prop-types */

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsCopy, BsEye, BsEyeSlash } from "react-icons/bs";

import "../modal.scss";

function AddItemModal({ openPopup, setOpenPopup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [copiedUsername, setCopiedUsername] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

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
                                    aria-label="Default select example"
                                >
                                    <option value="1">One</option>
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
                        <div className="row mb-4">
                            <div className="col-6 position-relative">
                                <label className="form-label fw-bold label-text">
                                    Username
                                </label>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        aria-label="Name"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                    >
                                        <CopyToClipboard
                                            text={username}
                                            onCopy={handleCopyToClipboard(0)}
                                        >
                                            <BsCopy />
                                        </CopyToClipboard>
                                    </button>
                                </div>
                                {copiedUsername && (
                                    <div className="position-absolute top-0 end-0 me-2">
                                        <span style={{ color: "red" }}>
                                            Copied.
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="col-6 position-relative">
                                <label className="form-label fw-bold label-text">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className="form-control"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        aria-label="Password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                    >
                                        <CopyToClipboard
                                            text={password}
                                            onCopy={handleCopyToClipboard(1)}
                                        >
                                            <BsCopy />
                                        </CopyToClipboard>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={handleTogglePassword}
                                    >
                                        {showPassword ? (
                                            <BsEye />
                                        ) : (
                                            <BsEyeSlash />
                                        )}
                                    </button>
                                </div>
                                {copiedPassword && (
                                    <div className="position-absolute top-0 end-0 me-2">
                                        <span style={{ color: "red" }}>
                                            Copied.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label fw-bold label-text">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="https://google.com"
                                    aria-label="URL"
                                />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-12">
                                <label className="form-label fw-bold label-text">
                                    Notes
                                </label>
                                <textarea
                                    className="form-control" style={{resize:'none'}}
                                    rows="4"
                                    aria-label="With textarea"
                                ></textarea>
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
                        {/* Add additional modal action buttons if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddItemModal;
