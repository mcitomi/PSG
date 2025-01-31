import React, { useState } from "react";

export default () => {

    const tyukPath = "/imgs/tyuk/tyuk.jpg";  // relativan a "public" mappához képest nézi az elérési utat
    const sultPath = "/imgs/tyuk/sult.jpg";

    const [isTyuk, setIsTyuk] = useState(true);


 
    return <>
        <h2>Kép cserelgető</h2>

        <img src={isTyuk ? tyukPath : sultPath} style={{width: "400px"}} onClick={() => setIsTyuk(!isTyuk)}/>
        {/* {
        Kattintás után megváltoztatja az isTyuk-ot az ellentétes bool értékre, 
        és újra renderel mivel state változás történt, így könnyen megjelenitheto a másik kép
        } */}

        
    </>
}