import "./App.css";
import NavBar from "./components/NavBar";
import Info from "./components/Info";
import Projects from "./components/Projects";

import "bootstrap/dist/css/bootstrap.min.css";
import ProjectForm from "./components/ProjectForm";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <NavBar />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
