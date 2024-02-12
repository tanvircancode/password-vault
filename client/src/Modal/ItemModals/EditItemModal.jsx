/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "../modal.scss";
import { Types } from "../../constants/variables";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { setReloadPage, setMakeBlur } from "../../store";
import EditLoginModal from "./EditLoginModal";
import EditCardModal from "./EditcardModal";
import EditIdentityModal from "./EditIdentityModal";

function EditItemModal({
    openEditItemPopup,
    setOpenEditItemPopup,
    fetchSingleItem,
    setFetchSingleItem,
}) {
    // console.log(fetchSingleItem);

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

    useEffect(() => {
        // console.log(blur);
    }, [blur]);

    const closePopup = () => {
        setOpenPopup(false);
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    const handleEditItem = async (e) => {
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
            formData.append("email", stateValues.brand);
            formData.append("first_name", stateValues.cardNumber);
            formData.append("middle_name", stateValues.expMonth);
            formData.append("last_name", stateValues.expYear);
            formData.append("phone", stateValues.securityCode);
            formData.append("security", stateValues.expMonth);
            formData.append("license", stateValues.expYear);
            formData.append("address", stateValues.securityCode);
        }
        await axios
            .post(`${BASE_URL}/api/item`, formData, {
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
                        <div className="row mb-2">
                            <div className="col-md-12 col-lg-6">
                                <label className="form-label fw-bold label-text">
                                    What type of item is this?
                                </label>
                                <select
                                    className="form-select"
                                    value={fetchSingleItem.type ?? ''}
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
                                    value={fetchSingleItem.name}
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
                                    value={fetchSingleItem.folder_id ?? ''}
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

                        {fetchSingleItem.type === 1 && (
                            <EditLoginModal 
                            fetchSingleItem={fetchSingleItem}
                            setFetchSingleItem={setFetchSingleItem}
                            />
                        ) }

                        {fetchSingleItem.type === 2 && (
                            <EditCardModal
                            fetchSingleItem={fetchSingleItem}
                            setFetchSingleItem={setFetchSingleItem}
                            />
                        )}

                        {fetchSingleItem.type === 3 && (
                            <EditIdentityModal
                            fetchSingleItem={fetchSingleItem}
                            setFetchSingleItem={setFetchSingleItem}
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
                                    value={fetchSingleItem.notes ?? ''}
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
                                    value={fetchSingleItem.organization_id ?? ""}
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
                                        checked={fetchSingleItem.favorite}
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
                            onClick={handleEditItem}
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

export default EditItemModal;
