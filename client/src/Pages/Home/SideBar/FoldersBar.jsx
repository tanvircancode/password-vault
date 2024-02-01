import { BsPlusCircle, BsFolder } from "react-icons/bs";
import { useEffect, useState } from "react";
import AddFolderModal from "../../../Modal/FolderModals/AddFolderModal";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFolders, setOrganizations } from "../../../store";
import "../home.scss";

const FoldersBar = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.token);
    const folders = useSelector((state) => state.folders);

    // const dispatch = useDispatch();

    // const getFolders = async () => {
    //     await axios
    //         .get(`${BASE_URL}/api/user/` + userId, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             // console.log(res);
    //             if (res.data.status && res.status === 200) {
    //                 dispatch(setFolders({ folders: res.data.data.folders }));
    //                 dispatch(
    //                     setOrganizations({
    //                         organizations: res.data.data.organizations,
    //                     })
    //                 );
    //             }
    //         })
    //         .catch((error) => {
    //             if (
    //                 error.response &&
    //                 error.response.status === 404 &&
    //                 !error.response.data.status
    //             ) {
    //                 toast.error(error.response.data.message);
    //             } else {
    //                 toast.error("Server is not responding");
    //             }
    //         });
    // };

    // useEffect(() => {
    //     getFolders();
    // }, []);

    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button custom-accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                    >
                        Folders
                    </button>
                </h2>
                <div
                    id="collapseThree"
                    className="accordion-collapse collapse show "
                    
                >
                    {folders.length > 0 && (      
                        <div
                            className="accordion-body p-0 mt-3 custom-accordion-body"
                            style={{ marginRight:22 }}
                        >
                            <ul style={{ listStyleType: "none",textAlign:'start', marginRight:'67px'}}>
                                {folders.map((folder) => (
                                    <li key={folder.id} style={{ marginBottom: 5 , width:'112px' }}>
                                        <BsFolder style={{ marginRight: 8 }} />
                                        {folder.foldername.split(" ")[0]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div
                        className="accordion-body p-0 mt-2 mb-2"
                        style={{ marginRight: 70 }}
                        onClick={() => setOpenAddModal(true)}
                    >
                        <BsPlusCircle style={{ marginRight: 8 }} />
                        Add Folder
                    </div>
                </div>

                <AddFolderModal
                    openAddModal={openAddModal}
                    setOpenAddModal={setOpenAddModal}
                />
            </div>
        </div>
    );
};

export default FoldersBar;
