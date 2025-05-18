import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";

export default () => {
    const [rangok, setRangok] = useState([]);

    async function fetchRangok() {
        try {
            const response = await fetch("http://localhost:3030/rangjaim", {
                headers: {
                    "authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Unable to fetch rangok");
            }

            const body = await response.json();
            
            setRangok(body.rangjaimx);
        } catch (error) {
            console.log(error);
            
            alert("Nem sikerült lekérdezni a rangokat")
        }
    }

    useEffect(() => {
        fetchRangok();
    }, []);

    return (
        <>
            <h1 className="m-3">Home</h1>
            {!rangok || rangok.length < 1 ? <h3 className="m-3 text-danger">Nincs rangod!</h3> :
            
                rangok.map((rang, i) => {
                    return <Card name={rang.name} color={rang.color} price={rang.price} key={i}/>
                })
            }
        </>
    )
}