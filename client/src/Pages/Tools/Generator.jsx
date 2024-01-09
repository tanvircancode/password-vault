import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./tools.scss";

const Generator = () => {
    const [selectedRadio, setSelectedRadio] = useState("password");

    const [isSymbol, setIsSymbol] = useState(true);
    const [isNumber, setIsNumber] = useState(true);
    const [isUppercase, setIsUppercase] = useState(true);
    const [isLowercase, setIsLowercase] = useState(true);
    const [minNumber, setMinNumber] = useState(1);
    const [minSpecial, setMinSpecial] = useState(1);

    const [numberOfWord, setNumberOfWord] = useState(2);
    const [wordSeparator, setWordSeparator] = useState("-");

    let [passwordLength, setPasswordLength] = useState(5);
    const [password, setPassword] = useState("");

    const [isAmbiguous, setIsAmbiguous] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    const generatePassword = () => {
        let charSet = "";
        let newPassword = "";

        const numberChars = "0123456789";
        const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerChars = "abcdefghijklmnopqrstuvwxyz";
        const specialChars = "!@#$%^&*()_+~`}{[]:;?><,./-=";

        if (selectedRadio === "phrase") {
            const digits = "23456789";
            let randomWord = "";
            let randomNumber;
            for (let k = 0; k < numberOfWord; k++) {
                randomNumber =
                    digits[Math.floor(Math.random() * digits.length)];
                for (let i = 0; i < randomNumber; i++) {
                    const randomIndex = Math.floor(
                        Math.random() * lowerChars.length
                    );
                    if ((k === 0) & (i === 0)) {
                        randomWord += lowerChars[randomIndex].toUpperCase();
                    }
                    randomWord += lowerChars[randomIndex];
                }

                if (numberOfWord - k !== 1) {
                    randomWord += wordSeparator;
                }
            }

            setPassword(randomWord);
            console.log(randomWord);
            return;
        }

        if (!isSymbol && !isNumber && !isLowercase && !isUppercase) {
            setIsLowercase(true);
        }

        for (let j = 0; j < minSpecial; j++) {
            newPassword += specialChars[Math.floor(Math.random() * 28)];
        }

        for (let i = 0; i < minNumber; i++) {
            newPassword += numberChars[Math.floor(Math.random() * 10)];
        }

        if (isUppercase) {
            charSet += upperChars;
            newPassword += upperChars[Math.floor(Math.random() * 26)];
        }
        if (isLowercase) {
            charSet += lowerChars;
            newPassword += lowerChars[Math.floor(Math.random() * 26)];
        }

        if (isSymbol) {
            charSet += specialChars;

            if (minSpecial === 0) {
                newPassword += specialChars[Math.floor(Math.random() * 28)];
            }
        }

        if (isNumber) {
            charSet += numberChars;

            if (minNumber === 0) {
                newPassword += numberChars[Math.floor(Math.random() * 10)];
            }
        }

        while (newPassword.length < passwordLength) {
            newPassword += charSet[Math.floor(Math.random() * charSet.length)];
        }
        setPasswordLength(newPassword.length);

        if (isAmbiguous) {
            newPassword = newPassword.replace(
                /0O|5S|8B|2Z|Il|1l|O0|S5|B8|Z2|lI|l1/g,
                "3H"
            );
        }

        const arrayString = newPassword.split("");
        const shuffledPassword = arrayString
            .sort(() => Math.random() - 0.5)
            .join("");
        setPassword(shuffledPassword);
    };

    const handleMinNumberChange = (e) => {
        setMinNumber(e.target.value);
    };

    const handleMinSpecialChange = (e) => {
        setMinSpecial(e.target.value);
    };

    const handleCopyToClipboard = () => {
        
            setCopiedPassword(true);

            setTimeout(() => {
                setCopiedPassword(false);
            }, 50000);
    };

    useEffect(() => {
        generatePassword();
    }, [
        isNumber,
        isSymbol,
        isUppercase,
        isLowercase,
        isAmbiguous,
        passwordLength,
        minNumber,
        minSpecial,
        wordSeparator,
        numberOfWord,
    ]);

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
        setPassword("");
    };

    return (
        <div className="container ">
            <div className="fw-bold border-bottom pb-2">
                <span>Generator</span>
            </div>

            <div className="row pt-3">
                <div className="col-12">
                    <textarea
                        className="form-control fs-5"
                        value={password}
                        aria-label="With textarea"
                        style={{
                            resize: "none",
                            textAlign: "center",
                            height: 70,
                            paddingTop: 18,
                            backgroundColor: "#f0f1f3",
                            color: "#000",
                        }}
                        readOnly
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
                                    min="5"
                                    max="60"
                                    value={passwordLength}
                                    onChange={(e) =>
                                        setPasswordLength(e.target.value)
                                    }
                                    className="form-control"
                                    aria-describedby="basic-addon3 basic-addon4"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
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
                                    min="0"
                                    max="9"
                                    value={minNumber}
                                    onChange={handleMinNumberChange}
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
                                    min="0"
                                    max="9"
                                    value={minSpecial}
                                    onChange={handleMinSpecialChange}
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
                                    min="1"
                                    max="20"
                                    value={numberOfWord}
                                    onChange={(e) =>
                                        setNumberOfWord(e.target.value)
                                    }
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
                                    value={wordSeparator}
                                    onChange={(e) =>
                                        setWordSeparator(e.target.value)
                                    }
                                    maxLength={1}
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
                            checked={isUppercase}
                            onChange={() => setIsUppercase(!isUppercase)}
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
                            id="checkSml"
                            style={{ transform: "scale(0.6)" }}
                            checked={isLowercase}
                            onChange={() => setIsLowercase(!isLowercase)}
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
                            checked={isNumber}
                            onChange={() => setIsNumber(!isNumber)}
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
                            checked={isSymbol}
                            onChange={() => setIsSymbol(!isSymbol)}
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
                            onChange={() => setIsAmbiguous(!isAmbiguous)}
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

            <div
                className={
                    selectedRadio === "password" ? "mt-4 pb-2 generator-button" : "mt-2 pb-2 generator-button"
                }
            >
                <button
                    type="button"
                    className="btn btn-dark mr-2 regenerate-pass"
                    style={{ marginRight: 10 }}
                    onClick={generatePassword}
                >
                    Regenerate Password
                </button>

                <CopyToClipboard text={password} onCopy={handleCopyToClipboard}>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{ color: "black" }}
                    >
                        Copy Password
                    </button>
                </CopyToClipboard>
                {copiedPassword && (
                <div className="copied-text">
                    <span >
                        Copied.
                    </span>
                </div>
            )}
               
            </div>
          
            
            
        </div>
    );
};

export default Generator;
