import { Routes, Route, Navigate,useNavigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Tools from "./Pages/Tools";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLogin, setSelectedItems } from "./store";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import LoginComponent from "./Pages/LoginPage/LoginComponent";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// import { store, persistor } from "./main";

function App() {
  const authChecked = Boolean(useSelector((state) => state.token));

    return (
        <>
            <Layout />
            
            <InitUser />
            <Routes>
                <Route path="/home" element={authChecked ? <Home /> : <Navigate to="/login" />} />

                <Route path="/login" element={<LoginComponent />} />
        
                <Route path="/tools" element={authChecked ? <Tools /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

function InitUser() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    // console.log(token);


    const init = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.user) {

                dispatch(
                    setLogin({
                        user: response.data.user,
                        token: token,
                    })
                );
            } else {
                dispatch(
                    setLogin({
                        user: null,
                        token: null,
                    })
                );
                dispatch(setSelectedItems(null));
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
            }
        } catch (e) {

            dispatch(
                setLogin({
                    user: null,
                    token: null,
                })
            );
            dispatch(setSelectedItems(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");

        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>;
}
export default App;
