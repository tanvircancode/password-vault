import { BsFillPeopleFill, BsFillPersonFill, BsPlusCircle  } from "react-icons/bs";
import "../home.scss";

const OrganizationsBar = () => {
    return (
        <div className="accordion" >
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    
                        Vaults
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show mt-3"
                    
                >
                    <div className="accordion-body p-0" style={{marginRight: 80}}>
                        <BsFillPeopleFill style={{marginRight: 8}}/>
                        All Vaults
                    </div>
                    <hr className="hr-line" />
                </div>
                
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    
                >
                    <div className="accordion-body p-0" style={{marginRight: 80}}>
                        <BsFillPersonFill style={{marginRight: 8}}/>
                        My Vault
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show mb-3"
                    
                >
                    <div className="accordion-body p-0" style={{marginRight: 22}}>
                        <BsPlusCircle  style={{marginRight: 8}}/>
                        Add Organization
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
};

export default OrganizationsBar;
