import React, { useState } from "react";

export default () => {
    const names = [
        "Milán",
        "Krisz1",
        "Laci",
        "Beni",
        "Krisz2",
        "Olivér",
        "Máté",
        "Luca",
        "Petra",
        "József",
        "Joci",
        "László",
        "Botond"
    ];

    const [query, setQuery] = useState("");

    function changeQuery(event) {
        let newQuery = event.target.value;
        setQuery(newQuery);
    }

    return (
        <>
            <h2>Név kereső</h2>
            <input type="text" onChange={changeQuery}/>
            <ul>
                {
                    names.map(name => {
                        return <li style={{ opacity: name.toLowerCase().includes(query.toLowerCase()) ? 1.0 : 0.3 }}>{name}</li>
                    })
                }
            </ul>
        </>
    );
};