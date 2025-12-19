import React, { useState, useEffect } from "react";

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // A useEffect segítsgével futtathatunk valamit, amikor megváltozik
    // az átadott "függőség", tehát:
    // useEffect(() => console.log("asd"), [data]);
    // Miután data változó megváltozik, akkor a console.log lefut.
    // Ezzel nem csak új dolgot rakhatunk ki az oldalra egy változás után,
    // hanem akár bármilyen más kódot futtathatunk.
    //
    // DE! most nekünk nem kell semmilyen változásra kötni, csak az kell,
    // hogy az oldal kirajzolása után fusson le valami. Ilyenkor:
    // useEffect(() => console.log("kirajzolva!", []);
    // nem adunk át semmilyen függőséget.
    //
    // Neve is onnan jön, hogy side effecteket, mellékhatásokat köthetünk
    // egy változáshoz.
    useEffect(() => {
        // useEffect-nek nem lehet async () => {}-at átadni.
        // Így kell megoldani ha async-et akarunk.
        async function fetchPosts() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                )

                if (!response.ok) {
                    throw new Error("Error fetching posts.");
                }

                const data = await response.json();

                setData(data.slice(0, 5)); // csak az első 5 elemet, hogy ne legyen
                                        // túl lassú
            } catch (err) {
                setError(err.message);
            }
        }

        fetchPosts();

        setLoading(false);
    }, []);

    // Ilyet még tudom nem mutattam, de lehet ilyet is:
    // if (loading) {
    //     return <p>Betöltés...</p>;
    // } else if (error) {
    //     return <p>Hiba...</p>;
    // } else {
    //     return (
    //         <>
    //             <h1>Posztok</h1>
    //             <ul>
    //                 {data.map((post) => {
    //                     return (
    //                         <li>
    //                             <h3>{post.title}</h3>
    //                             <p>{post.body}</p>
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         </>
    //     );
    // }

    // De ez csak akkor működik, ha az egész komponenst szeretnénk
    // megváltoztatni attól függően, hogy tölt, hiba van, vagy egyik sem.
    // Ha nem az egészet szeretnénk:
    return (
        <>
            <h1>Posztok</h1>

            {loading ? <p>Betöltés...</p> : ""}

            {error ? <p>Hiba...</p> : ""}

            {!loading && !error ? (
                <ul>
                    {data.map(post => (
                        <li>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            ) : ""}
        </>
    );
}
