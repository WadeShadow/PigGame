/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




let globalScore, roundScore, activePlayer, currentScore, gameState;

init();

currentScore = document.querySelector("#current-" + activePlayer);


document.querySelector('.dice').style.display = 'none'; //Make dice image invisible untill we start a game

document.getElementById('score-0').textContent = "0";
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector(".btn-roll").addEventListener("click", function () {

    if (globalScore) {
        //1. Get a random number

        let dice = Math.floor(Math.random() * 6 + 1);

        //2.Display the result
        let selectedDice = document.querySelector('.dice');
        selectedDice.src = `dice-` + dice + `.png`;
        selectedDice.style.display = 'block';

        //3.Update the score IF rolled num wasn't 1

        if (dice === 1) {
            //Shift control and zero out current counter

            changePlayer();
            return;
        }

        // Add result to current player's counter
        roundScore += dice;
        currentScore.textContent = roundScore;
    }


});


document.querySelector(`.btn-hold`).addEventListener("click", function () {
    //Add CURRENT score to the GLOBAL score
    if (globalScore) {
        globalScore[activePlayer] += roundScore;

        //Update the User Interface
        document.getElementById("score-" + activePlayer).textContent = globalScore[activePlayer];

        if (globalScore[activePlayer] >= 100) {

            //Disabling the game activity
            document.querySelector(".dice").style.display = "none";
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

            document.getElementById("name-" + activePlayer).textContent = "WINNER";

            gameState = false;
        } else changePlayer();
    }


});



document.querySelector(`.btn-new`).addEventListener("click", function () {
    // Refresh game state

    init();


    //Update UI
    document.getElementById("name-0").textContent = "PLAYER 1";
    document.getElementById("name-1").textContent = "PLAYER 2";

    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.add('active');

    document.querySelector('.dice').style.display = 'none';

    currentScore.textContent = "0";
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = '0';
    currentScore = document.querySelector("#current-0");
})




// ==========================Ancillary functions==========================
function changePlayer() {
    document.querySelector('.dice').style.display = 'none';
    roundScore = 0;
    currentScore.textContent = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    if (activePlayer == 1) {
        activePlayer = 0;

    } else {
        activePlayer = 1;
    }
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');

    currentScore = document.querySelector("#current-" + activePlayer);

}

function init() {
    globalScore = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true;
}