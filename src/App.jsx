import styles from'./App.module.css'
import Login from "./pages/Login.jsx";
import {Route, Routes} from "react-router";
import Header from "./layouts/header/Header.jsx";
import Register from "./pages/Register.jsx";
import {Dashboard} from "./pages/Dash.jsx";

function App() {

  return (
    <div className={styles.appContainer}>
        <Header/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dash" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default App
