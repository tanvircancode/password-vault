import { BsPlusCircle } from "react-icons/bs";

const FoldersBar = () => {
    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button custom-accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                    >
                        Folders
                    </button>
                </h2>

                <div
                    id="collapseThree"
                    className="accordion-collapse collapse show mt-3 mb-3"
                >
                    <div
                        className="accordion-body p-0"
                        style={{ marginRight: 70 }}
                    >
                        <BsPlusCircle style={{ marginRight: 8 }} />
                        Add Folder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoldersBar;
