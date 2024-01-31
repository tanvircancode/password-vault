import {
    BsFillPeopleFill,
    BsFillPersonFill,
    BsPlusCircle,
    BsGlobe,
} from "react-icons/bs";
import "../home.scss";
import { useState } from "react";
import AddOrgModal from "../../../Modal/OrgModals/AddOrgModal";
import { useSelector } from "react-redux";

const OrganizationsBar = ({ selectMenu, setSelectMenu }) => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const organizations = useSelector((state) => state.organizations);

    const handleSelectMenu = (orgId, type) => {
        setSelectMenu({
            menuType: type,
            typeValue: orgId,
        });
    };

    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button custom-accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Vaults
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className={`accordion-body p-0 mt-3 ${
                            selectMenu.menuType === "orgs" ? "active-menu" : ""
                        }`}
                        onClick={() => handleSelectMenu(0, "orgs")}
                        style={{ marginRight: 80 }}
                    >
                        <BsFillPeopleFill style={{ marginRight: 8 }} />
                        All Vaults
                    </div>
                    <hr className="hr-line" />
                </div>

                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className={`accordion-body p-0 ${
                            selectMenu.menuType === "me" ? "active-menu" : ""
                        }`}
                        onClick={() => handleSelectMenu(0, "me")}
                        style={{ marginRight: 80 }}
                    >
                        <BsFillPersonFill style={{ marginRight: 8 }} />
                        My Vault
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"                    
                >
                    {organizations.length > 0 && (
                        <div
                            className="accordion-body p-0 mt-2 custom-accordion-body"
                            style={{ marginRight: 22 }}
                        >
                            <ul style={{ listStyleType: "none" , textAlign:'start', marginRight:'67px' }}>
                                {organizations.map((organization) => (
                                    <li
                                        key={organization.id}
                                        style={{ marginBottom: 5 , width:'112px' }}
                                    >
                                        <BsGlobe style={{ marginRight: 8 }} />
                                        {organization.orgname}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div onClick={() => setOpenAddModal(true)}>
                        <div
                            className="accordion-body p-0 mb-3"
                            style={{ marginRight: 22 }}
                        >
                            <BsPlusCircle style={{ marginRight: 8 }} />
                            Add Organization
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
