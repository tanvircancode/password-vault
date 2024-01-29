import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import AddFolderModal from "../../../Modal/FolderModals/AddFolderModal";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";


const FoldersBar = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const id = useSelector((state) => state.user.id);


    const dispatch = useDispatch();

    const getFolders = async () => {

        await axios.get(`${BASE_URL}/api/user/`+id,
        ).then((res) => {
            // const data = res.data;
            console.log(res)

            // dispatch(setFolders({ posts: data }));
        })
            .catch((error) => alert(error.response.data.message));
    }

    useEffect(() => {
        getFolders();
        console.log(userId)
    },[]);

    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button custom-accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                    >
                        Folders
                    </button>
                </h2>

                <div
                    id="collapseThree"
                    className="accordion-collapse collapse show mt-3 mb-3"
                    onClick={() => setOpenAddModal(true)}
                >
                    <div
                        className="accordion-body p-0"
                        style={{ marginRight: 70 }}
                    >
                        <BsPlusCircle style={{ marginRight: 8 }} />
                        Add Folder
                    </div>
                </div>
                <AddFolderModal 
                 openAddModal={openAddModal}
                 setOpenAddModal={setOpenAddModal}
                /> 
            </div>
        </div>
    );
};

export default FoldersBar;
