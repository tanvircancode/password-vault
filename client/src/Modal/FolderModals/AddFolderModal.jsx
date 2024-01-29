/* eslint-disable react/prop-types */

import { useState } from "react";
import "../modal.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";

import { toast } from "react-toastify";

const AddFolderModal = ({ openAddModal, setOpenAddModal }) => {

    const [folderName, setFolderName] = useState("");
    const userId = useSelector((state) => state.user.id);

    const handleAddFolder = async() => {

        if (folderName.length === 0 || folderName.length > 50) {
            toast.error("Invalid Name");
        } else {
            var formData = new FormData();
            formData.append('foldername',folderName)
            formData.append('user_id',userId)

            await axios
            .post(
                `${BASE_URL}/api/folder`,
                formData,
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
            .then((res) => {
               console.log(res)
                if(res.data.status && res.status === 200){
                    toast.success(res.data.message)
                   
                }
                else  {
                    toast.error("Server is not responding");
                }
            })
            .catch((error) => {
                console.log(error)
                if(error.response && error.response.status === 404 && !error.response.data.status) {
                    toast.error(error.response.data.message)
                }else{
                    toast.error("Server is not responding");
                }
            });
            
            setFolderName("")
            setOpenAddModal(false);
        }
    };

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
                        <h5 className="modal-title">Add Folder</h5>
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
                               Folder Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                            />
                        </div>

                       
                    </div>
                    <div
                        className="modal-footer"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddFolder}
                        >
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

export default AddFolderModal;
