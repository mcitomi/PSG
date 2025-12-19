function ProductCard({name, desc, price}) {
    return <>
        <h1>{name}</h1>
        <p>{desc}</p>
        <b>{price} Ft</b>
    </>
}

export default () => {
    // Ezt a tömböt alapvetően a szerverről kérnénkle fetch-el
    const products = [
        {
            name: "Katalizátor",
            desc: "Semmire nem jó, drága, lopják a cigányok",
            price: 120000
        },
        {
            name: "Szélvédő",
            desc: "Ki látsz vele a kocsiból és nem megy tele az arcod bogarakkal",
            price: 60000
        },
        {
            name: "Küszöb",
            desc: "Gyorsan elrohad, purhabbal ki lehet nyomni",
            price: 100000
        }
    ];

    return (
        <>
            <h1>Termékek</h1>
            
            {products.map(product => {
                return <ProductCard name={product.name} desc={product.desc} price={product.price} />
            })}
        </>
        // csak kifejezéseket lehet {} közé írni reactban
    );
}