import { setMakeBlur, setPopup, setSelectedItems } from "../../store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../modal.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { BASE_URL } from "../../config";

import { ToastContainer } from 'react-toastify';


const DeleteItemModal = ({ itemsData, setItemsData }) => {
    
    const token = useSelector((state) => state.token);
    const popup = useSelector((state) => state.popup);
    const selectedItems = useSelector((state) => state.selectedItems);
    // console.log(folders);

    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const dispatch = useDispatch();

    const handleDeleteButton = async () => {
        await axios
            .put(
                `${BASE_URL}/api/moveToFolder/${selectedFolderId}`,
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
    };

    const closePopup = () => {
        dispatch(setPopup(null));
        dispatch(setMakeBlur({ makeBlur: false }));
    };

    //new
    
    const [isDeleting, setIsDeleting] = useState(false); // Track deletion state

  const handleDelete = () => {
    setIsDeleting(true); // Show "Deleting..." toast

    // Perform actual deletion here (replace with your logic)
    // Example: Send a DELETE request to your API

    setTimeout(() => {
      // Simulate successful deletion after 2 seconds
      setIsDeleting(false);
      toast.success('Item deleted successfully!');
    }, 2000);
  };

  const handleCancel = () => {
    setIsDeleting(false); // Hide any ongoing operations
  };

    return (
        // <div
        //     className={`modal fade ${popup === "deleteItems" ? "show" : ""}`}
        //     tabIndex="-1"
        //     role="dialog"
        //     style={{ display: popup === "deleteItems" ? "block" : "none" }}
        //     aria-hidden={popup === null}
        // >
        //     <div className="modal-dialog">
        //         <div className="modal-content">
        //             <div className="modal-header ">
                              
        //                 <button
        //                     type="button"
        //                     className="btn-close"
        //                     data-bs-dismiss="modal"
        //                     aria-label="Close"
        //                     onClick={closePopup}
        //                 ></button>
        //             </div>
        //             <div
        //                 className="modal-body pt-4 pb-4 custom-modal-body"
        //                 style={{ textAlign: "left" }}
        //             >
        //                 <h5>Are you sure?</h5>
        //                 <button
        //                     type="button"
        //                     className="btn btn-primary modal-yes"
                          
        //                     onClick={handleDeleteButton}
        //                 >
        //                     Yes
        //                 </button>
        //                 <button
        //                     type="button"
        //                     className="btn btn-danger modal-no"
                           
        //                     data-bs-dismiss="modal"
        //                     onClick={closePopup}
        //                 >
        //                     No
        //                 </button>
     
        //                 {/* <select
        //                     className="form-select"
        //                     style={{ width: "26%" }}
        //                     value={selectedFolderId || ""}
        //                     onChange={handleFolderChange}
        //                 >
        //                     <option value={null}>--Select--</option>
        //                     {folders.map((folder) => (
        //                         <option key={folder.id} value={folder.id}>
        //                             {folder.foldername.split(" ")[0]}
        //                         </option>
        //                     ))}
        //                 </select> */}
        //             </div>
        //             {/* <div
        //                 className="modal-footer custom-modal-bg"
        //                 style={{ justifyContent: "flex-start" }}
        //             >
        //                 <button
        //                     type="button"
        //                     className="btn btn-primary modal-save"
        //                     onClick={handleDeleteButton}
        //                 >
        //                     Yes
        //                 </button>
        //                 <button
        //                     type="button"
        //                     className="btn btn-danger modal-cancel"
        //                     data-bs-dismiss="modal"
        //                     onClick={closePopup}
        //                 >
        //                     No
        //                 </button>
        //             </div> */}
        //         </div>
        //     </div>
        // </div>
        <div style={{ display: popup === "deleteItems" ? "block" : "none" }}>
      <button onClick={handleDelete}>Delete</button>
      {isDeleting && (
        <ToastContainer
          position="top-right"
          autoClose={false}
          closeOnClick={false}
          newestOnTop={false}
          rtl={false}
          pauseOnHover={false}
          draggable={false}
          progress={undefined}
          theme="colored"
        >
          <toast.Toast
            body="Deleting..."
            closeButton={
              <button onClick={handleCancel}>Cancel</button>
            }
          />
        </ToastContainer>
      )}
    </div>
    );
};

export default DeleteItemModal;
