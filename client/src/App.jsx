import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Tools from "./Pages/Tools";

function App() {
    return (
        <>
            <Layout />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tools" element={<Tools />} />
            </Routes>
        </>
    );
}

export default App;
