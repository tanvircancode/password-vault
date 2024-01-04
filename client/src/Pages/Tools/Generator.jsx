import "./tools.scss";
const Generator = () => {
    return (
        <div className="container ">
            <div className="fw-bold border-bottom pb-2">
                <span>Generator</span>
            </div>

            <div className="row pt-3">
                <div className="col-12">
                    <textarea
                        className="form-control"
                        aria-label="With textarea"
                        style={{ resize: "none" }}
                    ></textarea>
                </div>
            </div>
            <div className="pt-3 pb-3">
                <span className="fw-bold"> Password Type</span>
                <div className="d-flex align-items-center gap-3 pt-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                        />
                        <label
                            className="form-check-label"
                            style={{ marginLeft: 5, marginTop: 3 }}
                        >
                            Password
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                        />
                        <label
                            className="form-check-label"
                            style={{ marginLeft: 5, marginTop: 3 }}
                        >
                            Passphrase
                        </label>
                    </div>
                </div>
            </div>
            <div className="row pt-3 ">
                <div className="col-4">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Length</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                aria-describedby="basic-addon3 basic-addon4"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Minimum Numbers
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                aria-describedby="basic-addon3 basic-addon4"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Minimum Specials
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                aria-describedby="basic-addon3 basic-addon4"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <span className="fw-bold">Options</span>
                <div className="form-check mt-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ transform: "scale(0.6)" }}
                    />
                    <label
                        className="form-check-label custom-checkbox"
                        htmlFor="flexCheckDefault"
                    >
                        A-Z
                    </label>
                </div>
                <div className="form-check ">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ transform: "scale(0.6)" }}
                    />
                    <label
                        className="form-check-label custom-checkbox"
                        htmlFor="flexCheckDefault"
                    >
                        a-z
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ transform: "scale(0.6)" }}
                    />
                    <label
                        className="form-check-label custom-checkbox"
                        htmlFor="flexCheckDefault"
                    >
                        0-9
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ transform: "scale(0.6)" }}
                    />
                    <label
                        className="form-check-label custom-checkbox"
                        htmlFor="flexCheckDefault"
                    >
                        !@#$%^&*
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ transform: "scale(0.6)" }}
                    />
                    <label
                        className="form-check-label custom-checkbox"
                        htmlFor="flexCheckDefault"
                    >
                        Avoid ambiguous characters
                    </label>
                </div>
            </div>
            <div className="mt-4">
                <button
                    type="button"
                    className="btn btn-dark mr-2"
                    style={{ marginRight: 10 }}
                >
                    Regenerate Password
                </button>
                <button type="button" className="btn btn-outline-secondary" style={{color:'black'}}>
                    Copy Password
                </button>
            </div>
        </div>
    );
};

export default Generator;
