<script>
    import * as ai from './ai.js';

    let board = emptyBoard();
    let turn = "X";
    let message = "X's turn";
    let freeze = false;

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

    async function playerSetSquare(i, j) {
        if (turn === "X" && setSquare(i, j)) {
            if (ai.isVictory(board)) {
                setVictory();
                return;
            }

            if (ai.isDraw(board)) {
                setDraw();
                return;
            }

            let move = ai.minimax(board)
            
            await new Promise(res => setTimeout(() => {
                setSquare(move.i, move.j);

                if (ai.isVictory(board)) {
                    setVictory();
                    return;
                }
            }, 500));
        }
    }

    function setVictory() {
        message = turn === "X" ? "Computer wins!" : "You win!";
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
            return true;
        }
        return false;
    }

    function reset() {
        board = emptyBoard();
        turn = "X";
        message = "X's turn";
        freeze = false;
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
