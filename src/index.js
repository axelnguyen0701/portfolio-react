import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectForm from "./components/Projects/ProjectForm";
import ErrorPage from "./components/Error/ErrorPage";
import Info from "./components/Index/Info";
import { getProjects as projectsLoader } from "./services/projects";
import { getProject as projectLoader } from "./services/projects";
import ProjectEdit from "./components/Projects/ProjectEdit";
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
                loader: projectsLoader,
                element: <Info />,
            },
            {
                path: "/project/edit/:id",
                loader: projectLoader,
                element: <ProjectEdit />,
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
