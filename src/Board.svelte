<script>
    import * as ai from './ai.js';

    let board = emptyBoard();
    let turn = "X";
    let message = "X's turn";
    let freeze = false;
    let movesLeft = 9;

    const aiStartTree = ai.init();
    let aiOptions = aiStartTree;

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

    function playerSetSquare(i, j) {
        if (turn === "X") {
            setSquare(i, j);
            if (ai.isVictory(board)) {
                setVictory();
                return;
            }
            if (movesLeft === 0) {
                setDraw();
                return;
            }
            aiOptions = ai.getOpponentMove(aiOptions, i, j).nextMoves;
            let [move, nextMoves] = ai.selectBest(aiOptions);
            aiOptions = nextMoves;
            setSquare(move[0], move[1]);
            if (ai.isVictory(board)) {
                setVictory();
                return;
            }
        }
    }

    function setVictory() {
        message = (turn === "X" ? "O" : "X") + " won!";
        freeze = true;
        return;
    }

    function setDraw() {
        message = "It's a draw.";
        freeze = true;
    }

    function setSquare(i, j) {
        if (board[i][j] == "" && !freeze) {
            board[i][j] = turn;
            nextTurn();
            movesLeft--;
        }
    }

    function reset() {
        board = emptyBoard();
        turn = "X";
        message = "X's turn";
        freeze = false;
        movesLeft = 9;
        aiOptions = aiStartTree;
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
            <div class="square" on:click={() => playerSetSquare(i,j)}>{board[i][j]}</div>
            {/each}
        {/each}
    </div>
    <button on:click={reset}>Reset</button>
</div>
