import { useState } from "react";

function Square({ value, onSquareClick }) {

    return <button className="square" onClick={onSquareClick}>{value}</button>;
}
// nem rakunk ()-et mögé mert akkor egybőlmeghívja, majd az onclick meghívja ha történik az esemény

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];
        
        if (squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export function Board({ xIsNext, squares, onPlay }) {  // egy darab html elem visszaadása, egy html fragmentbe, komponens
    function handleSquareClick(i) {
        if (squares[i] !== null || calculateWinner(squares)) {
            return;
        }

        let nextSquares = [...squares];     // "felsorolja" a tömb minden elemét egymás mellé rakva
        // let nextSquares = squares.slice();   - így a slice lemásolja minden elemét, de ezt én csak "vágásra" használom

        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);

    let status;
    if (winner) {
        status = `Győztes: ${winner}`;
    } else {
        status = `Következő játékos: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    onSquareClick={function () {
                        handleSquareClick(0)
                    }}
                />
                <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function jumpTo(move) {
        setXIsNext(move % 2 == 0);
        setCurrentMove(move);
    }

    function handlePlay(nextSquares) {
        const prevMoves = history.slice(0, currentMove + 1);
        prevMoves.push(nextSquares);

        setHistory(prevMoves);
        setXIsNext(!xIsNext);
        setCurrentMove(prevMoves.length - 1);
    }

    let moves = [];

    for (let i = 0; i < history.length; i++) {
        let desc;

        if (i == 0) {
            desc = "Go to start";
        } else {
            desc = `Go to move ${i}`;
        }

        moves.push(<li><button onClick={() => {jumpTo(i)}}>{desc}</button></li>);
    }

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> {/* Az onPlay az átadott név és annak az értéke a handlePlay */}
                </div>
            </div>
            <div className="game-info">
                <ol>
                    {moves}
                </ol>
            </div>
        </>
    )   // jsx = html js-ben.
}