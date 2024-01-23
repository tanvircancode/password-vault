import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Tools from "./Pages/Tools";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLogin } from "./store";
import { useEffect } from "react";

function App() {
    return (
        <> 
            <Layout />
            <InitUser />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tools" element={<Tools />} />
            </Routes>
        </>
    );
}

function InitUser () {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    console.log(token);
    const init = async () => {
      try {
        const response = await axios.get(`process.env.BASE_URL/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.user);
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
        }
      } catch (e) {
        
        dispatch(
          setLogin({
            user: null,
            token: null,
          })
        );
      }
    };
  
    useEffect(() => {
      init();
    }, []);
  
    return <></>;
  }

export default App;
