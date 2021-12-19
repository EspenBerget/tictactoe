
function* boardIterator() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            yield [i, j];
        }
    }
}

function* movesIterator(board) {
    for (let [i,j] of boardIterator()) {
        if (board[i][j] === "") {
            yield [i,j];
        }
    }
}

function transpose(board) {
    let board_t = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    for (let [i,j] of boardIterator()) {
        board_t[i][j] = board[j][i];
    }
    return board_t;
}

function isEqualDiagonals(board) {
    if (board[0][0] != "" && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
        return board[0][0];
    }

    if (board[2][0] != "" && (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
        return board[2][0];
    }

    return false;
}

function allEqual(row) {
    return row[0] != "" && (row[0] === row[1] && row[1] === row[2]);
}

function anyWinningRow(board) {
    for (let i = 0; i < 3; i++) {
        if (allEqual(board[i])) {
            return board[i][0];
        }
    }
    return false;
}

export function isVictory(board) {
    return anyWinningRow(board)
        || anyWinningRow(transpose(board))
        || isEqualDiagonals(board);
}

export function isDraw(board) {
    return movesIterator(board).next().done;
}

export function minimax(board, player = "O") {
    let winner = isVictory(board);
    if (winner) {
        return (winner === player) ? {score: 10} : {score: -10};
    } else if (isDraw(board)) {
        return {score: 0};
    }

    const allScores = [];
    let best;
    for (let [i,j] of movesIterator(board)) {
        const currentInfo = {i, j};

        board[i][j] = player;
        
        let res = minimax(board, player === "X" ? "O" : "X");
        currentInfo.score = res.score * -1; // if opponent is lost, this is a victory, so flip score

        board[i][j] = "";
        
        if (best === undefined) {
            best = currentInfo;
        } else if (best.score < currentInfo.score) {
            best = currentInfo;
        }
    }

    return best;
}
