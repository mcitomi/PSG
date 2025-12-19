import { Container, Col, Row } from "react-bootstrap";
import { useState } from "react";

import Product from "./components/Product";

import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
    {
        name: "Ablakmosó",
        desc: "Szép tisztára mos",
        price: 9000,
        imgUrl: "https://p1.akcdn.net/full/513316728.jp-teli-szelvedomoso-keszre-kevert-20-c-5lit.jpg"
    },
    {
        name: "Láncfűrész",
        desc: "Fát vág, vagy amit akarsz",
        price: 39000,
        imgUrl: "https://blackszerszam.hu/wp-content/uploads/2023/09/blacktools-benzinmotoros-lancfuresz-4.2HP-1.webp"
    },
    {
        name: "Billentyűzet",
        desc: "Olcso trust vagy hama markaju idk",
        price: 5999,
        imgUrl: "https://webaruhaz.ordogpapir.hu/upload_files/products/original_images/trb24149.jpg"
    },
    {
        name: "ASUS laptop i3 2015-ből",
        desc: "i3 5005u, 2mag, 4szal, 64bit, teljesitmeny (valahol de nem itt)",
        price: 79000,
        imgUrl: "https://p1.akcdn.net/full/521583816.asus-x540la-xx1309t.jpg"
    },
    {
        name: "Szimering",
        desc: "Poloba daninak",
        price: 2500,
        imgUrl: "https://www.ipararuhaz.hu/img/28874/96271/96271.webp"
    },
    {
        name: "Xixo barckos",
        desc: "Imadom szeretem legjobb meowmeowm alterlany drink amugy side note",
        price: 350,
        imgUrl: "https://www.spiritall.hu/img/92337/5999571052547/5999571052547.jpg"
    },
    {
        name: "HABOS BABOS",
        desc: "Dicső nevén kőbányai (jutalom a nap vegen)",
        price: 939,
        imgUrl: "https://gyongyszov.hu/wp-content/uploads/2023/05/ShotType1_540x540-4.jpg"
    },
    {
        name: "Vodicka 1L banger",
        desc: "Legjobb bebaszasi lehetoseg, shot alapanyag, létem eleme",
        price: 4690,
        imgUrl: "https://italkereso.hu/media/item/vodka/csevi/csevi-vodicka-vodka-izu-szeszesital-1l-xxl.jpeg"
    }
];

export default () => {
    const [cart, setCart] = useState([]);

    function addProductToCart(isAdd, name, desc, price, imgUrl) {
        let newCart = [...cart];

        const productObject = newCart.find(x => x.name == name);
       
        if(productObject) {
            if(isAdd) {
                productObject.db++;
            } else {
                if(productObject.db == 1) {
                    newCart.splice(newCart.indexOf(productObject), 1);
                } else {
                    productObject.db--;
                }
            }
            
        } else {
            newCart.push({
                name: name,
                desc: desc,
                price: price,
                db: 1,
                imgUrl: imgUrl
            });
        }
        console.log(newCart);
        
        setCart(newCart);
    }

    return <>
        <Container>
            <Row id="menu">
                <Col sm className="prods">
                    {products.map(product => {
                        return <Product name={product.name} desc={product.desc} price={product.price} addToCart={addProductToCart} db={null} imgUrl={product.imgUrl}/>
                    })}
                </Col>
                <Col sm id="cart">
                    {cart.map(product => {
                        return <Product name={product.name} desc={product.desc} price={product.price} addToCart={addProductToCart} db={product.db} imgUrl={product.imgUrl}/>
                    })}
                </Col>
            </Row>
        </Container>
    </>
}