// import ItemList from "./Items/ItemList";
import FoldersBar from "./SideBar/FoldersBar";
import ItemsBar from "./SideBar/ItemsBar";
import OrganizationsBar from "./SideBar/OrganizationsBar";

const Home = () => {
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-3">
                    <div className="card" style={{width: '18rem'}}>
                        <div className="card-header text-uppercase">Filter</div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><OrganizationsBar /></li>
                            <li className="list-group-item"><ItemsBar /></li>
                            <li className="list-group-item"><FoldersBar /></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-8 col-md-9">Column</div>
            </div>
        </div>
    );
};

export default Home;
