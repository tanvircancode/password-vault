import { BsPlusCircle, BsFolder } from "react-icons/bs";
import { useEffect, useState } from "react";
import AddFolderModal from "../../../Modal/FolderModals/AddFolderModal";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFolders, setOrganizations, setSelectMenu } from "../../../store";
import "../home.scss";

const FoldersBar = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const folders = useSelector((state) => state.folders);
    const selectMenu = useSelector((state) => state.selectMenu);

    const dispatch = useDispatch();

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
                            style={{ marginRight: 22 }}
                        >
                            <ul
                                style={{
                                    listStyleType: "none",
                                    textAlign: "start",
                                    marginRight: "46px",
                                }}
                            >
                                {folders.map((folder) => (
                                    <li
                                        key={folder.id}
                                        onClick={() =>
                                            dispatch(
                                                setSelectMenu({
                                                    menuType: "folder",
                                                    typeValue: folder.id,
                                                })
                                            )
                                        }
                                        className={`${
                                            selectMenu.typeValue === folder.id
                                                ? "active-menu"
                                                : ""
                                        }`}
                                        style={{
                                            marginBottom: 5,
                                            width: "128px",
                                        }}
                                    >
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
