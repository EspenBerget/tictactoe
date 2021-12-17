
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


function minimax(board, player = "O") {
    let options = [];
    let optimal = 0;
    for (let [i,j] of movesIterator(board)) {
        let score = 0;
        let nextMoves = [];

        board[i][j] = player;

        let winner = isVictory(board);
        if (winner) {
            if (player === "X") {
                score = 1;
                optimal = 1;
            } else {
                score = -1;
                optimal = -1;
            } 
        } else {
            [nextMoves, score] = minimax(board, player === "X" ? "O" : "X");
        }

        options.push({
            move: [i,j],
            score,
            nextMoves
        });

        board[i][j] = "";
    }

    return [options, optimal];
}


export function selectBest(options) {
    if (options === undefined) {
        console.error("Fuck!");
        return;
    }
    if (options.length === 0) {
        console.log("here", options);
        return;
    }
    let best = options[0];
    for (let e of options) {
        if (e.score > best.score) {
            best = e;
        }
    }
    return [best.move, best.nextMoves];
}

export function getOpponentMove(options, i, j) {
    for (let e of options) {
        if (e.move[0] === i && e.move[1] === j) {
            return e;
        }
    }
}

export function init() {
    return minimax(initialBoard)[0];
}

const initialBoard = [
    ["","",""],
    ["","",""],
    ["","",""]
];


function rep(char, depth) {
    for (let i = 0; i < depth; i++) {
        char += char;
    }
    return char;
}

function printTree(options, depth=0) {
    for (let tree of options) {
        console.log(rep('-', depth), "move", tree.move, "score:", tree.score);
        printTree(tree.nextMoves, depth+1);
    }
}

//printTree(maximum(example0)[0]);
