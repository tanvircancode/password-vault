/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "../modal.scss";

import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { setReloadPage, setMakeBlur, setFetchSingleItem } from "../../store";
import EditLoginModal from "./EditLoginModal";
import EditCardModal from "./EditcardModal";
import EditIdentityModal from "./EditIdentityModal";

function EditItemModal({ openEditItemPopup, setOpenEditItemPopup }) {
    const userId = localStorage.getItem("user_id");

    const token = useSelector((state) => state.token);
    
    const folders = useSelector((state) => state.folders);
    const organizations = useSelector((state) => state.organizations);
    const userData = useSelector((state) => state.user);
    const fetchSingleItem = useSelector((state) => state.fetchSingleItem);

    const dispatch = useDispatch();

    const handleInputChange = (e, propertyName) => {
        const value = e.target.value;
        const type = null;
        dispatch(setFetchSingleItem({propertyName, value, type}));
      };

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
        dispatch(setFetchSingleItem(null))
        dispatch(setMakeBlur({ makeBlur: false }));
        setOpenEditItemPopup(false);
    };

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const itemId = fetchSingleItem.id;
        console.log(fetchSingleItem);

        var formData = new FormData();
        formData.append("user_id", fetchSingleItem.user_id);
        formData.append("type", fetchSingleItem.type);
        formData.append("name", fetchSingleItem.name);
        formData.append("folder_id", fetchSingleItem.folder_id);
        formData.append("notes", fetchSingleItem.notes);
        formData.append("organization_id", fetchSingleItem.organization_id);
        formData.append("favorite", fetchSingleItem.favorite ? 1 : 0);

        if (stateValues.selectItemType === 1) {
            formData.append("username", fetchSingleItem.login.username);
            formData.append("password", fetchSingleItem.login.password);
            formData.append("url", fetchSingleItem.login.url);
        } else if (stateValues.selectItemType === 2) {
            formData.append("cardholder_name", fetchSingleItem.card.cardholder_name);
            formData.append("brand", fetchSingleItem.card.brand);
            formData.append("number", fetchSingleItem.card.number);
            formData.append("exp_month", fetchSingleItem.card.exp_month);
            formData.append("exp_year", fetchSingleItem.card.exp_year);
            formData.append("security_code", fetchSingleItem.card.security_code);
        } else if (stateValues.selectItemType === 3) {
            formData.append("title", fetchSingleItem.identity.title);
            formData.append("email", fetchSingleItem.identity.email);
            formData.append("first_name", fetchSingleItem.identity.first_name);
            formData.append("middle_name", fetchSingleItem.identity.middle_name);
            formData.append("last_name",fetchSingleItem.identity.last_name);
            formData.append("phone", fetchSingleItem.identity.phone);
            formData.append("security", fetchSingleItem.identity.security);
            formData.append("license", fetchSingleItem.identity.license);
            formData.append("address", fetchSingleItem.identity.address);
        }
        await axios
            .put(`${BASE_URL}/api/item/${itemId}`  , formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                console.log(formData);

                if (res.data.status) {
                    toast.success("Item Added Successful");
                } else {
                    toast.error("Server is not responding");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Server is not responding");
                }
            });

        setStateValues({ ...fieldValues });
        setOpenPopup(false);
        dispatch(setMakeBlur({ makeBlur: false }));
        dispatch(setReloadPage({ reloadPage: true }));
    };

    return (
        <div
            className={`modal fade ${openEditItemPopup ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: openEditItemPopup ? "block" : "none" }}
            aria-hidden={!openEditItemPopup}
        >
            <div className="modal-dialog modal-dialog-scrollable custom-width">
                <div className={`modal-content `}>
                    <div className="modal-header custom-modal-bg">
                        <h5 className="modal-title">Edit Item</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={closePopup}
                        ></button>
                    </div>
                    <div className="modal-body">
                        
                        <div className="row ">
                            <div className="col-sm-12 col-md-6 mb-2">
                                <label className="form-label fw-bold label-text">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={fetchSingleItem.name ?? ""}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                />
                            </div>
                            <div className="col-sm-12 col-md-6 mb-2">
                                <label className="form-label fw-bold label-text">
                                    Folder
                                </label>
                                <select
                                    className="form-select"
                                    value={fetchSingleItem.folder_id ?? ""}
                                    onChange={(e) => handleInputChange(e, 'folder_id')}
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

                        {fetchSingleItem.type === 1 && <EditLoginModal />}

                        {fetchSingleItem.type === 2 && <EditCardModal />}

                        {fetchSingleItem.type === 3 && <EditIdentityModal />}

                        <div className="row mb-4">
                            <div className="col-12">
                                <label className="form-label fw-bold label-text">
                                    Notes
                                </label>
                                <textarea
                                    className="form-control"
                                    style={{ resize: "none" }}
                                    rows="4"
                                    value={fetchSingleItem.notes ?? ""}
                                    onChange={(e) => handleInputChange(e, 'notes')}
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
                                    value={
                                        fetchSingleItem.organization_id ?? ""
                                    }
                                    onChange={(e) => handleInputChange(e, 'organization_id')}
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
                                        checked={fetchSingleItem.favorite}
                                        id="flexCheckDefault"
                                        onChange={(e) => handleInputChange(e, 'favorite')}
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
                            onClick={handleUpdateItem}
                        >
                            Update
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

export default EditItemModal;
