const ImportData = () => {
    return (
        <div className="container ">
            <div className="fw-bold border-bottom pb-2">
                <span>Import Data</span>
            </div>

            <div className="row pt-3">
            <div className="col-lg-12 col-md-9 ">
                    <div className="card">
                        <div className="card-body">
                          
                            <p className="card-text">
                            You can export a sample file to follow the expected format. This can help avoid any potential errors or failed submissions during the import process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                
                    <label htmlFor="importFile" className="form-label fw-bold mb-1">
                    Select the import file
                    </label>
                    <input
                        className="form-control-plaintext"
                        type="file"
                        id="importFile"
                        
                    />
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                
            </div>
        </div>
    );
};

export default ImportData;
