import { useState } from "react";
import ItemList from "./Items/ItemList";
import FoldersBar from "./SideBar/FoldersBar";
import ItemsBar from "./SideBar/ItemsBar";
import OrganizationsBar from "./SideBar/OrganizationsBar";

const Home = () => {
    const [selectMenu, setSelectMenu] = useState({menuType:'',typeValue:''});
    // const [loading, setLoading] = useState(true);
    // const [orgData, setOrgData] = useState(true);
    // const [folderData, setFolderData] = useState("");

    return (
        <div className="container text-center">
            <div className="row mt-5">
                <div className="col-sm-12 col-md-4 ">
                    <div className="card">
                        <div className="card-header text-uppercase">Filter</div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item mt-3">
                                <OrganizationsBar 
                                 selectMenu={selectMenu}
                                 setSelectMenu={setSelectMenu}
                                />
                            </li>
                            <li className="list-group-item mt-3">
                                <ItemsBar />
                            </li>
                            <li className="list-group-item mt-3">
                                <FoldersBar />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <ItemList />
                </div>
            </div>
        </div>
    );
};

export default Home;
