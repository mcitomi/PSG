import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

import AppModule from "./App";

root.render(
    <StrictMode>
        <AppModule></AppModule>
    </StrictMode>
);