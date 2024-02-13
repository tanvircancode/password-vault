

import { useSelector, useDispatch } from "react-redux";
import { setFetchSingleItem } from "../../store";

const EditIdentityModal = () => {
    const dispatch = useDispatch();

    const fetchSingleItem = useSelector((state) => state.fetchSingleItem);

    const handleInputChange = (e, propertyName) => {
        const value = e.target.value;
        const type= 3;
        dispatch(setFetchSingleItem({propertyName, value,type}));
      };

    return (
        <>
            <div className="row mb-2">
                <div className="col-sm-12 col-md-6 position-relative mb-2">
                    <label className="form-label fw-bold label-text">
                        Title
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={fetchSingleItem.identity.title ?? ""}
                        onChange={(e) => handleInputChange(e, 'title')}
                    >
                        <option value="1" defaultValue>
                            Mr
                        </option>
                        <option value="2">Mrs</option>
                    </select>
                </div>

                <div className="col-sm-12 col-md-6 position-relative mb-2">
                    <label className="form-label fw-bold label-text">
                        Email
                    </label>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="form-control"
                            value={fetchSingleItem.identity.email ?? ""}
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                    </div>
                </div>
            </div>
            <div className="row  mb-2">
                <div className="col-sm-12 col-md-4 mb-2">
                    <label className="form-label fw-bold label-text">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={fetchSingleItem.identity.first_name ?? ''}
                        onChange={(e) => handleInputChange(e, 'first_name')}
                    />
                </div>
                <div className="col-sm-12 col-md-4 mb-2">
                    <label className="form-label fw-bold label-text">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        value={fetchSingleItem.identity.middle_name  ?? ''}
                        className="form-control"
                        placeholder="Middle Name"
                        onChange={(e) => handleInputChange(e, 'middle_name')}
                    />
                </div>
                <div className="col-sm-12 col-md-4 mb-2">
                    <label className="form-label fw-bold label-text">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={fetchSingleItem.identity.last_name  ?? ''}
                        onChange={(e) => handleInputChange(e, 'last_name')}

                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-sm-12 col-md-4 mb-2">
                    <label className="form-label fw-bold label-text">
                        Phone
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Phone"
                        value={fetchSingleItem.identity.phone  ?? ''}
                        onChange={(e) => handleInputChange(e, 'phone')}
                    />
                </div>
                <div className="col-sm-12 col-md-4 mb-2">
                    <label className="form-label fw-bold label-text">
                        Security
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Security"
                        value={fetchSingleItem.identity.security ?? ''}
                        onChange={(e) => handleInputChange(e, 'security')}

                    />
                </div>
                <div className="col-sm-12 col-md-4 mb-2">
                    <label className="form-label fw-bold label-text">
                        License
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="License"
                        value={fetchSingleItem.identity.license  ?? ''}
                        onChange={(e) => handleInputChange(e, 'license')}

                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12 mb-2">
                    <label className="form-label fw-bold label-text">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={fetchSingleItem.identity.address  ?? ''}
                        onChange={(e) => handleInputChange(e, 'address')}
                    />
                </div>
            </div>
        </>
    );
};

export default EditIdentityModal;
