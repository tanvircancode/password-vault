import {
    BsBricks,
    BsStar,
    BsArrowDownLeftCircle,
    BsCardChecklist,
    BsFileEarmarkPerson,
    BsSuitcaseLg,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSelectMenu } from "../../../store";


const ItemsBar = () => {
    const selectMenu = useSelector((state) => state.selectMenu);
    const blur = useSelector((state) => state.makeBlur);


    const dispatch = useDispatch();

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
                        style={{backgroundColor:'#4bb4f69e'}}
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
                        onClick={() =>
                            dispatch(
                                setSelectMenu({
                                    menuType: "items",
                                    typeValue: "",
                                })
                            )
                        }
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
                        onClick={() =>
                            dispatch(
                                setSelectMenu({
                                    menuType: "favorite",
                                    typeValue: "",
                                })
                            )
                        }
                        // style={{ marginRight: 80 }}
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
                            selectMenu.typeValue === 1
                                ? "active-menu"
                                : ""
                        }`}
                        onClick={() =>
                            dispatch(
                                setSelectMenu({
                                    menuType: "type",
                                    typeValue: 1,
                                })
                            )
                        }
                        // style={{ marginRight:'7em' }}
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
                            selectMenu.typeValue === 2
                                ? "active-menu"
                                : ""
                        }`}
                        onClick={() =>
                            dispatch(
                                setSelectMenu({
                                    menuType: "type",
                                    typeValue: 2,
                                })
                            )
                        }
                        // style={{ marginRight: '7em' }}
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
                            selectMenu.typeValue === 3
                                ? "active-menu"
                                : ""
                        }`}
                        onClick={() =>
                            dispatch(
                                setSelectMenu({
                                    menuType: "type",
                                    typeValue: 3,
                                })
                            )
                        }
                        // style={{ marginRight: '6em' }}
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
                            selectMenu.typeValue === 4
                                ? "active-menu"
                                : ""
                        }`}
                        onClick={() =>
                            dispatch(
                                setSelectMenu({
                                    menuType: "type",
                                    typeValue: 4,
                                })
                            )
                        }
                        // style={{ marginRight: '4em' }}
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
