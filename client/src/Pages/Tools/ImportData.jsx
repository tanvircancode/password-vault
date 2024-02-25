import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const ImportData = () => {
    const token = useSelector((state) => state.token);
    const userId = localStorage.getItem("user_id");

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleUpload = () => {
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post(`${BASE_URL}/api/importitem/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
                if(res.data?.status) {
                    toast.success(res.data.message);
                    setFile(null);
                }else{
                    toast.success(res.data.message);
                }

            })
            .catch((error) => {
                toast.error("Server is not responding");
            });
    };
    return (
        <div className="container ">
            <div className="fw-bold border-bottom pb-2">
                <span>Import Data</span>
            </div>

            <div className="row pt-3">
                <div className="col-lg-12">
                    <div className="card" style={{ width: "100%" }}>
                        <div
                            className="card-body"
                            style={{ backgroundColor: "#f4ffff" }}
                        >
                            <p className="card-text">
                                You can export a sample file to follow the
                                expected format. This can help avoid any
                                potential errors or failed submissions during
                                the import process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="importFile" className="form-label fw-bold mb-1">
                    Select the import file
                </label>
                <input
                    className="form-control-plaintext"
                    type="file"
                    id="importFile"
                    onChange={handleFileChange}
                />
                <button className="btn btn-primary mt-2" onClick={handleUpload}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ImportData;
