import { BsPlusCircle, BsFolder } from "react-icons/bs";
import { useEffect, useState } from "react";
import AddFolderModal from "../../../Modal/FolderModals/AddFolderModal";

import { useDispatch, useSelector } from "react-redux";
import MoonLoader from "react-spinners/HashLoader";
import { setSelectMenu, setMakeBlur } from "../../../store";
import "../home.scss";

const FoldersBar = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const folders = useSelector((state) => state.folders);
    const selectMenu = useSelector((state) => state.selectMenu);
    const blur = useSelector((state) => state.makeBlur);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    console.log(folders);

    const handleFolderModal = () => {
        setOpenAddModal(true);
        dispatch(setMakeBlur({ makeBlur: true }));
    };

    // useEffect(() => {
    //     if (folders.length > 0) {
    //         setLoading(false);
    //     }
    // }, [folders]);

    return (
        <div className="accordion">
            <div className="accordion-item">
                <div className={`d-flex flex-column ${blur ? "is-blur" : ""}`}>
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button custom-accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="true"
                            aria-controls="collapseThree"
                            style={{ backgroundColor: "#4bb4f69e" }}
                        >
                            Folders
                        </button>
                    </h2>
                    {/* {loading && (
                        
                    )} */}
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse show "
                        style={{ marginLeft: 20 }}
                    >
                        {folders.length > 0 ? (
                            <div
                                className="accordion-body p-0 mt-3"
                                // style={{ marginRight: 22 }}
                            >
                                <ul
                                    style={{
                                        listStyleType: "none",
                                        textAlign: "start",
                                        padding: "0px",
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
                                                selectMenu.typeValue ===
                                                folder.id
                                                    ? "active-menu"
                                                    : ""
                                            }`}
                                            style={{
                                                marginBottom: 5,
                                                // width: "136px",
                                            }}
                                        >
                                            <BsFolder
                                                style={{ marginRight: 8 }}
                                            />
                                            {folder.foldername.split(" ")[0]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div
                                style={{
                                    margin: "auto",
                                    display: "block",
                                }}
                            >
                                <MoonLoader color="#36d7b7" />
                            </div>
                        )}

                        <div
                            className="accordion-body p-0 mt-2 mb-2 add-folder-text"
                            style={{ marginRight: 70 }}
                            onClick={handleFolderModal}
                        >
                            <BsPlusCircle style={{ marginRight: 8 }} />
                            Add Folder
                        </div>
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
