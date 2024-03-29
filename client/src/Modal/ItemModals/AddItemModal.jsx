/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsCopy, BsEye, BsEyeSlash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import "../modal.scss";
import { Types } from "../../constants/variables";
import AddLoginModal from "./AddLoginModal";
import AddCardModal from "./AddCardModal";
import AddIdentityModal from "./AddIdentityModal";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { setReloadPage, setMakeBlur } from "../../store";

function AddItemModal({ openPopup, setOpenPopup }) {
    const userId = localStorage.getItem("user_id");
    const types = Types;
    const token = useSelector((state) => state.token);
    const blur = useSelector((state) => state.makeBlur);
    const folders = useSelector((state) => state.folders);
    const organizations = useSelector((state) => state.organizations);
    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const fieldValues = {
        selectItemType: 1,
        orgId: "",
        itemName: "",
        folderId: "",
        userName: "",
        password: "",
        loginUrl: "",
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

    const closePopup = () => {
        setOpenPopup(false);
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("user_id", userId);
        formData.append("type", stateValues.selectItemType);
        formData.append("name", stateValues.itemName);
        formData.append("folder_id", stateValues.folderId);
        formData.append("notes", stateValues.note);
        formData.append("organization_id", stateValues.orgId);
        formData.append("favorite", stateValues.favorite ? 1 : 0);

        if (stateValues.selectItemType === 1) {
            formData.append("username", stateValues.userName);
            formData.append("password", stateValues.password);
            formData.append("url", stateValues.loginUrl);
        } else if (stateValues.selectItemType === 2) {
            formData.append("cardholder_name", stateValues.cardHolderName);
            formData.append("brand", stateValues.brand);
            formData.append("number", stateValues.cardNumber);
            formData.append("exp_month", stateValues.expMonth);
            formData.append("exp_year", stateValues.expYear);
            formData.append("security_code", stateValues.securityCode);
        } else if (stateValues.selectItemType === 3) {
            formData.append("title", stateValues.title);
            formData.append("email", stateValues.email ?? "");
            formData.append("first_name", stateValues.firstName);
            formData.append("middle_name", stateValues.middleName);
            formData.append("last_name", stateValues.lastName);
            formData.append("phone", stateValues.phone);
            formData.append("security", stateValues.security);
            formData.append("license", stateValues.license);
            formData.append("address", stateValues.address);
        }
        await axios
            .post(`${BASE_URL}/api/item`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.status) {
                    toast.success("Item Added Successful");
                } else {
                    toast.error("Server is not responding");
                }
                setStateValues({ ...fieldValues });
                setOpenPopup(false);
                dispatch(setMakeBlur({ makeBlur: false }));
                dispatch(setReloadPage({ reloadPage: true }));
            })
            .catch((error) => {
                // console.log(error);

                if (
                    error.response &&
                    error.response?.status &&
                    error.response.data?.message
                ) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Server is not responding");
                }
            });
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
                <div className={`modal-content `}>
                    <div className="modal-header custom-modal-bg">
                        <h5 className="modal-title">Add New Item</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={closePopup}
                        ></button>
                    </div>
                    <div className="modal-body custom-modal-body">
                        <div className="row mb-2">
                            <div className="col-md-12 col-lg-6">
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
                        <div className="row ">
                            <div className="col-sm-12 col-md-6 mb-2">
                                <label className="form-label fw-bold label-text">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={stateValues.itemName}
                                    onChange={(e) =>
                                        setStateValues({
                                            ...stateValues,
                                            itemName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-sm-12 col-md-6 mb-2">
                                <label className="form-label fw-bold label-text">
                                    Folder
                                </label>
                                <select
                                    className="form-select"
                                    value={stateValues.folderId}
                                    onChange={(e) =>
                                        setStateValues({
                                            ...stateValues,
                                            folderId: e.target.value,
                                        })
                                    }
                                >
                                    <option value={null}>--Select--</option>
                                    {folders.map((folder) => (
                                        <option
                                            key={folder.id}
                                            value={folder.id}
                                        >
                                            {folder.foldername.split(" ")[0]}
                                        </option>
                                    ))}
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

                        {stateValues.selectItemType === 3 && (
                            <AddIdentityModal
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
                                    value={stateValues.note}
                                    onChange={(e) =>
                                        setStateValues({
                                            ...stateValues,
                                            note: e.target.value,
                                        })
                                    }
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
                                    value={stateValues.orgId}
                                    onChange={(e) =>
                                        setStateValues({
                                            ...stateValues,
                                            orgId: e.target.value,
                                        })
                                    }
                                >
                                    {token && (
                                        <option value="">
                                            {userData.name}
                                        </option>
                                    )}
                                    {organizations.map((organization) => (
                                        <option
                                            key={organization.id}
                                            value={organization.id}
                                        >
                                            {organization.orgname.split(" ")[0]}
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
                                        checked={stateValues.favorite}
                                        id="flexCheckDefault"
                                        onChange={(e) =>
                                            setStateValues({
                                                ...stateValues,
                                                favorite: e.target.checked
                                                    ? 1
                                                    : 0,
                                            })
                                        }
                                    />

                                    <label
                                        className="form-check-label pl-2"
                                        style={{
                                            textAlign: "left",
                                            paddingTop: 3,
                                            marginLeft: 5,
                                        }}
                                        htmlFor="flexCheckDefault"
                                    >
                                        Favorite
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal-footer custom-modal-bg"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button
                            type="button"
                            className="modal-save"
                            onClick={handleAddItem}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="modal-cancel"
                            onClick={closePopup}
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
