import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectForm from "./components/ProjectForm";
import ErrorPage from "./components/ErrorPage";
import Info from "./components/Info";
import Projects from "./components/Projects";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/new/project",
                element: <ProjectForm />,
            },
            {
                path: "/",
                element: <Info />,
            },
            {
                path: "/project",
                element: <Projects />,
            },
        ],
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
