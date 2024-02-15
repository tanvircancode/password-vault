

import { setMakeBlur, setPopup } from "../../store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../modal.scss";
import { useState } from "react";

const MoveFolderModal = () => {

    const folders = useSelector((state) => state.folders);
    const popup = useSelector((state) => state.popup);
    const selectedItems = useSelector((state) => state.selectedItems);
    console.log(folders)

    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const dispatch = useDispatch();

    const handleMoveButton = () => {

        const requestData = {
            items: selectedItems,
            folder_id: selectedFolderId
        };

        // Make API request to Laravel backend
        axios.post('your-backend-api-url', requestData)
            .then(response => {
                // Handle successful response from backend
                console.log(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }

    // Handle change when a different folder is selected
    const handleFolderChange = (e) => {
        setSelectedFolderId(e.target.value);
    };

    const closePopup = () => {
        dispatch(setPopup(null));
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    return ( 
        <div
            className={`modal fade ${popup === "moveToFolder" ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: popup === "moveToFolder" ? "block" : "none" }}
            aria-hidden={popup===null}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header custom-modal-bg">
                        <h5 className="modal-title">Move To Folder</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={closePopup}
                        ></button>
                    </div>
                    <div className="modal-body pt-4 pb-4 custom-modal-body" style={{ textAlign: "left" }}>
                        <h5>Folders</h5>
                        
                    
                            <select
                                    className="form-select"
                                    style={{width:'26%'}}
                                    value={selectedFolderId}  
                                    onChange={handleFolderChange}
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
                    <div
                        className="modal-footer custom-modal-bg"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <button type="button" className="btn btn-primary modal-save"
                        onClick={handleMoveButton}
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

export default MoveFolderModal;
