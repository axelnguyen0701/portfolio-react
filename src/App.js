import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";
function App() {
    const [theme, setTheme] = useState("dark");
    return (
        <ThemeContext.Provider value={theme}>
            <div className="App">
                <NavBar />
                <Outlet />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
