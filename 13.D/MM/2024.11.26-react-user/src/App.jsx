function User({name, age, classroom}) {
    return <>
        <h3>Név: {name}</h3>
        <p>Kor: {age}</p>
        <p>Osztály: {classroom}</p>
        <button>Üzenetküldés</button>
    </>
}

const users = [
    {name: "Betti", age: "15", classroom: "13D"},
    {name: "Decsi", age: "25", classroom: "E2"},
    {name: "Ricsi", age: "31", classroom: "Börtön"},
    {name: "Máté", age: "21", classroom: "Az összes"}
];

export default () => {
    return <>
        {users.map(x => <User name={x.name} age={x.age} classroom={x.classroom}/>)}
    </>
}
