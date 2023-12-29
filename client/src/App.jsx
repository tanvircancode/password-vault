import { Routes, Route } from "react-router-dom";
// import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";

function App() {
    return (
        <>
            {/* <Layout /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


            </Routes>
        </>
    );
}

export default App;
