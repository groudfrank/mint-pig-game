document.addEventListener("DOMContentLoaded", function(){

//DOM variables
var rollDiceBtn, dice, holdBtn, numericalDiceValue, playerBox, playerGlobalScore;

rollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
holdBtn = document.getElementById('hold-btn');
numericalDiceValue = document.getElementById('numerical-dice-value');
playerBox = document.querySelectorAll('.player-box');

// Regular variables
var rollValue, numToWord, roundScore, globalScore;
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

showActivePlayer();

// Puts an indicating icon that reveals who the current player is
// based on which player side currently has the 'is-active-player class.
// By default Player 1 is the active player when the page loads. 
// It is mean to work specifically with the activePlayerToggle function, 
// as a callback function. After the active status of a player changes 
// due to activePlayerToggle, showActivePlayer will then make the active
// player indicator visible.
function showActivePlayer(){
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
        node.classList.toggle('is-active-player');
        callback();
    });
}

function changeDice(number){
    numToWord = diceValues[number];
    dice.className = "fas fa-dice-" + numToWord;
    numericalDiceValue.innerHTML = number;
}

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);

    playerBox.forEach(function(node, index){
       var activeStatus = node.classList.contains('is-active-player');
       var currentRoundScore = node.querySelectorAll('.player-current-round-score');
       if(activeStatus == true){
            if(rollValue != 1){
                roundScore += rollValue;
                currentRoundScore[index].innerHTML = roundScore;
            } else {
                roundScore = 0;
                currentRoundScore[index].innerHTML = roundScore;
            }
       }
    });
});

holdBtn.addEventListener('click', function(){
    var activeStatus, playerGlobalScore;
    activeStatus = "";
    playerBox.forEach(function(node, index){
        activeStatus = node.classList.contains('is-active-player');
        playerGlobalScore = node.querySelectorAll('.player-global-score');
        if(activeStatus == true){
            playerGlobalScore[index].innerHTML = parseInt(playerGlobalScore[index].innerHTML) + roundScore;
        }

        activePlayerToggle(showActivePlayer);
        // console.log(typeof(playerGlobalScore[index].innerHTML));
        // console.log(playerGlobalScore[0]);
     });
    
});


});
