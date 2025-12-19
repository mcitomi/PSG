import React, { useState } from "react";

const quotes = [
    "És ott a gólhelyzet! És a gól! És a gól! Szalai! Vezet Magyarország! 550 nap után, be lehet azt piszkálni, pöckölni, tuszkolni! Egy ide!",
    "És Fiola kapura tör, kapura tör, Fityó! Gól! Gól! Fiola Attila góljával vezetünk a világbajnok ellen!",
    "Schafer. Szalai. Schafer irányába. Schafer! Schafer! Gól! Gól! Hát nem egy-egy! Milyen egy-egy! Kettő-egy! Gyorsan jön a válasz!",
    "Dobálózás a közepette, Szoboszlai a rövid sarok felé, Szalai Ádám! Gól! Gól! Tizenhetedik perc, Szalai Ádám a huszonhatodik gólját szerzi a magyar válogatottban.",
    "Nagy Ádám, kiugratási kisérlet. Gazdag gólhelyzetben. Ott a negyedik!"
];

export default function App() {
    const [quote, setQuote] = useState("");

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }

    const quoteStyle = {
        fontStyle: "italic",
        margin: "20px 0",
        color: "#333",
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <>
            <h2>Random idézet generátor</h2>
            <div style={quoteStyle}>
                {quote ? quote : "Kattinston a gombra egy idézet generálásáért."}
            </div>
            <button onClick={getRandomQuote} style={buttonStyle}>
                Random idézet generálása
            </button>
        </>
    );
}
