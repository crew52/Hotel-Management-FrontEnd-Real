import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login.jsx"; // Dùng default import

function RoutersLogin() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default RoutersLogin;