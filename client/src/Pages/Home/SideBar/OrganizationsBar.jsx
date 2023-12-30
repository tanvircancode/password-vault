import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";

const OrganizationsBar = () => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button"
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
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    <BsFillPeopleFill />
                    All Vaults
                </div>
                <div className="accordion-body">
                    <BsFillPersonFill />
                    My Vault
                </div>
            </div>
        </div>
    );
};

export default OrganizationsBar;
