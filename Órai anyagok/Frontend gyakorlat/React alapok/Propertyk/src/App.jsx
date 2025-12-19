// Csínáljatok egy komponenst, ami egy szövegdobozt ad vissza,
// és változóban van elmentve, hogy mi a placeholder szöveg.
// Neve mondjuk legyen MyTextBox.
// Kérje be propertyként a placeholder szöveget és azt jelenítse
// meg.
function MyTextBox({ placeholder }) {
    return <input type="text" placeholder={placeholder} />;
}

function MyButton({ num }) {
    return <input type="button" value={num} />;
}

function Card({ title, description }) {
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
            <MyButton num="10" />
            <MyTextBox placeholder="Felhasználónév" />
        </>
    );
}

export default function App() {
    return (
        <>
            <Card 
                title="Egér" 
                description="Modern egér." 
            />
            <Card 
                title="Monitor" 
                description="Nagy felbontású monitor." 
            />
        </>
    );
}