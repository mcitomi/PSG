import { useState } from "react";

function User({name, age, classroom}) {
    const [text, setText] = useState("Üzenet küldése");     // a state használatakor rendereljük újra az oldalt mikor az érték változik

    function sendMessage() {
        if(text != "Üzenet visszavonása") {
            alert(`Üzenet elküldve ${name} diáknak`);
            setText("Üzenet visszavonása");
        } else {
            alert(`Üzenet visszavonva ${name} diáktól`);
            setText("Üzenet küldése");
        }
    }

    return <>
        <h3>Név: {name}</h3>
        <p>Kor: {age}</p>
        <p>Osztály: {classroom}</p>
        <input type="button" value={text} onClick={sendMessage} />
    </>
}

const users = [
    {name: "Betti", age: "15", classroom: "13D"},
    {name: "Decsi", age: "25", classroom: "E2"},
    {name: "Ricsi", age: "31", classroom: "Börtön"},
    {name: "Máté", age: "21", classroom: "Az összes"}
];


function Number() {
    const [numValue, setNumValue] = useState(1);

    function adjustValue() {
        
    }

}

export default () => {
    return <>
        {users.map(x => <User name={x.name} age={x.age} classroom={x.classroom}/>)}
    </>
}
