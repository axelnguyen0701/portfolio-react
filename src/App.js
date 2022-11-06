import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Outlet />
        </div>
    );
}

export default App;
