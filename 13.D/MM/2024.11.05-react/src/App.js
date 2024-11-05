function Square({ value }) {
    function handleClick() {
        console.log("katt");
    }

    return <button className="square" onClick={handleClick}>{ value }</button>;
}
// nem rakunk ()-et mögé mert akkor egybőlmeghívja, majd az onclick meghívja ha történik az esemény

export default function Board() {  // egy darab html elem visszaadása, egy html fragmentbe
    return ( 
        <>
            <div className="board-row">
                <Square value="1" />
                <Square value="1" />
                <Square value="1" />
            </div>
            <div className="board-row">
                <Square value="1" />
                <Square value="1" />
                <Square value="1" />
            </div>
            <div className="board-row">
                <Square value="1" />
                <Square value="1" />
                <Square value="1" />
            </div>  
        </>
    );
}
