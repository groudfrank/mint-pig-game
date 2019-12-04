document.addEventListener("DOMContentLoaded", function(){

//DOM variables
var rollDiceBtn, dice, holdBtn, numericalDiceValue, playerBox, playerGlobalScore, player1Box, player2Box;

rollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
holdBtn = document.getElementById('hold-btn');
numericalDiceValue = document.getElementById('numerical-dice-value');
playerBox = document.querySelectorAll('.player-box');
player1Box = playerBox[0].querySelector('.player-global-score');
player2Box = playerBox[1].querySelector('.player-global-score');

// Regular variables
var rollValue, numToWord, roundScore, globalScore;
rollValue = 0;
roundScore = 0;
numToWord = "";
roundScore = 0;
globalScore = 0;
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

/** ALT FUNCTION **/
function visibilityToggleAlt(node){
        if(node.classList.contains('is-active-player') == true){
            node.querySelector('.active-player-indicator').classList.remove('hide-me');
        } else{
            node.querySelector('.active-player-indicator').classList.add('hide-me');
        }
}

function activePlayerToggle(callback){
    playerBox.forEach(function(node){
        // node.classList.toggle('is-active-player');
        if(node.classList.contains('is-active-player') == true){
            node.classList.remove('is-active-player');
        } else{
            node.classList.add('is-active-player');
        }
        callback();
    });
}

/** ALT FUNCTION **/
function activePlayerToggleAlt(node, callback){
        node.classList.toggle('is-active-player');
        callback(); // calls visibilityToggle fucntion
}

function changeDice(number){
    numToWord = diceValues[number];
    dice.className = "fas fa-dice-" + numToWord;
    numericalDiceValue.innerHTML = number;
}

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);

    var activeStatus = "";
    playerBox.forEach(function(node){
       activeStatus = node.classList.contains('is-active-player');
       var currentRoundScore = node.querySelector('.player-current-round-score');
       if(activeStatus == true){ // locks score changes to the current player class elements
            if(rollValue != 1){
                roundScore += rollValue;
                currentRoundScore.innerHTML = roundScore;
            }
            else{
                roundScore = 0;
                currentRoundScore.innerHTML = roundScore;
                activePlayerToggle(visibilityToggle);
            }
       }
    });
});

holdBtn.addEventListener('click', function(){
    var activeStatus, playerGlobalScore;
    activeStatus = "";
    playerBox.forEach(function(node){
        activeStatus = node.classList.contains('is-active-player');
        var currentRoundScore = node.querySelector('.player-current-round-score');
        playerGlobalScore = node.querySelector('.player-global-score');
        if(activeStatus == true){
            playerGlobalScore.innerHTML = parseInt(playerGlobalScore.innerHTML) + roundScore;
            roundScore = 0;
            currentRoundScore.innerHTML = 0;
        }
     });
     activePlayerToggle(visibilityToggle);
    
});

// console.log("First element= " + player1Box.innerHTML + "\n" + "Second element= " + player2Box.innerHTML);


});
