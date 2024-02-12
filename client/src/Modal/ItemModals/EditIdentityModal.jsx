import { useState } from "react";

const EditIdentityModal = ({ fetchSingleItem, setFetchSingleItem }) => {
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                title: e.target.value,
                            })
                        }
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
                            onChange={(e) =>
                                setStateValues({
                                    ...stateValues,
                                    identityEmail: e.target.value,
                                })
                            }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                firstName: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                middleName: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                lastName: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                phone: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                security: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                license: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setStateValues({
                                ...stateValues,
                                address: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default EditIdentityModal;
