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
import { setReloadPage } from "../../../store";

const ItemList = () => {
    const [openNewItemModal, setOpenNewItemModal] = useState(false);

    const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);
    const [openMoveOrgModal, setOpenMoveOrgModal] = useState(false);
    const selectMenu = useSelector((state) => state.selectMenu);

    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.token);
    const reloadPage = useSelector((state) => state.reloadPage);

    const [itemsData, setItemsData] = useState("");
    const [selectedItems, setSelectedItems] = useState("");
    const [checkAll, setCheckAll] = useState(false);

    const dispatch = useDispatch();

    const getItemsData = async () => {
        await axios
            .get(`${BASE_URL}/api/items/` + userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
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
        dispatch(setReloadPage({ reloadPage: false }));
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allItemIds = itemsData.map((item) => item.id);
            setCheckAll(true);
            setSelectedItems(allItemIds);
        } else {
            setSelectedItems([]);
        }
    };

    const handleCheckboxChange = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const filteredItems = () => {
        if (itemsData.length > 0) {
            if (
                selectMenu.menuType === "orgs" ||
                selectMenu.menuType === "items"
            ) {
                return itemsData.filter((item) => !item.deleted_at);
            } else if (selectMenu.menuType === "me") {
                return itemsData.filter(
                    (item) => !item.deleted_at && !item.organization
                );
            } else if (selectMenu.menuType === "org") {
                return itemsData.filter(
                    (item) =>
                        !item.deleted_at &&
                        item.organization_id === selectMenu.typeValue
                );
            } else if (selectMenu.menuType === "favorite") {
                return itemsData.filter(
                    (item) => !item.deleted_at && item.favorite
                );
            } else if (selectMenu.menuType === "type") {
                return itemsData.filter(
                    (item) =>
                        !item.deleted_at && item.type === selectMenu.typeValue
                );
            } else if (selectMenu.menuType === "folder") {
                return itemsData.filter(
                    (item) =>
                        !item.deleted_at &&
                        item.folder_id === selectMenu.typeValue
                );
            } else if (selectMenu.menuType === "trash") {
                return itemsData.filter((item) => item.deleted_at);
            }
        }
    };

    const handleNewItemClick = () => {
        setOpenNewItemModal(true);
    };

    useEffect(() => {
        getItemsData();
    }, [reloadPage]);

    useEffect(() => {
        console.log(itemsData);
        console.log(filteredItems());
    }, [itemsData]);

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col text-start" style={{ fontSize: 25 }}>
                    {selectMenu.menuType === "orgs" && <h2>All Items</h2>}
                    {selectMenu.menuType === "me" && <h2>My Items</h2>}
                    {selectMenu.menuType === "org" && (
                        <h2>Organization Items</h2>
                    )}
                    {selectMenu.menuType === "items" && <h2>All Items</h2>}
                    {selectMenu.menuType === "type" && <h2>Category Items</h2>}
                    {selectMenu.menuType === "folder" && <h2>Folder Items</h2>}
                    {selectMenu.menuType === "favorite" && (
                        <h2>Favorite Items</h2>
                    )}

                    {selectMenu.menuType === "trash" && <h2>Trash Items</h2>}
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

            <div className="row mt-4 p-2 d-flex align-items-center all-items">
                <div className="col-2 text-start d-flex">
                    <input
                        className="form-check-input small-checkbox"
                        type="checkbox"
                        id="select-all"
                        checked={
                            checkAll &&
                            selectedItems.length === itemsData.length
                        }
                        onChange={handleSelectAll}
                    />
                    <label
                        className="form-check-label mb-0"
                        style={{ marginTop: "2px" }}
                        htmlFor="select-all"
                    >
                        All
                    </label>
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
            {itemsData.length > 0 &&
                filteredItems().map((item, index) => (
                    <div className="row mt-2" key={index}>
                        <div className="col">
                            <div className="d-flex ">
                                <div className="col-2 ">
                                    <input
                                        type="checkbox"
                                        id={`item-${item.id}`}
                                        checked={selectedItems.includes(
                                            item.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(item.id)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        style={{ marginTop: "2px" }}
                                        htmlFor={`item-${item.id}`}
                                    ></label>
                                </div>
                                <div className="col-5 text-start">
                                    <p className="m-0">{item.name}</p>
                                    <span>
                                        {item.type === 1
                                            ? "Login item"
                                            : item.type === 2
                                            ? "Card item"
                                            : item.type === 3
                                            ? "identity item"
                                            : "Secure item"}
                                    </span>
                                </div>

                                <div className="col-3 text-start">
                                    {item.organization
                                        ? item.organization.orgname || "Me"
                                        : "Me"}
                                </div>
                                <div className="col-2 text-start">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary bg-transparent"
                                            style={{ border: "none" }}
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <BsThreeDotsVertical
                                                style={{ color: "00000" }}
                                            />
                                        </button>
                                        <ul className="dropdown-menu">
                                            {selectMenu.menuType === "trash" ? (
                                                <div>
                                                    <li className="dropdown-item dropdown-list">
                                                        <BsTrash3
                                                            style={{
                                                                marginRight: 5,
                                                            }}
                                                        />
                                                        <span>
                                                            Restore Item
                                                        </span>
                                                    </li>
                                                    <li className="dropdown-item dropdown-list">
                                                        <BsTrash3
                                                            style={{
                                                                marginRight: 5,
                                                            }}
                                                        />
                                                        <span>
                                                            Permanently Delete
                                                        </span>
                                                    </li>
                                                </div>
                                            ) : (
                                                <div>
                                                    <li
                                                        className="dropdown-item dropdown-list"
                                                        onClick={() =>
                                                            setOpenMoveFolderModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <BsTrash3
                                                            style={{
                                                                marginRight: 5,
                                                            }}
                                                        />
                                                        <span> Delete </span>
                                                    </li>
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

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
