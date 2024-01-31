import {
    BsBricks,
    BsStar,
    BsArrowDownLeftCircle,
    BsCardChecklist,
    BsFileEarmarkPerson,
    BsSuitcaseLg,
} from "react-icons/bs";

const ItemsBar = () => {
    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                    >
                        Items
                    </button>
                </h2>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className="accordion-body p-0 mt-3"
                        style={{ marginRight: 80 }}
                    >
                        <BsBricks style={{ marginRight: 8 }} />
                        All Items
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className="accordion-body p-0"
                        style={{ marginRight: 80 }}
                    >
                        <BsStar style={{ marginRight: 8 }} />
                        Favorites
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className="accordion-body p-0"
                        style={{ marginRight:'7em' }}
                    >
                        <BsArrowDownLeftCircle style={{ marginRight: 8 }} />
                        Login
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className="accordion-body p-0"
                        style={{ marginRight: '7em' }}
                    >
                        <BsCardChecklist style={{ marginRight: 8 }} />
                        Card
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className="accordion-body p-0"
                        style={{ marginRight: '6em' }}
                    >
                        <BsFileEarmarkPerson style={{ marginRight: 8 }} />
                        Identity
                    </div>
                    <hr className="hr-line" />
                </div>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                >
                    <div
                        className="accordion-body p-0 mb-3"
                        style={{ marginRight: '4em' }}
                    >
                        <BsSuitcaseLg style={{ marginRight: 8 }} />
                        Secure Note
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default ItemsBar;
