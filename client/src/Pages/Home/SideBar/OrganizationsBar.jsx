import {
    BsFillPeopleFill,
    BsFillPersonFill,
    BsPlusCircle,
    BsGlobe,
} from "react-icons/bs";
import "../home.scss";
import { useState, useEffect } from "react";
import AddOrgModal from "../../../Modal/OrgModals/AddOrgModal";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch, useSelector } from "react-redux";
import { setSelectMenu, setMakeBlur, setSelectedItems, setPopup, setDotModal } from "../../../store";

const OrganizationsBar = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const organizations = useSelector((state) => state.organizations);
    const selectMenu = useSelector((state) => state.selectMenu);
    const blur = useSelector((state) => state.makeBlur);
    const orgAndFolderLoading = useSelector(
        (state) => state.orgAndFolderLoading
    );

    const dispatch = useDispatch();

    const handleOrgClick = (menuType, typeValue) => {
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

    const handleAddOrg = () => {
        setOpenAddModal(true);
        dispatch(setMakeBlur({ makeBlur: true }));
    };


    return (
        <div className="accordion">
            <div className="accordion-item">
                <div className={`d-flex flex-column ${blur ? "is-blur" : ""}`}>
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button custom-accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            style={{ backgroundColor: "#4bb4f69e" }}
                        >
                            Vaults
                        </button>
                    </h2>

                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 mt-3 ${
                                selectMenu.menuType === "orgs"
                                    ? "active-menu"
                                    : ""
                            }`}
                            onClick={() => handleOrgClick("orgs", 0)}
                        >
                            <BsFillPeopleFill style={{ marginRight: 8 }} />
                            All Vaults
                        </div>
                        <hr className="hr-line" />
                    </div>

                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        <div
                            className={`accordion-body p-0 ${
                                selectMenu.menuType === "me"
                                    ? "active-menu"
                                    : ""
                            }`}
                            onClick={() => handleOrgClick("me", 0)}
                        >
                            <BsFillPersonFill style={{ marginRight: 8 }} />
                            My Vault
                        </div>
                        <hr className="hr-line" />
                    </div>

                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        style={{ marginLeft: 20 }}
                    >
                        {orgAndFolderLoading && (
                            <div
                                style={{
                                    width: "100px",
                                    margin: "15px auto 15px",
                                    display: "block",
                                }}
                            >
                                <MoonLoader color="#52bfd9" />
                            </div>
                        )}

                        {organizations.length > 0 && (
                            <div className="accordion-body p-0 ">
                                <ul
                                    style={{
                                        listStyleType: "none",
                                        textAlign: "start",
                                        padding: "0px",
                                    }}
                                >
                                    {organizations.map((organization) => (
                                        <li
                                            key={organization.id}
                                            className={`${
                                                selectMenu.typeValue ===
                                                organization.id
                                                    ? "active-menu"
                                                    : ""
                                            }`}
                                            style={{
                                                marginBottom: 5,
                                                // width: "112px",
                                            }}
                                            onClick={() =>
                                                handleOrgClick(
                                                    "org",
                                                    organization.id
                                                )
                                            }
                                        >
                                            <BsGlobe
                                                style={{ marginRight: 8 }}
                                            />
                                            {organization.orgname.split(" ")[0]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div onClick={handleAddOrg}>
                            <div
                                className="accordion-body p-0 mb-3 add-org-text"
                                style={{ marginRight: 22 }}
                            >
                                <BsPlusCircle style={{ marginRight: 8 }} />
                                Add Organization
                            </div>
                        </div>
                    </div>
                </div>
                <AddOrgModal
                    openAddModal={openAddModal}
                    setOpenAddModal={setOpenAddModal}
                />
            </div>
        </div>
    );
};

export default OrganizationsBar;
