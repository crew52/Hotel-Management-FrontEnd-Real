import {Route, Routes} from "react-router";
import {LayoutAdmin} from "../../layouts/admin/home/index.jsx";
import {LayoutEmployee} from "../../layouts/employee/index.jsx";

function RoutersAdmin() {
    return (
        <>
            <Routes>
                <Route path={"/admin"} element={<LayoutAdmin/>}></Route>
                <Route path={"/employee"} element={<LayoutEmployee/>}></Route>
            </Routes>
        </>
    )
}

export default RoutersAdmin;