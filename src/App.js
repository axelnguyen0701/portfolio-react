import "./App.css";
import NavBar from "./components/NavBar";
import Info from "./components/Info";
import Projects from "./components/Projects";

import "bootstrap/dist/css/bootstrap.min.css";
import ProjectForm from "./components/ProjectForm";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Info />
            <ProjectForm />
            <Projects />
        </div>
    );
}

export default App;
