import {
    BsThreeDotsVertical,
    BsUpload,
    BsArrow90DegUp,
    BsTrash3,
} from "react-icons/bs";
import "./item.scss";
import { useEffect, useState } from "react";
import AddItemModal from "../../../Modal/ItemModals/AddItemModal";
import MoveFolderModal from "../../../Modal/FolderModals/MoveFolderModal";
import MoveOrgModal from "../../../Modal/OrgModals/MoveOrgModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";

const ItemList = () => {
    const [openNewItemModal, setOpenNewItemModal] = useState(false);

    const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);
    const [openMoveOrgModal, setOpenMoveOrgModal] = useState(false);
    const selectMenu = useSelector((state) => state.selectMenu);

    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.token);

    const [itemsData, setItemsData] = useState("");

    const dispatch = useDispatch();

    const getItemsData = async () => {
        await axios
            .get(`${BASE_URL}/api/items/` + userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.status && res.status === 200) {
                    setItemsData(res.data.data.items);
                }
            })
            .catch((error) => {
                console.log(error);

                // if (
                //     error.response &&
                //     error.response.status === 404 &&
                //     !error.response.data.status
                // ) {
                //     toast.error(error.response.data.message);
                // } else {
                //     toast.error("Server is not responding");
                // }
            });
    };

    const handleNewItemClick = () => {
        setOpenNewItemModal(true);
    };

    useEffect(() => {
        getItemsData();
    }, []);

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col text-start" style={{ fontSize: 25 }}>
                    {selectMenu.menuType === "orgs" && <h2>All Items</h2>}
                    {selectMenu.menuType === "me" && <h2>My Items</h2>}
                    {selectMenu.menuType === "org" && (
                        <h2>Organization Items</h2>
                    )}
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
                <div className="col-2 text-start d-flex">
                    <input
                        className="form-check-input small-checkbox"
                        type="checkbox"
                        id="select-all"
                        // onChange={handleSelectAll}
                    />
                     <label className="form-check-label" style={{marginTop:'2px'}} htmlFor="select-all">All</label>
                </div>
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
                            {selectMenu.menuType === "trash" ? (
                                <li
                                    className="dropdown-item dropdown-list"
                                    onClick={() => setOpenMoveFolderModal(true)}
                                >
                                    <BsTrash3 style={{ marginRight: 5 }} />
                                    <span>Permanentlt Delete Selected</span>
                                </li>
                            ) : (
                                <div>
                                    <li
                                        className="dropdown-item dropdown-list"
                                        onClick={() =>
                                            setOpenMoveFolderModal(true)
                                        }
                                    >
                                        <BsUpload style={{ marginRight: 5 }} />
                                        <span> Move Selected</span>
                                    </li>
                                    <li
                                        className="dropdown-list dropdown-item"
                                        onClick={() =>
                                            setOpenMoveOrgModal(true)
                                        }
                                    >
                                        <BsArrow90DegUp
                                            style={{ marginRight: 5 }}
                                        />
                                        <span>Move Selected To Org..</span>
                                    </li>
                                    <li
                                        className="dropdown-list dropdown-item"
                                        style={{ color: "red" }}
                                    >
                                        <BsTrash3 style={{ marginRight: 5 }} />
                                        <span>Delete Selected</span>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <div className="d-flex flex-row text-left">
                        <div className="col-2 text-start">Item 1</div>
                        <div className="col-5 text-start">Item 2</div>
                        <div className="col-3 text-start">Item 3</div>
                        <div className="col-2 text-start">Item 4</div>
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
            <MoveOrgModal
                openPopup={openMoveOrgModal}
                setOpenPopup={setOpenMoveOrgModal}
            />
        </div>
    );
};

export default ItemList;
