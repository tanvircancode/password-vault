import { setMakeBlur, setPopup, setSelectedItems } from "../../store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../modal.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { BASE_URL } from "../../config";

const DeleteItemModal = ({ itemId,itemsData, setItemsData }) => {
    // if (itemId) {
    //     // alert(itemId)
    // }
    const token = useSelector((state) => state.token);
    const popup = useSelector((state) => state.popup);
    const selectedItems = useSelector((state) => state.selectedItems);
    // console.log(folders);

    const dispatch = useDispatch();

    const handleDeleteButton = async () => {
        if (popup === "deleteItems") {
            axios
                .post(
                    `${BASE_URL}/api/deleteitems`,
                    { selectedItems },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    // console.log(itemsData);
                    // console.log(res.data.data);

                    if (res.data?.status) {
                        toast.success(res.data?.message);
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

                        setItemsData(updatedItems);
                        dispatch(setSelectedItems(null));
                        dispatch(setPopup(null));
                        dispatch(setMakeBlur({ makeBlur: false }));
                    } else {
                        toast.error("Server is not responding");
                    }
                })
                .catch((error) => {
                    toast.error("Server is not responding");
                });
        } else if (popup === "permanentlyDeleteItems") {
            axios
                .post(
                    `${BASE_URL}/api/deleteitems`,
                    { selectedItems },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    if (res.data?.status) {
                        toast.success(res.data?.message);

                        var itemsReturned = res.data.data;
                        var deletedItemIds = itemsReturned.map(
                            (item) => item.id
                        );

                        var filteredItems = itemsData.map((item) => {
                            var isDeleted = deletedItemIds.includes(item.id);
                            return isDeleted ? null : item;
                        });
                        filteredItems = filteredItems.filter(
                            (item) => item !== null
                        );

                        setItemsData(filteredItems);
                        dispatch(setSelectedItems(null));
                        dispatch(setPopup(null));
                        dispatch(setMakeBlur({ makeBlur: false }));
                    } else {
                        toast.error("Server is not responding");
                    }
                })
                .catch((error) => {
                    toast.error("Server is not responding");
                });
        }else if(popup === "deleteSingleItem") {
            axios
                .post(
                    `${BASE_URL}/api/deleteitems`,
                    { selectedItems : [itemId]},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data?.status) {
                        toast.success("Item deleted sucessfully");

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

                        setItemsData(updatedItems);
                        dispatch(setSelectedItems(null));
                        dispatch(setPopup(null));
                        dispatch(setMakeBlur({ makeBlur: false }));
                    } else {
                        toast.error("Server is not responding");
                    }
                })
                .catch((error) => {
                    toast.error("Server is not responding");
                });
        }
    };

    const closePopup = () => {
        dispatch(setPopup(null));
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    return (
        <div
            className={`modal fade ${
                popup === "deleteItems" || popup === "permanentlyDeleteItems" || popup === "deleteSingleItem"
                    ? "show"
                    : ""
            }`}
            tabIndex="-1"
            role="dialog"
            style={{
                display:
                    popup === "deleteItems" ||
                    popup === "permanentlyDeleteItems" || popup === "deleteSingleItem"
                        ? "block"
                        : "none",
            }}
            aria-hidden={popup === null}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header custom-modal-bg">
                        {popup === "permanentlyDeleteItems" ? (
                            <h4 style={{ marginBottom: "0px" }}>
                                Confirm Permanent Deletion
                            </h4>
                        ) : (
                            <h2 style={{ marginBottom: "0px" }}>Confirm</h2>
                        )}
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
                        <h5 className="modal-title mb-2">
                            Do you want to delete?
                        </h5>
                        <button
                            type="button"
                            className="btn btn-primary modal-yes"
                            onClick={handleDeleteButton}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger modal-no"
                            data-bs-dismiss="modal"
                            onClick={closePopup}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>

        // </div>
    );
};

export default DeleteItemModal;
