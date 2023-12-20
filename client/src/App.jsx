

import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";

function App() {

  return (
    <div >
      <Layout />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
     
    </div>
  )
}

export default App;
