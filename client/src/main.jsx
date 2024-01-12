import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// redux code
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import  vaultReducer  from "./store/index.jsx";

export const store = configureStore({
    reducer:  vaultReducer ,
});

//end
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
