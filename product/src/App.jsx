import './App.css'
import RoutersAdmin from "./router/admin/RoutersAdmin.jsx";
import RoutersLogin from "./router/login/RoutersLogin.jsx";
function App() {
  return (
      <>
          <RoutersLogin/>
          <RoutersAdmin/>
      </>
  )
}
export default App
