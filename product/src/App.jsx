import {Route, Routes} from "react-router";
import './App.css'
import {LayoutAdmin} from "./layouts/admin/index.jsx";
import {LayoutEmployee} from "./layouts/employee/index.jsx";

function App() {

  return (
      <>
          <Routes>
              <Route path={"/admin"} element={<LayoutAdmin/>}></Route>
              <Route path={"/employee"} element={<LayoutEmployee/>}></Route>
          </Routes>
      </>
  )
}

export default App
