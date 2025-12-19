import { useState } from "react";

export default () => {
    const pics = [
        "/pics/20230406_120615.jpg",
        "/pics/20241031_205634.jpg",
        "/pics/20241124_143634.jpg",
        "/pics/20241125_163058.jpg",
        "/pics/20250101_062143.jpg",
        "/pics/20250220_120654.jpg",
    ];

    const [picIndex, setPicIndex] = useState(0);

    function stepToNext() {
        if(picIndex + 1 >= pics.length) {
            setPicIndex(0);
        } else {
            setPicIndex(picIndex + 1);
        }
    }

    function stepToBack() {
        if(picIndex - 1 < 0) {
            setPicIndex(pics.length - 1);
        } else {
            setPicIndex(picIndex - 1);
        }
    }

    return (
        <>
            <img src={pics[picIndex]} alt="galéria" height={500}/>
            <br/>
            <button onClick={stepToBack}>Előző</button>
            <button onClick={stepToNext}>Következő</button>
        </>
    );
}