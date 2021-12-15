<script>
    let board = emptyBoard();
    let turn = "X";
    let message = "X's turn";

    function emptyBoard() {
        return [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
    }

    function nextTurn() {
        if (turn == "X") 
            turn = "O";
        else if (turn == "O")
            turn = "X";
        message = turn + "'s turn";            
    }


    function setSquare(i, j) {
        if (board[i][j] == "") {
            board[i][j] = turn;
            if (isVictory(board)) {
                message = turn + " won!";
                return;
            }
            nextTurn();
        }
    }

    function reset() {
        board = emptyBoard();
        turn = "X";
        message = "X's turn";
    }

    function transpos(board) {
        let board_t = emptyBoard();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board_t[i][j] = board[j][i];
            }
        }
        return board_t;
    }

    function equalLeftDiag(board) {
        return board[0][0] != "" && (board[0][0] === board[1][1] && board[1][1] === board[2][2]);
    }

    function equalRightDiag(board) {
        return board[2][0] != "" && (board[0][2] === board[1][1] && board[1][1] === board[2][0]);
    }

    function allEqual(row) {
        return row[0] != "" && (row[0] === row[1] && row[1] === row[2]);
    }

    function anyWinningRow(board) {
        for (let i = 0; i < 3; i++) {
            if (allEqual(board[i])) {
                return true;
            }
        }
        return false;
    }

    function isVictory() {
        return anyWinningRow(board)
            || anyWinningRow(transpos(board))
            || equalRightDiag(board)
            || equalLeftDiag(board);
    }

</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    #board {
        height: 50vh;
        width: 50vh;

        display: inline-grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;

        background-color: #e0bb95;
    }

    .square {
        border: 2px solid black;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 3rem;
        font-family: Helvetica, sans-serif;
    }

    button {
        margin-top: 1rem;
    }
    
</style>

<div class="container">
    <h1>{message}</h1>
    <div id="board">
        {#each board as row, i}
            {#each row as square, j}
            <div class="square" on:click={() => setSquare(i,j)}>{board[i][j]}</div>
            {/each}
        {/each}
    </div>
    <button on:click={reset}>Reset</button>
</div>
