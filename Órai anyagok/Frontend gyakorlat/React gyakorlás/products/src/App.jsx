// <ProductCard name=... description=... price=... />
function ProductCard({ name, description, price }) {
    return (
        <>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price} Ft</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.830267239312!2d20.367598075611475!3d47.92032156626218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47408dc7723c5519%3A0xddae2a8260e33590!2sEger%2C%20II.%20R%C3%A1k%C3%B3czi%20Ferenc%20u.%2060%2C%203300!5e0!3m2!1shu!2shu!4v1738664645111!5m2!1shu!2shu" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </>  
    );
}

export default function App() {
    // fetch()-el szerverről kapjuk meg
    const products = [
        {
            "name": "Katalizátor",
            "description": "Semmire nem jó, de drágán el lehet adni.",
            "price": 120000
        },
        {
            "name": "Szélvédő",
            "description": "Ki látsz a kocsiból vele.",
            "price": 60000
        },
        {
            "name": "Küszöb",
            "description": "Gyorsan rozsdásodik, purhabbal ki lehet nyomni.",
            "price": 100000
        }
    ];

    return (
        <>
            <h1>Termékek</h1>
            {products.map((product) => {
                return <ProductCard 
                    name={product.name} 
                    description={product.description} 
                    price={product.price}
                />;
            })}
            {/*
                csak kifejezéseket lehet írni {} közé reactban
                for (const product in products) {
                    <h1>{product.name}</h1>
                }
                ===
                products.map((product) => {
                    <h1>{product.name}</h1>    
                })
            */}
        </>
    );
}