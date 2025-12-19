import React, { useState } from "react";


/* 
div id="..." class="..."
{
    id: "...",
    class: "..."
}
let { id, class } = {
    id: "...",
    class: "..."
};
ThemeSwitcher({ id, class })
*/

function ThemeSwitcher({ changeThemeHandler, children }) {
    return (
        <button onClick={changeThemeHandler}>
            {children}
        </button>
    );
}

export default function App() {
    const [theme, setTheme] = useState("light");

    function changeTheme() {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    return (
        <div style={{
            backgroundColor: theme === "light" ? "#FFFFFF" : "#000000",
            color: theme === "light" ? "#000000" : "#FFFFFF",
            height: 500
        }}>
        {/* theme === "light" ? {backgroundColor: ...} : {backgroundColor: ...} */}
            <h1>Témaváltoztató</h1>
            <ThemeSwitcher 
                changeThemeHandler={changeTheme} 
            >
                {theme === "light" ? "Váltás sötét módra" : "Váltás világos módra"}
            </ThemeSwitcher>
        </div>
    );
}