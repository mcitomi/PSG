// user megnyom egy gombot -> random szám -> random idézet

import React, { useState } from "react";

const idezetek = [
    "Prédája maradtam egy szörnynek, ami halott régen",
    "Régen másokban kerestem önmagam Gondoltam biztos, hogy vár rám egy lelki társ De manapság magamban kutatok hátha Találok itt bent még valaki mást",
    "Tudom, a tudatom védi a lelkem, de hogy a jótól is elzár, azt folyton elfelejtem...",
    "Picsázni könnyű de a szerelem az nehéz És én remélem, hogy neked nem csak teher ez az egész",
    "Szívem szedd már össze magad\nFontos az, hogy egybe maradj\nHa mostanság rád nézek nem vagy te más\nCsak szilánkból több ezer darab",
    "Tudom, boldog emberek nincsenek Csak hormonok vannak és ingerek",
    "Ha elerednek könnyeim én csontjaimig ázok\nMert egy lyukas esernyő alatt egymagamban állok",
    "Tudod, nekem mindenem a humor, Mert mellkasomban nincsen szív, csak egy gyászoló tumor..",
    "A szívem nem fél a haláltól\nNem dobog, csak visszaszámol",
    "De kérlek vedd fel, most tényleg érzem\nHogy a sebhely felszakad vérzem és te talán értheted amit én nem"
];


export default () => {
    const [idezet, setIdezet] = useState("");

    const buttonStyle = {
        backgroundColor: "#007BFF",
        color: "#FFFFFF",
        borderRadius: "5px",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer"
    }

    return <>
        <h2>Random idézet generátor</h2>
        <p style={{ fontStyle: "italic", margin: "20px 0", color: "#333" }}>
            {!idezet ? "Kattintson a gombra egy Krúbi idézet generálásához" : idezet} 
        </p>
        <br/>
        <button style={buttonStyle} onClick={() => setIdezet(idezetek[Math.floor(Math.random() * idezetek.length)])}>
            Random idézet generálása
        </button>
    </>
}