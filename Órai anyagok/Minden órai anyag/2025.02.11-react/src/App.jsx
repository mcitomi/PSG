import React, { useState } from "react";

function ProductCard({name, desc, price, onCLick}) {
    return <>
        <h2>{name}</h2>
        <p>{desc}</p>
        <b>{price}</b>
        <button onClick={onCLick}>Kosárba</button>
    </>
}

export default () => {
    const products = [
        {
            "name": "Póló",
            "desc": "Rövidujjú Nirvanás póló",
            "price": 8000
        },
        {
            "name": "Pulcsi",
            "desc": "Hosszúujjú Bulbasauros kapucnis pulcsi",
            "price": 15000
        },
        {
            "name": "Nadrág",
            "desc": "Kék farmernadrág",
            "price": 10000
        }
    ];

    const [cart, setCart] = useState([]);

    function addToCart(i) {
        let contains = false;
        for (const product of cart) {
            if(product.name === products[i].name) {
                contains = true;
            }
        }
        if(contains) {
            // newCart.splice(newCart.indexOf(products[i]), 1);
            let newCart = cart.filter(product => {
                return product.name !== products[i].name;
            });
            setCart(newCart);
        } else {
            let newCart = [...cart];
            newCart.push(products[i]);
            setCart(newCart);
        }
    }

    return <>
        <h1>Termékek</h1>
        {
            products.map((product, i) => {
                return <ProductCard name={product.name} desc={product.desc} price={product.price} onCLick={() => addToCart(i)}/>
            })
        }
        <h1>Kosár</h1>
        {
            cart.map(product => {
                return <ProductCard name={product.name} desc={product.desc} price={product.price} />
            })
        }
    </>
}