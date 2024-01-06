const ExportData = () => {
    return (
        <div className="container ">
            <div className="fw-bold border-bottom pb-2">
                <span>Export Data</span>
            </div>

            <div className="row pt-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title ">
                                EXPORTING INDIVIDUAL VAULT
                            </h5>
                            <p className="card-text">
                                Only vault item information will be exported and
                                will not include associated password history or
                                attachments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <button type="submit" className="btn btn-primary mt-2">
                    Export Data
                </button>
            </div>
        </div>
    );
};

export default ExportData;
