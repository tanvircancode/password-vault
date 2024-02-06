import { useEffect } from "react";
import ItemList from "./Items/ItemList";
import { BsTrash3 } from "react-icons/bs";
import FoldersBar from "./SideBar/FoldersBar";
import ItemsBar from "./SideBar/ItemsBar";
import OrganizationsBar from "./SideBar/OrganizationsBar";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFolders, setOrganizations } from "../../store";
import { setSelectMenu } from "../../store";

const Home = () => {
    const userId = useSelector((state) => state.user.id);
    const token = useSelector((state) => state.token);
    const selectMenu = useSelector((state) => state.selectMenu);

    const dispatch = useDispatch();

    const getFoldersAndOrgs = async () => {
        await axios
            .get(`${BASE_URL}/api/user/` + userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                if (res.data.status && res.status === 200) {
                    dispatch(setFolders({ folders: res.data.data.folders }));
                    dispatch(
                        setOrganizations({
                            organizations: res.data.data.organizations,
                        })
                    );
                }
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.status === 404 &&
                    !error.response.data.status
                ) {
                    // toast.error(error.response.data.message);
                } else {
                    // toast.error("Server is not responding");
                }
            });
    };

    useEffect(() => {
        getFoldersAndOrgs();
    }, []);

    return (
        <div className="container ">
            <div className="row mt-5 d-flex">
                <div className="col-sm-12 col-md-4 col-lg-3">
                    <div className="card w-100">
                        <div
                            className="card-header text-uppercase"
                            style={{ fontWeight: "bold" }}
                        >
                            Filter
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item mt-3">
                                <OrganizationsBar />
                            </li>
                            <li className="list-group-item mt-3">
                                <ItemsBar />
                            </li>
                            <li className="list-group-item mt-3">
                                <FoldersBar />
                            </li>
                            <li
                                className="list-group-item d-flex align-items-center justify-content-center"
                                onClick={() =>
                                    dispatch(
                                        setSelectMenu({
                                            typeValue: "",
                                            menuType: "trash",
                                        })
                                    )
                                }
                            >
                                <BsTrash3
                                    style={{ color: "red", marginRight: 5 }}
                                />
                                <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                >
                                    Trash
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-9">
                    <ItemList />
                </div>
            </div>
        </div>
    );
};

export default Home;
