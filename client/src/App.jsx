import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/LoginPage";

function App() {
    return (
        <>
            {/* <Layout /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </>
    );
}

export default App;
