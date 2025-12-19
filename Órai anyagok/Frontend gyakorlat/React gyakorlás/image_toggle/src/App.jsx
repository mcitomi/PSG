import React, { useState } from "react";
/*
const response = {

};
*/
export default function App() {
    const catImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Female_bengal_cat_outdoor.jpg/1200px-Female_bengal_cat_outdoor.jpg";
    const dogImage = "https://dogx.hu/wp-content/uploads/2022/07/Melyik-kutya-nem-szokik-Szokesre-alig-hajlamos-kutyafajtak.jpg";

    const [image, setImage] = useState(1);
    // 1 = cica
    // 2 = kutya

    function changeImage() {
        if (image === 1) {
            setImage(2);
        } else if (image === 2) {
            setImage(1);
        }
    }

    return (
        <>
            <h2>Kép cserélő</h2>
            {/* style="width: 100px" ====> style={{width: "100px"}} */}
            <img src={image === 1 ? catImage : dogImage} style={{width: image === 2 ? 250 : 200}}></img>
            {/*
                if (image === 1) {
                    catImage
                } else {
                    dogImage
                }
                image === 1 ? catImage : image === 2 ? dogImage : boberImage
                     if       {    } else    if         {  }  else  {  }
             */}
            <button onClick={changeImage}>{image === 1 ? "Kutya megjelenítése" : "Cica megjelenítése"}</button>
            {/*
                if (image === 1) {
                    "Kutya megjelenítése"
                } else {
                    "Cica megjelenítése"
                }
             */}
        </>
    );
}