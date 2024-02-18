/* eslint-disable react/prop-types */

import { useState } from "react";
import { setMakeBlur, setPopup, setSelectedItems } from "../../store";
import "../modal.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../config";

const MoveOrgModal = ({ itemsData, setItemsData }) => {
    const organizations = useSelector((state) => state.organizations);
    const token = useSelector((state) => state.token);
    const popup = useSelector((state) => state.popup);
    const selectedItems = useSelector((state) => state.selectedItems);
    console.log(organizations);

    const [selectedOrgId, setSelectedOrgId] = useState(null);

    const dispatch = useDispatch();

    const handleOrgChange = (e) => {
        setSelectedOrgId(e.target.value);
    };

    const closePopup = () => {
        dispatch(setPopup(null));
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    const handleMoveButton = async () => {
        await axios
            .put(
                `${BASE_URL}/api/moveToOrg/${selectedOrgId}`,
                { selectedItems },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                console.log(itemsData);
                if (res.data?.status) {
                    toast.success(res.data.message);
                    var updatedItems = itemsData.map((item) => {
                        var matchedObject = res.data.data.find(
                            (resultItem) => resultItem.id === item.id
                        );
                        if (matchedObject) {
                            return { ...item, ...matchedObject };
                        } else {
                            return item;
                        }
                    });

                    // console.log(updatedItems);
                    setItemsData(updatedItems);
                    dispatch(setSelectedItems(null));
                    dispatch(setPopup(null));
                    dispatch(setMakeBlur({ makeBlur: false }));
                    // console.log(itemsData);

                } else {
                    toast.error("Server is not responding");
                }
            })
            .catch((error) => {
                toast.error("Server is not responding");
            });
    };

    return (
        <div
            className={`modal fade ${popup === "moveToOrg" ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: popup === "moveToOrg" ? "block" : "none" }}
            aria-hidden={popup === null}
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
                    <div
                        className="modal-body pt-4 pb-4 custom-modal-body"
                        style={{ textAlign: "left" }}
                    >
                        <h5>Organizations</h5>
                        <select
                            className="form-select"
                            style={{ width: "26%" }}
                            value={selectedOrgId || ""}
                            onChange={handleOrgChange}
                        >
                            <option value="">--Select--</option>
                            {organizations.map((folder) => (
                                <option key={folder.id} value={folder.id}>
                                    {folder.orgname.split(" ")[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div
                        className="modal-footer custom-modal-bg"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button
                            type="button"
                            onClick={handleMoveButton}
                            className="btn btn-primary modal-save"
                        >
                            Move
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger modal-cancel"
                            data-bs-dismiss="modal"
                            onClick={closePopup}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoveOrgModal;
