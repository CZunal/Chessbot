import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Chessboard.css';
import { isValidMove } from '../Utils/ValidMoves'; // Adjust the path based on your file structure

function Chessboard({ initialPiecePositionsString }) {
    const [piecePositionsArray, setPiecePositionsArray] = useState(
        initialPiecePositionsString
            .trim()
            .split('\n')
            .map(row => row.trim().split(''))
    );

    const rowLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


    const [whiteAttackedSquares, setWhiteAttackedSquares] = useState([]);
    const [blackAttackedSquares, setBlackAttackedSquares] = useState([]);
    const handlePieceDragStart = (event, row, col) => {
        // Save the coordinates of the dragged piece in the data transfer
        event.dataTransfer.setData('text/plain', `${row},${col}`);
    };

    const handleSquareDragOver = event => {
        // Allow dropping on the square
        event.preventDefault();
    };


    const handleSquareDrop = (event, toRow, toCol) => {
        event.preventDefault();

        const [fromRow, fromCol] = event.dataTransfer.getData('text/plain').split(',');
        const piece = piecePositionsArray[fromRow][fromCol];

        if (isValidMove(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray)) {
            const newPiecePositions = piecePositionsArray.map(row => [...row]);
            newPiecePositions[toRow][toCol] = newPiecePositions[fromRow][fromCol];
            newPiecePositions[fromRow][fromCol] = '.';
            setPiecePositionsArray(newPiecePositions);
            return;
        }
        alert("The move is not valid");
    };

    const handleSquareClick = (row, col) => {
        // Implement logic to handle square clicks and update piece positions
        // For example, you can swap pieces, validate moves, etc.

        // Here's a simple example of how you might swap pieces on click
        const selectedPiece = piecePositionsArray[row][col];


    };

    const squares = [];

    // Loop to generate the 64 squares of the chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const squareColor = (row + col) % 2 === 0 ? 'white' : 'black';
            const piece = piecePositionsArray[row][col]; // Get the piece at the current position
            const square = (
                <div
                    key={`${row}-${col}`}
                    className={`square ${squareColor}`}
                    onClick={() => handleSquareClick(row, col)}
                    onDragOver={event => handleSquareDragOver(event)}
                    onDrop={event => handleSquareDrop(event, row, col)}
                >
                    {piece && (
                        <div
                            className={`piece ${piece}`}
                            draggable
                            onDragStart={event => handlePieceDragStart(event, row, col)}
                        ></div>
                    )}
                </div>
            );
            squares.push(square);
        }
    }

    return (
        <div className="chessboard-container">
            <div className="numbers-and-chessboard">
                <div className="numbers">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="number">
                            {8 - index}
                        </div>
                    ))}
                </div>
                <div className="chessboard-and-letters">
                    <div className="chessboard">
                        {squares}
                    </div>
                    <div className="letters">
                        {Array.from({ length: 8 }, (_, index) => (
                            <div key={index} className="letter">
                                {String.fromCharCode(65 + index)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

Chessboard.propTypes = {
    initialPiecePositionsString: PropTypes.string.isRequired,
};

export default Chessboard;
