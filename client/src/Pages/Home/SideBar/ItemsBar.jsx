import {
    BsBricks,
    BsStar,
    BsArrowDownLeftCircle,
    BsCardChecklist,
    BsFileEarmarkPerson,
    BsSuitcaseLg,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setDotModal, setPopup, setSelectMenu, setSelectedItems } from "../../../store";

const ItemsBar = () => {
    const selectMenu = useSelector((state) => state.selectMenu);
    const blur = useSelector((state) => state.makeBlur);

    const dispatch = useDispatch();

    const handleItemsClick = (menuType, typeValue) => {
        dispatch(
            setSelectMenu({
                menuType: menuType,
                typeValue: typeValue,
            })
        );
        dispatch(setDotModal({dotModal:false}));
        dispatch(setSelectedItems(null));
        dispatch(setPopup(null));
    };

    return (
        <div className={`accordion ${blur ? "is-blur" : ""}`}>
            <div className="accordion-item">
                <div className="d-flex flex-column">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                            style={{ backgroundColor: "#4bb4f69e" }}
                        >
                            Items
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            // style={{ marginRight: 80 }}
                            className={`accordion-body p-0 mt-3 ${
                                selectMenu.menuType === "items"
                                    ? "active-menu"
                                    : ""
                            }`}
                            onClick={() => handleItemsClick("items", "")}
                        >
                            <BsBricks style={{ marginRight: 8 }} />
                            All Items
                        </div>
                        <hr className="hr-line" />
                    </div>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 ${
                                selectMenu.menuType === "favorite"
                                    ? "active-menu"
                                    : ""
                            }`}
                            onClick={() => handleItemsClick("favorite", "")}
                        >
                            <BsStar style={{ marginRight: 8 }} />
                            Favorites
                        </div>
                        <hr className="hr-line" />
                    </div>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 ${
                                selectMenu.typeValue === 1 ? "active-menu" : ""
                            }`}
                            onClick={() => handleItemsClick("type", 1)}
                        >
                            <BsArrowDownLeftCircle style={{ marginRight: 8 }} />
                            Login
                        </div>
                        <hr className="hr-line" />
                    </div>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 ${
                                selectMenu.typeValue === 2 ? "active-menu" : ""
                            }`}
                            onClick={() => handleItemsClick("type", 2)}
                        >
                            <BsCardChecklist style={{ marginRight: 8 }} />
                            Card
                        </div>
                        <hr className="hr-line" />
                    </div>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 ${
                                selectMenu.typeValue === 3 ? "active-menu" : ""
                            }`}
                            onClick={() => handleItemsClick("type", 3)}
                        >
                            <BsFileEarmarkPerson style={{ marginRight: 8 }} />
                            Identity
                        </div>
                        <hr className="hr-line" />
                    </div>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 mb-3 ${
                                selectMenu.typeValue === 4 ? "active-menu" : ""
                            }`}
                            onClick={() => handleItemsClick("type", 4)}
                        >
                            <BsSuitcaseLg style={{ marginRight: 8 }} />
                            Secure Note
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsBar;
