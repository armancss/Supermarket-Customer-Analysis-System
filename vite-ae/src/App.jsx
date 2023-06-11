import { Cam_Feed } from "./pages/Cam_Feed/Cam_Feed";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Route, Routes } from "react-router-dom";

function App(){
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cam" element={<Cam_Feed />} />
        </Routes>
    )
}

export default App;