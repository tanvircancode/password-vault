import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const ExportData = () => {
    const token = useSelector((state) => state.token);
    const userId = localStorage.getItem("user_id");

    function convertArrayOfObjectsToCSV(data) {
        const keys = Object.keys(data[0]);
        const csvData = [];

        // Add headers
        csvData.push(keys.join(","));

        // Add rows
        data.forEach((item) => {
            const values = keys.map((key) => {
                let value = item[key];
                if (typeof value === "string") {
                    value = '"' + value + '"';
                }
                return value;
            });
            csvData.push(values.join(","));
        });

        return csvData.join("\n");
    }

    const handleExport = async () => {
        await axios
            .get(`${BASE_URL}/api/exportitems/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
               
            })
            .then((res) => {
                console.log(res.data);
                const blob = new Blob([res.data], { type: "text/csv" });

                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "items.csv"); // Set the filename for the downloaded file

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.log(error);
                // if (error.response && error.response.status) {
                //     toast.error(error.response?.data?.message);
                // } else {
                    toast.error("Server is not responding");
                // }
            });
    };

    return (
        <div className="container ">
            <div className="fw-bold border-bottom pb-2">
                <span>Export Data</span>
            </div>

            <div className="row pt-3">
                <div className="col-lg-12">
                    <div className="card" style={{ width: "100%" }}>
                        <div
                            className="card-body"
                            style={{ backgroundColor: "#f4ffff" }}
                        >
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
                <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    onClick={handleExport}
                >
                    Export Data
                </button>
            </div>
        </div>
    );
};

export default ExportData;
