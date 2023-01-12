let winner = ''
let round = 0
let Players = [
    {
        Player: "X"
    },
    {
        Player: "O"
    }
]

//accessing html elements
const gameBoard = document.querySelectorAll('.game-board li')
const gameMssg = document.querySelector("#game-mssg")
const restartButton = document.querySelector('#restart')


gameBoard.forEach(li => {
    li.addEventListener('click', () => {

        // all the logic for game

            //to check that the move are not repeted and cause bugs
            if (li.innerHTML) {


                return;
            }
            //for starting and giving data to variables
            Game.startGame(li);

            //to display mssg after an event
            Game.displayMssg();

            //to check whether the winner is found or not 

                //for X
                Condition.checkWinner("X");

                //for O
                Condition.checkWinner("O");

            //logic of what to do and show after the winner is found    
            Condition.winnerModal();

    })

})

restartButton.addEventListener('click', () => {
    Game.resartGame()
})

const Game = (() => {
    //initilizing player
    let currentplayer = 0

    // logic gor player Change
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
            let perk = 0;       // an helping variable for checking content of all 3 indexes
            for (let j = 0; j < 3; j++) {
                // console.log(perk)
                if (document.getElementById(`${winConditions[i][j]}`).innerHTML === sign) {
                    perk++
                }
            }
            // console.log(sign)
            
            if (perk === 3) {               // if all indexes have same singn "O" or "X"
                winner = sign;
                break;

            }
        }
    };

    const winnerModal = () => {
        //displaying final messaage
            if (winner) {
                gameMssg.innerHTML = `Player ${winner} win the game🍗`;
                return
            }
            else if (round === 9) {
                gameMssg.innerHTML = `The game is draw😐`;
            }

    }


    return { checkWinner, winnerModal };

})();