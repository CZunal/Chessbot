

//Can move 1 square in any direction
//Can't move to a direction that is threatened
//Can't take a piece that is protected
//Can do long and short rock
function isKingMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // King can move one square in any direction
    return rowDiff <= 1 && colDiff <= 1;
}

//Can move up or down
//Can't go beyond a piece if other piece is same color
function isRookMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Rook can move vertically or horizontally
    if ((rowDiff === 0 && colDiff !== 0) || (rowDiff !== 0 && colDiff === 0)) {
        const rowStep = rowDiff === 0 ? 0 : (toRow > fromRow ? 1 : -1);
        const colStep = colDiff === 0 ? 0 : (toCol > fromCol ? 1 : -1);

        let currentRow = parseInt(fromRow) + rowStep;
        let currentCol = parseInt(fromCol) + colStep;

        // Check each square along the vertical or horizontal path
        while (currentRow !== toRow || currentCol !== toCol) {
            if (piecePositionsArray[currentRow][currentCol] !== '.') {
                console.log("There is a piece blocking that path");
                return false; // There is a piece in the way
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true; // No pieces in the way
    }

    console.log("Not a valid rook movement");
    return false; // Not a valid vertical or horizontal movement
}


//Can move horizontally 
//Can't move to a horizontal block that is blocked by another piece
function isBishopMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Bishop can move diagonally
    if (rowDiff === colDiff) {
        // Determine the direction of movement along the rows and columns
        const rowStep = toRow > fromRow ? 1 : -1;
        const colStep = toCol > fromCol ? 1 : -1;

        let currentRow = parseInt(fromRow) + rowStep;
        let currentCol = parseInt(fromCol) + colStep;

        // Check each square along the diagonal path
        console.log("Current:", currentCol, "-", currentRow, " to:", toCol, "-", toRow);
        while (currentRow !== toRow && currentCol !== toCol) {
            if (piecePositionsArray[currentRow][currentCol] !== '.') {
                alert("There is a piece blocking that place");
                return false; // There is a piece in the way
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true; // No pieces in the way
    }

    return false; // Not a valid diagonal movement
}


//Can move in L shape
function isKnightMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Knight moves in an L-shape: 2 squares in one direction and 1 square in the other
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
        if (piecePositionsArray[toRow][toCol] === '.' || piecePositionsArray[toRow][toCol] !== piece) {
            return true; // Valid knight movement
        }
    }

    console.log("Not a valid knight movement");
    return false; // Not a valid L-shaped movement
}

function isSameCase(sourcePiece, destinationPiece) {
    const sourcePieceCase = sourcePiece === sourcePiece.toUpperCase() ? 'upper' : 'lower';
    const destinationPieceCase = destinationPiece === destinationPiece.toUpperCase() ? 'upper' : 'lower';
    return sourcePieceCase === destinationPieceCase;
}


function isBlackPawnMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) {
    const rowDiff = toRow - fromRow;
    const colDiff = Math.abs(toCol - fromCol);

    // Black pawns can move one square forward or two squares forward if in starting position
    if (rowDiff === 1 && colDiff === 0) {
        if (piecePositionsArray[toRow][toCol] === '.') {
            return true; // Valid pawn movement
        }
    } else if (fromRow === 1 && rowDiff === 2 && colDiff === 0) {
        if (piecePositionsArray[fromRow + 1][fromCol] === '.' && piecePositionsArray[toRow][toCol] === '.') {
            return true; // Valid pawn initial double-step movement
        }
    }

    // Black pawns can capture diagonally
    if (rowDiff === 1 && colDiff === 1) {
        if (piecePositionsArray[toRow][toCol] !== '.' && piecePositionsArray[toRow][toCol] !== piece) {
            return true; // Valid pawn capture
        }
    }

    console.log("Not a valid black pawn movement");
    return false;
}

function isWhitePawnMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) {
    const rowDiff = fromRow - toRow;
    const colDiff = Math.abs(toCol - fromCol);

    // White pawns can move one square forward or two squares forward if in starting position
    if (rowDiff === 1 && colDiff === 0) {
        if (piecePositionsArray[toRow][toCol] === '.') {
            return true; // Valid pawn movement
        }
    } else if (fromRow === 6 && rowDiff === 2 && colDiff === 0) {
        if (piecePositionsArray[fromRow - 1][fromCol] === '.' && piecePositionsArray[toRow][toCol] === '.') {
            return true; // Valid pawn initial double-step movement
        }
    }

    // White pawns can capture diagonally
    if (rowDiff === 1 && colDiff === 1) {
        if (piecePositionsArray[toRow][toCol] !== '.' && piecePositionsArray[toRow][toCol] !== piece) {
            return true; // Valid pawn capture
        }
    }

    console.log("Not a valid white pawn movement");
    return false;
}


export const isValidMove = (piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) => {
// Implement rules for each piece type here
// Return true if the move is valid, otherwise false

    const sourcePiece = piecePositionsArray[fromRow][fromCol];
    const destinationPiece = piecePositionsArray[toRow][toCol];

    if(destinationPiece === '.' ||  !isSameCase(sourcePiece, destinationPiece))
    {
        switch (piece.toLowerCase()) {
            case 'k':
                // Implement rules for King's movement to neighboring squares
                return isKingMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray);
            case 'r':
                // Implement rules for Rook's movement along rows/columns
                return isRookMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray);
            case 'b':
                // Implement rules for Bishop's diagonal movement
                return isBishopMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray);
            case 'q':
                // Implement rules for Queen's combined Rook and Bishop movement
                return isBishopMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray) || isRookMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray);
            case 'n':
                // Implement rules for Knight's L-shaped movement
                return (isKnightMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray));
            case 'p':
                // Implement rules for Pawn's forward movement
                // This might depend on the color of the piece and if it's capturing
                
                if(piece === 'p'){
                    return isBlackPawnMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray); // Replace with your logic

                }else{
                    return isWhitePawnMoveValid(piece, fromRow, fromCol, toRow, toCol, piecePositionsArray); // Replace with your logic
                }
            default:
                return false;
        }
    }


};