import React, { useState } from "react";

export default function App() {
    const [names] = useState(["Alice", "Bob", "Charlie", "Diana", "Edward"]);

    const [query, setQuery] = useState("");

    function handleSearchChange(event) {
        setQuery(event.target.value);
    }

    return (
        <>
            <h2>Name Search</h2>
            <input
                type="text"
                placeholder="Search names..."
                value={query}
                onChange={handleSearchChange}
                style={{
                    padding: "8px",
                    fontSize: "16px",
                    marginBottom: "20px",
                    width: "100%",
                }}
            />
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {names.map((name) => {
                    const isMatching = name.includes(query);
                    return (
                        <li
                            style={{
                                padding: "8px",
                                fontSize: "18px",
                                opacity: isMatching ? 1 : 0.3,
                            }}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
