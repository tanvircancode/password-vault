import {
    BsThreeDotsVertical,
    BsUpload,
    BsArrow90DegUp,
    BsTrash3,
} from "react-icons/bs";
import "./item.scss";
import { useState } from "react";
import AddItemModal from "../../../Modal/ItemModals/AddItemModal";
import MoveFolderModal from "../../../Modal/FolderModals/MoveFolderModal";

const ItemList = () => {
    const [openNewItemModal, setOpenNewItemModal] = useState(false);

    const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);

    const handleNewItemClick = () => {
        setOpenNewItemModal(true);
    };

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col text-start" style={{ fontSize: 25 }}>
                    All Items
                </div>
                <div className="col text-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNewItemClick}
                    >
                        New Item
                    </button>
                </div>
            </div>

            <div className="row mt-4 p-2 all-items">
                <div className="col-2 text-start">All</div>
                <div className="col-5 text-start">Name</div>
                <div className="col-3 text-start">Owner</div>
                <div className="col-2 text-start">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary bg-transparent"
                            style={{ border: "none" }}
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <BsThreeDotsVertical />
                        </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-list dropdown-item" onClick={() => setOpenMoveFolderModal(true)}>
                                {/* <a className="dropdown-item" href="#"> */}
                                    <BsUpload style={{ marginRight: 5 }} />
                                    <span> Move Selected</span>
                                {/* </a> */}
                            </li>
                            <li className="dropdown-list">
                                <a className="dropdown-item" href="#">
                                    <BsArrow90DegUp
                                        style={{ marginRight: 5 }}
                                    />
                                    <span>Move Selected To Org..</span>
                                </a>
                            </li>
                            <li className="dropdown-list">
                                <a
                                    className="dropdown-item"
                                    style={{ color: "red" }}
                                    href="#"
                                >
                                    <BsTrash3 style={{ marginRight: 5 }} />
                                    <span>Delete Selected</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <AddItemModal
                openPopup={openNewItemModal}
                setOpenPopup={setOpenNewItemModal}
            />
            <MoveFolderModal 
                openPopup={openMoveFolderModal}
                setOpenPopup={setOpenMoveFolderModal}
            />
        </div>
    );
};

export default ItemList;
