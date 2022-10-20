let winner = ''
round = 0
let Players = [
    {
        Player: "X"
    },
    {
        Player: "O"
    }
]


const gameBoard = document.querySelectorAll('.game-board li')
const gameMssg = document.querySelector("#game-mssg")
const restartButton = document.querySelector('#restart')
gameBoard.forEach(li => {
    li.addEventListener('click', () => {


        Game.startGame(li);
        Game.displayMssg();
        Condition.checkWinner("X");
        Condition.checkWinner("O");
        Condition.winnerModal();

    })

})

restartButton.addEventListener('click', () => {
    Game.resartGame()
})

const Game = (() => {
    let currentplayer = 0


    const changePlayer = () => {
        if (!currentplayer) {
            currentplayer = 1

        }
        else {
            currentplayer = 0
        }
        round++
    }
    const displayMssg = () => {

        changePlayer()
        gameMssg.innerHTML = `Player ${Players[currentplayer].Player}'s turn`
    }
    const startGame = (li) => {
        if (li.innerHTML) {
            changePlayer()
            return;
        }
        console.log(winner)
        if (winner) {
            return
        }

        li.innerHTML = `${Players[currentplayer].Player}`
    };
    const resartGame = () => {
        gameBoard.forEach(li => {
            li.innerHTML = '';
            round = 0
            winner = ''
            gameMssg.innerHTML = `Player X's turn`

        })
    }


    return { startGame, displayMssg, resartGame };

})();

const Condition = (() => {

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = (sign) => {
        for (let i = 0; i < winConditions.length; i++) {
            let perk = 0;
            for (let j = 0; j < 3; j++) {
                // console.log(perk)
                if (document.getElementById(`${winConditions[i][j]}`).innerHTML === sign) {
                    perk++
                }
            }
            // console.log(sign)
            if (perk === 3) {
                winner = sign;
                break;

            }
        }
    };

    const winnerModal = () => {
        if (winner) {

            gameMssg.innerHTML = `Player ${winner} win game`;
            return
        }
        else if (round === 9) {
            gameMssg.innerHTML = `The game is draw`;
        }

    }


    return { checkWinner, winnerModal };

})();