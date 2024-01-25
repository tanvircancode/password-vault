import { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsCopy, BsEye, BsEyeSlash } from "react-icons/bs";

const AddLoginModal = ({ stateValues, setStateValues }) => {
    const [copiedUsername, setCopiedUsername] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCopyToClipboard = (val) => {
        return () => {
            if (val === 0) {
                setCopiedUsername(true);

                setTimeout(() => {
                    setCopiedUsername(false);
                }, 2000);
            } else {
                setCopiedPassword(true);

                setTimeout(() => {
                    setCopiedPassword(false);
                }, 2000);
            }
        };
    };

    return (
        
          
            <div className="row mb-4">

                <div className="col-6 position-relative">
                    <label className="form-label fw-bold label-text">
                        Username
                    </label>

                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setStateValues({...stateValues, userName : e.target.value})}
                            aria-label="Name"
                        />
                        <button type="button" className="btn btn-light">
                            <CopyToClipboard
                                text={username}
                                onCopy={handleCopyToClipboard(0)}
                            >
                                <BsCopy />
                            </CopyToClipboard>
                        </button>
                    </div>
                    {copiedUsername && (
                        <div className="position-absolute top-0 end-0 me-2">
                            <span style={{ color: "red" }}>Copied.</span>
                        </div>
                    )}
                </div>

                <div className="col-6 position-relative">
                    <label className="form-label fw-bold label-text">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}  
                            className="form-control"
                            onChange={(e) => setStateValues({...stateValues, password : e.target.value})}
                            aria-label="Password"
                        />
                        <button type="button" className="btn btn-light">
                            <CopyToClipboard
                                text={password}
                                onCopy={handleCopyToClipboard(1)}
                            >
                                <BsCopy />
                            </CopyToClipboard>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <BsEye /> : <BsEyeSlash />}
                        </button>
                    </div>
                    {copiedPassword && (
                        <div className="position-absolute top-0 end-0 me-2">
                            <span style={{ color: "red" }}>Copied.</span>
                        </div>
                    )}
                </div>
            </div>
       
    );
};

export default AddLoginModal;
