import React, { useState } from "react";

export default () => {
    const [isDark, toggleDarkmode] = useState(true);

    function Gomb({children}) {
        return <>
            <button style={
                {
                    width: 200,
                    height: 50
                }
            } onClick={() => toggleDarkmode(!isDark)}>{children}</button>
        </>
    }

    return <>
        <div style={
            {
                width: "100vw",
                height: "100vh",
                backgroundColor: isDark ? "#111" : "white",
                color: isDark ? "white" : "black"
            }
        }>
            <Gomb>Meow!</Gomb>
            <h1>szia</h1>
        </div>
    </>
}