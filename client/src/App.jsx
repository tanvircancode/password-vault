import { Routes, Route,Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Tools from "./Pages/Tools";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLogin } from "./store";
import { useEffect } from "react";
import { BASE_URL } from "./config";

function App() {
  const authChecked = Boolean(useSelector((state) => state.token));
    return (
        <> 
            <Layout />
            {/* <InitUser /> */}
            <Routes>
                <Route path="/home" element={authChecked ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tools" element={authChecked ? <Tools /> : <Navigate to="/login" />} />  
            </Routes> 
        </>
    );
}

// function InitUser () {
  
//     const dispatch = useDispatch();
//     const token = useSelector((state) => state.token);
//     console.log(token);
//     const init = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/checktoken`, {
//           headers: {
//             Authorization: `Bearer ${token}`,  
//           },
//         }).then((res)=> {
         
//           console.log(res)
//         })
//         .catch((error)=> {
      

//           console.log(error)
//         })
        
//         console.log(response);
//         if (response.data.user) {
          
//           dispatch(
//             setLogin({
//               user: response.data.user,
//               token: token,
//             })
//           );
//         } else {
         
//           dispatch(
//             setLogin({
//               user: null,
//               token: null,
//             })
//           );
//         }
//       } catch (e) {
        
//         dispatch(
//           setLogin({
//             user: null,
//             token: null,
//           })
//         );
//       }
//     };
  
//     useEffect(() => {
//       init();
//     }, []);
  
//     return <></>;
// }
export default App;
