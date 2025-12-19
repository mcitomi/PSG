import { useState } from "react";

function MyButton({ num }) {
    // let num = 1;
    return <input type="button" value={num} />;
}

function MyTextBox({ placeholder }) {
    return <input type="text" placeholder={placeholder} />;
}

function Card({ title, desc }) {
    return <>
        <h1>{title}</h1>
        <p>{desc}</p>
    </>

    // A <> egy üres elem "jsx töredék" ami nem látszódik, 
    // mint ha egyből a root-ba vagy szülő elembe raknánk az elemeket
}

export default () => {
    return <>
        <Card title="Billentyűzet" desc="Mechanikus Razer X4350 2020 Darker Edition" />
        

        <MyButton num="1" />
        <MyTextBox placeholder="Irj ide valamit" />

        {/* <img src="https://i.ytimg.com/vi/5v56YjZzH5A/maxresdefault.jpg" alt="chillguy.png" /> */}
    </>

}