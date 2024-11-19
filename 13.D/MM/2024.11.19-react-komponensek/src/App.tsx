import React, { useState } from "react";

function MyButton({alertText, handleHover}) {
    function handleClick() {
        alert(alertText);
    }

    return <button onClick={handleClick} onMouseEnter={handleHover}>{alertText}</button>;
}

export default function Main() {
    // let [message, editMessage] = useState("Meow!");
    // setTimeout(() => {
    //     if(message == "Meow!") {
    //         editMessage("Szia!");
    //     } else {
    //         editMessage("Meow!");
    //     }
    // }, 1000);

    function buttonHover() {
        console.log("HOVER");
        
    }

    return (
        <>
            <h1>Hello!</h1>
            <MyButton alertText="Kattintva a gomb" handleHover={buttonHover} ></MyButton>
            <MyButton alertText="Kattintva a gomb 2!" handleHover={buttonHover}></MyButton>
        </>
    )
}