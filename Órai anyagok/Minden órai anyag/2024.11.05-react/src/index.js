import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";  // *varázslattal* hozzá köti a react a htmlhez

import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));   // ez a react felépítés alapja
root.render(    // megjelenítjük az elemeket a root div-ben
    <StrictMode>
        <App />
    </StrictMode>
);