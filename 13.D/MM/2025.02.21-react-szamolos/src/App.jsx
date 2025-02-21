import React, { useState } from "react";

export default () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <h2>Szám: {count}</h2>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
        </>
    );
};