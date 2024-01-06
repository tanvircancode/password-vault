import { useState } from "react";
import "./tools.scss";

const Generator = () => {
    const [selectedRadio, setSelectedRadio] = useState("password");

    const [isSymbol, setIsSymbol] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    const [isUppercase, setIsUppercase] = useState(false);
    const [isLowercase, setIsLowercase] = useState(false);
    const [isAmbi, setIsAmbi] = useState(false);


    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

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
                            value="password"
                            name="flexRadioDefault"
                            id="passwordRadioId"
                            checked={selectedRadio === "password"}
                            onChange={handleRadioChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="passwordRadioId"
                            style={{ marginLeft: 5, marginTop: 3 }}
                        >
                            Password
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            value="phrase"
                            name="flexRadioDefault"
                            id="passphraseRadioId"
                            checked={selectedRadio === "phrase"}
                            onChange={handleRadioChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="passphraseRadioId"
                            style={{ marginLeft: 5, marginTop: 3 }}
                        >
                            Passphrase
                        </label>
                    </div>
                </div>
            </div>

            
                <div className="row pt-3 ">
                    {selectedRadio === "password" ? (
                        <>
                            <div className="col-lg-4 col-md-12">
                                <div className="mb-3">
                                    <label
                                        className="form-label fw-bold"
                                        htmlFor="inputLength"
                                    >
                                        Length
                                    </label>

                                    <input
                                        type="number"
                                        id="inputLength"
                                        className="form-control"
                                        aria-describedby="basic-addon3 basic-addon4"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12" >
                                <div className="mb-3">
                                    <label
                                        className="form-label fw-bold"
                                        htmlFor="inputNumber"
                                    >
                                        Minimum Numbers
                                    </label>

                                    <input
                                        type="number"
                                        id="inputNumber"
                                        className="form-control"
                                        aria-describedby="basic-addon3 basic-addon4"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="mb-3">
                                    <label
                                        className="form-label fw-bold"
                                        htmlFor="inputSpecial"
                                    >
                                        Minimum Specials
                                    </label>

                                    <input
                                        type="number"
                                        id="inputSpecial"
                                        className="form-control"
                                        aria-describedby="basic-addon3 basic-addon4"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-4">
                                <div className="mb-3">
                                    <label
                                        className="form-label fw-bold"
                                        htmlFor="numberOfWord"
                                    >
                                        Number of word
                                    </label>

                                    <input
                                        type="number"
                                        id="numberOfWord"
                                        className="form-control"
                                        aria-describedby="basic-addon3 basic-addon4"
                                    />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="mb-3">
                                    <label
                                        className="form-label fw-bold"
                                        htmlFor="wordSeparator"
                                    >
                                        Word Separator
                                    </label>

                                    <input
                                        type="text"
                                        id="wordSeparator"
                                        maxLength="1"
                                        className="form-control"
                                        aria-describedby="basic-addon3 basic-addon4"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {selectedRadio === "password" && (
                    <div className="mt-3">
                        <span className="fw-bold">Options</span>
                        <div className="form-check mt-2">
                            <input
                                className="form-check-input d-0"
                                type="checkbox"
                                id="checkCap"
                                style={{ transform: "scale(0.6)" }}
                            />
                            <label
                                className="form-check-label custom-checkbox"
                                htmlFor="checkCap"
                            >
                                A-Z
                            </label>
                        </div>
                        <div className="form-check ">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkSml"
                                style={{ transform: "scale(0.6)" }}
                            />
                            <label
                                className="form-check-label custom-checkbox"
                                htmlFor="checkSml"
                            >
                                a-z
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkNum"
                                style={{ transform: "scale(0.6)" }}
                            />
                            <label
                                className="form-check-label custom-checkbox"
                                htmlFor="checkNum"
                            >
                                0-9
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkSpc"
                                style={{ transform: "scale(0.6)" }}
                            />
                            <label
                                className="form-check-label custom-checkbox"
                                htmlFor="checkSpc"
                            >
                                !@#$%^&*
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkAvd"
                                style={{ transform: "scale(0.6)" }}
                            />
                            <label
                                className="form-check-label custom-checkbox"
                                htmlFor="checkAvd"
                            >
                                Avoid ambiguous characters
                            </label>
                        </div>
                    </div>
                )}
            

            <div className={selectedRadio === 'password' ? 'mt-4 pb-2' : 'mt-2 pb-2'} >
                <button
                    type="button"
                    className="btn btn-dark mr-2"
                    style={{ marginRight: 10 }}
                >
                    Regenerate Password
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{ color: "black" }}
                >
                    Copy Password
                </button>
            </div>
        </div>
    );
};

export default Generator;
