import { Row, Col, Image } from "react-bootstrap";
export default function ({ name, desc, price, addToCart, db, imgUrl }) {
    return <div>
        <Row>
            <Col sm>
                <h3>{name}</h3>
                <p>{desc}</p>
                <b>{price} Ft.</b>
                {
                    !db
                        ?
                        <button onClick={() => addToCart(true, name, desc, price, imgUrl)}>Kosárhoz adás</button>
                        :
                        <p>Hozzáadva: {db} db. <button onClick={() => addToCart(false, name, desc, price, imgUrl)}>Egy törlése</button></p>

                }
            </Col>
            <Col sm>
                <Image src={imgUrl} width={150} rounded></Image>
            </Col>
        </Row>
    </div>
}