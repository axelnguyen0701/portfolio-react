import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet, useNavigation } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";
import { Container, Spinner } from "react-bootstrap";
function App() {
    const [theme, setTheme] = useState("dark");
    const { state } = useNavigation();

    useEffect(() => {
        document.documentElement.setAttribute("data-color-mode", theme);
    }, [theme]);

    const renderLoadingSpinner = () => {
        if (state === "loading")
            return (
                <Container
                    className={`${
                        theme === "dark" ? "bg-dark text-light" : ""
                    } h-100 d-flex flex-column justify-content-center align-items-center`}
                    fluid
                >
                    <div>
                        <Spinner role="status" animation="grow">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </Container>
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
