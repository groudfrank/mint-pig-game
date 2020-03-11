document.addEventListener("DOMContentLoaded", function(){

// DOM variables
var rollDiceBtn, dice, holdBtn, numericalDiceValue, playerBox, 
    playerOneGlobalScore, playerTwoGlobalScore, playerGlobalScore,
    newGameBtn;

rollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
holdBtn = document.getElementById('hold-btn');
numericalDiceValue = document.getElementById('numerical-dice-value');
playerBox = document.querySelectorAll('.player-box');
player1Box = playerBox[0].querySelector('.player-global-score');
player2Box = playerBox[1].querySelector('.player-global-score');
playerOneGlobalScore = document.getElementById('player1-global-score');
playerTwoGlobalScore = document.getElementById('player2-global-score');
playerGlobalScore = document.querySelectorAll('player-global-score');
newGameBtn = document.getElementById('new-game-btn');

// Regular variables
var rollValue, roundScore, numToWord, maxGlobalScore;
rollValue = 0;
roundScore = 0;
numToWord = "";
maxGlobalScore = 100;
var diceValues = {
    1:'one',
    2:'two', 
    3:'three',
    4:'four',
    5:'five',
    6:'six'
};

visibilityToggle();

// Puts an indicating icon that reveals who the current player is
// based on which player side currently has the 'is-active-player class.
// By default Player 1 is the active player when the page loads. 
// It is mean to work specifically with the activePlayerToggle function, 
// as a callback function. After the active status of a player changes 
// due to activePlayerToggle, visibilityToggle will then make the active
// player indicator visible.
function visibilityToggle(){
    playerBox.forEach(function(node){
        if(node.classList.contains('is-active-player') == true){
            node.querySelector('.active-player-indicator').classList.remove('hide-me');
        } else{
            node.querySelector('.active-player-indicator').classList.add('hide-me');
        }
    });
}

function activePlayerToggle(callback){
    playerBox.forEach(function(node){
        if(node.classList.contains('is-active-player') == true){
            node.classList.remove('is-active-player');
        } else{
            node.classList.add('is-active-player');
        }
        callback();
    });
}

function changeDice(number){
    numToWord = diceValues[number];
    dice.className = "fas fa-dice-" + numToWord;
    numericalDiceValue.innerHTML = number;
}

newGameBtn.addEventListener('click', function(){
    playerOneGlobalScore.innerHTML = 0;
    playerTwoGlobalScore.innerHTML = 0;
    numericalDiceValue.innerHTML = '∞';
    dice.className = 'fas fa-dice';
    // alert('clicked');
})

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);

    var activePlayerFlag = false;
    var activeStatus = "";
    var currentRoundScore;

    // checks the global score
    // Also learned a little trick for converting a string to a number. Prepend the plus symbol.
    player1GlobalScore = +playerBox[0].querySelector('.player-global-score').innerHTML;
    player2GlobalScore = +playerBox[1].querySelector('.player-global-score').innerHTML;

    playerBox.forEach(function(node){
       activeStatus = node.classList.contains('is-active-player');
       currentRoundScore = node.querySelector('.player-current-round-score');

       if(activeStatus == true){ // locks score changes to the current player class elements
            if(rollValue != 1){
                roundScore += rollValue;
                currentRoundScore.innerHTML = roundScore;
                scoreCheckFlag = true;
            }
            else{
                roundScore = 0;
                currentRoundScore.innerHTML = roundScore;
                activePlayerFlag = true; 
                // For some reason trying at call activePLayerToogle() here causes issues
                // when ran inside the forEach loop so I've added a var called functCallFag
                // which acts as a flag for whether or not activePlayerToogle() should be called.
                // An if statement outside the loop will check the value of of cuntCallFlag and 
                // determine whether or not activePLayerToggle() should be called/               
            }
       }

            
    });

    if(activePlayerFlag == true){activePlayerToggle(visibilityToggle);}

});
 
var MutationCallback = (node) =>{
    var tally = parseInt(node.innerHTML, 10);

    if(tally >= 20){
        alert("A high score reached!");
    }
}

var MutationConfig = {childList: true}
var PlayerOneObserver = new MutationObserver(() => {MutationCallback(playerOneGlobalScore);});
var PlayerTwoObserver = new MutationObserver(() => {MutationCallback(playerTwoGlobalScore);});
PlayerOneObserver.observe(playerOneGlobalScore, MutationConfig);
PlayerTwoObserver.observe(playerTwoGlobalScore, MutationConfig);

holdBtn.addEventListener('click', function(){
    var activeStatus, globalTotal;
    activeStatus = "";
    playerBox.forEach(function(node){
        activeStatus = node.classList.contains('is-active-player');
        var currentRoundScore = node.querySelector('.player-current-round-score');
        globalTotal = node.querySelector('.player-global-score');
        if(activeStatus == true){
            globalTotal.innerHTML = parseInt(globalTotal.innerHTML) + roundScore;
            roundScore = 0;
            currentRoundScore.innerHTML = 0;
        }
     });
     activePlayerToggle(visibilityToggle);   
});

});
