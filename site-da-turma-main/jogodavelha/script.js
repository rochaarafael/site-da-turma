const board = document.getElementById("board")
const result = document.getElementById("result")
const resetButton = document.getElementById("reset")

let currentPlayer = "X";
let moves = 0;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkwinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];

        }
    }

    if (moves === 9) {
        return "draw";
    }

    return null;
}

function updateBoard() {
    for (let i = 0; i < 9; i++) {
        const casa = document.createElement("div");
        casa.classList.add("casa");
        casa.dataset.index = i;
        casa.textContent = gameBoard[i];
        board.appendChild(casa);
        
        casa.addEventListener("click", () => {
            if(!casa.textContent && !result.textContent) {
                casa.textContent =  currentPlayer;
                gameBoard[i] = currentPlayer;
                moves++;
                const winner = checkwinner();
                
                if (winner) {
                    if (winner === "draw") {
                        result.textContent = "Empate!";
                    } else {
                        result.textContent = `O jogador ${winner} venceu!`;
                    }
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    }
}

updateBoard();
resetButton.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X"
    moves = 0;
    result.textContent = "";
    board.innerHTML = "";
    updateBoard();
})