import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./css/style.css";
import "./css/taxi.css";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <App></App>
    </StrictMode>
);