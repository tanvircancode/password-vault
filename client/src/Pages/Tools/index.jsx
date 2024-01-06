import { useState } from "react";
import Generator from "./Generator";
import ImportData from "./ImportData";
import ExportData from "./ExportData";



const Tools = () => {

    const [selectMenu, setSelectMenu] = useState("generator");

    return (
        <div className="container">
            <div className="row">
                <div className="card col-lg-3 col-md-4 mt-4 " style={{maxHeight:'11em'}} >
                    <div className="card-header fw-bold fs-5">Tools</div>
                    <ul className="list-group list-group-flush">
                        <li className={`list-group-item   ${selectMenu === 'generator' ? 'active': ''}`} onClick={() => setSelectMenu('generator')}>Generator</li>
                        <li className={`list-group-item ${selectMenu === 'import' ? 'active': ''}`} onClick={() => setSelectMenu('import')}>Import Data</li>
                        <li className={`list-group-item  ${selectMenu === 'export' ? 'active': ''}`} onClick={() => setSelectMenu('export')}>  Export Data</li>
                    </ul>
                </div>
                <div className="col-lg-9 col-md-8 mt-4" >
                    {selectMenu === 'generator' && <Generator />}
                    {selectMenu === 'import' && <ImportData />}
                    {selectMenu === 'export' && <ExportData />}

                </div>
            </div>
        </div>
    );
};

export default Tools;
