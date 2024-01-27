import { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsCopy, BsEye, BsEyeSlash } from "react-icons/bs";
import { Brands,Months } from "../../constants/variables";

const AddCardModal = ({ stateValues, setStateValues }) => {
    const [copiedName, setCopiedName] = useState(false);
    const [copiedNumber, setCopiedNumber] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);

    const [showNumber, setShowNumber] = useState(false);
    const [showCode, setShowCode] = useState(false);

    const handleToggleNumber = () => {
        setShowNumber(!showNumber);
    };

    const handleToggleCode = () => {
        setShowCode(!showCode);
    };

    const handleCopyToClipboard = (val) => {
        return () => {
            if (val === 0) {
                setCopiedName(true);

                setTimeout(() => {
                    setCopiedName(false);
                }, 2000);
            } else if (val === 1) {
                setCopiedNumber(true);

                setTimeout(() => {
                    setCopiedNumber(false);
                }, 2000);
            } else {
                setCopiedCode(true);

                setTimeout(() => {
                    setCopiedCode(false);
                }, 2000);
            }
        };
    };

    return (
        <div className="row mb-4 mt-4">
            <div className="col-sm-12 col-lg-6 position-relative">
                <label className="form-label fw-bold label-text">
                    Cardholder Name
                </label>

                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={stateValues.cardHolderName}
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                cardHolderName: e.target.value,
                            })
                        }
                        aria-label="Name"
                    />
                    <button type="button" className="btn btn-light">
                        <CopyToClipboard
                            text={stateValues.cardHolderName}
                            onCopy={handleCopyToClipboard(0)}
                        >
                            <BsCopy />
                        </CopyToClipboard>
                    </button>
                </div>
                {copiedName && (
                    <div className="position-absolute top-0 end-0 me-2">
                        <span style={{ color: "red" }}>Copied.</span>
                    </div>
                )}
            </div>

            <div className="col-sm-12 col-lg-6 position-relative">
                <label className="form-label fw-bold label-text">Brand</label>
                <select
                    className="form-select"
                    value={stateValues.brand}
                    onChange={(e) =>
                        setStateValues({
                            ...stateValues,
                            brand: e.target.value,
                        })
                    }
                >  

                <option value="">-Select-</option>
                    {Object.keys(Brands).map((brandKey) => (
                    <option key={brandKey} value={brandKey}>  
                        {Brands[brandKey]}         
                    </option>
                ))}
                </select>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12 col-md-6 position-relative mb-4">
                    <label className="form-label fw-bold label-text">
                        Number
                    </label>
                    <div className="input-group">
                        <input
                            type={showNumber ? "text" : "password"}
                            className="form-control"
                            value={stateValues.cardNumber}
                            onChange={(e) =>
                                setStateValues({
                                    ...stateValues,
                                    cardNumber: e.target.value,
                                })
                            }
                            aria-label="Password"
                        />

                        <button type="button" className="btn btn-light">
                            <CopyToClipboard
                                text={stateValues.cardNumber}
                                onCopy={handleCopyToClipboard(1)}
                            >
                                <BsCopy />
                            </CopyToClipboard>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={handleToggleNumber}
                        >
                            {showNumber ? <BsEye /> : <BsEyeSlash />}
                        </button>
                    </div>
                    {copiedNumber && (
                        <div className="position-absolute top-0 end-0 me-2">
                            <span style={{ color: "red" }}>Copied.</span>
                        </div>
                    )}
                </div>
                <div className="col-sm-12 col-md-3 mb-4">
                <label className="form-label fw-bold label-text">Expiration Month</label>
                <select
                    className="form-select"
                    value={stateValues.expMonth}
                    onChange={(e) =>
                        setStateValues({
                            ...stateValues,
                            expMonth: e.target.value,
                        })
                    }
                >  

                <option value="">-Select-</option>
                    {Object.keys(Months).map((monthKey) => (
                    <option key={monthKey} value={monthKey}>  
                        {Months[monthKey]}         
                    </option>
                ))}
                </select>
                </div>
                <div className="col-sm-12 col-md-3 mb-4">
                    <label className="form-label fw-bold label-text">
                        Expiration Year
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ex:- 2024"
                        value={stateValues.expYear}
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                expYear: e.target.value,
                            })
                        }
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6 position-relative">
                    <label className="form-label fw-bold label-text">
                        Security Code
                    </label>
                    <div className="input-group">
                        <input
                            type={showCode ? "text" : "password"}
                            className="form-control"
                            value={stateValues.securityCode}
                            onChange={(e) =>
                                setStateValues({
                                    ...stateValues,
                                    securityCode: e.target.value,
                                })
                            }
                            
                        />

                        <button type="button" className="btn btn-light">
                            <CopyToClipboard
                                text={stateValues.securityCode}
                                onCopy={handleCopyToClipboard(2)}
                            >
                                <BsCopy />
                            </CopyToClipboard>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={handleToggleCode}
                        >
                            {showCode ? <BsEye /> : <BsEyeSlash />}
                        </button>
                    </div>
                    {copiedCode && (
                        <div className="position-absolute top-0 end-0 me-2">
                            <span style={{ color: "red" }}>Copied.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddCardModal;
