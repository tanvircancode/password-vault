import { BsThreeDotsVertical } from "react-icons/bs";
import "./item.scss";
import { useState } from "react";
import AddItemModal from "../../../Modal/ItemModals/AddItemModal";

const ItemList = () => {
    const [ openNewItemModal , setOpenNewItemModal ] = useState(false);  

    const handleNewItemClick = () => {
        setOpenNewItemModal(true);
    };

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col text-start" style={{fontSize: 25}}>All Items</div>
                <div className="col text-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNewItemClick} 
                    >
                        New Item
                    </button>
                </div>
            </div>

            <div className="row mt-4 p-2 all-items">
                <div className="col-2 text-start">All</div>
                <div className="col-5 text-start">Name</div>
                <div className="col-3 text-start">Owner</div>
                <div className="col-2 text-start">
                    <BsThreeDotsVertical />
                </div>
            </div>

           <AddItemModal 
            openPopup={openNewItemModal}
            setOpenPopup={setOpenNewItemModal}
           />
        </div>
    );
};

export default ItemList;
