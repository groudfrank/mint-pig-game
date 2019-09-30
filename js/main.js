document.addEventListener("DOMContentLoaded", function(){

//DOM variables
var rollDiceBtn, dice, holdBtn, numericalDiceValue, playerBox, activePlayer;

rollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
holdBtn = document.getElementById('hold-btn');
numericalDiceValue = document.getElementById('numerical-dice-value');
playerBox = document.querySelectorAll('.player-box');
// activePlayer = playerBox.querySelectorAll('.player-global-score');

// Regular variables
var rollValue, numToWord, roundScore, globalScore;
var diceValues = {
        1:'one',
        2:'two', 
        3:'three',
        4:'four',
        5:'five',
        6:'six'
};

function activePlayerDisplay(){
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

// function scoreKeeper(){

//     if(rollValue =! 1){
//         roundScore += rollValue;
//     } else {
//         roundScore = 0;
//     }
// }

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);

    // playerBox.forEach(function(node, index){
    //    var activeStatus = node.classList.contains('is-active-player');
    //    var currentRoundScore = node.querySelectorAll('.player-current-round-score');
    //    if(activeStatus == true){
    //        currentRoundScore[index].innerHTML = foo;
    //    }
    // });
});

holdBtn.addEventListener('click', function(){
    activePlayerToggle(activePlayerDisplay);
});

activePlayerDisplay();

console.log(playerBox[0].querySelectorAll('.player-current-round-score'));

});
