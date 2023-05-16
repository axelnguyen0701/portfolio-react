import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet, useNavigation } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";
import { Spinner } from "react-bootstrap";
function App() {
    const [theme, setTheme] = useState("dark");
    const { state } = useNavigation();

    const renderLoadingSpinner = () => {
        if (state === "loading")
            return (
                <>
                    <Spinner role="status" animation="grow">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <div>Loading...</div>
                </>
            );
        return <Outlet />;
    };

    return (
        <ThemeContext.Provider value={theme}>
            <div className="App">
                <NavBar setTheme={setTheme} />
                {renderLoadingSpinner()}
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
