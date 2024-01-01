
function AddItemModal({ openPopup, setOpenPopup }) {
    
    return (
        <div
            className="modal-body"
            style={{ display: openPopup ? "block" : "none" }}
        >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">.col-md-4</div>
                    <div className="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
                </div>
                <div className="row">
                    <div className="col-md-3 ms-auto">.col-md-3 .ms-auto</div>
                    <div className="col-md-2 ms-auto">.col-md-2 .ms-auto</div>
                </div>
                <div className="row">
                    <div className="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
                </div>
                <div className="row">
                    <div className="col-sm-9">
                        Level 1: .col-sm-9
                        <div className="row">
                            <div className="col-8 col-sm-6">
                                Level 2: .col-8 .col-sm-6
                            </div>
                            <div className="col-4 col-sm-6">
                                Level 2: .col-4 .col-sm-6
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddItemModal;
