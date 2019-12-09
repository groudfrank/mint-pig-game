document.addEventListener("DOMContentLoaded", function(){

//DOM variables
var rollDiceBtn, dice, holdBtn, numericalDiceValue, playerBox;

rollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
holdBtn = document.getElementById('hold-btn');
numericalDiceValue = document.getElementById('numerical-dice-value');
currentPlayerBoxGlobalScore = document.querySelectorAll('.player-global-score');
playerBox = document.querySelectorAll('.player-box');
player1Box = playerBox[0].querySelector('.player-global-score');
player2Box = playerBox[1].querySelector('.player-global-score');
// playerGlobalScore = document.querySelectorAll('.player-global-score');

// Regular variables
var rollValue, numToWord, roundScore, maxGlobalScore;
rollValue = 0;
roundScore = 0;
numToWord = "";
roundScore = 0;
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
        // node.classList.toggle('is-active-player');
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

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);

    var functCallFlag = false;
    var activeStatus = "";
    var currentRoundScore;
    var currentGlobalScore = "";
    var player1GlobalScore;
    var player2GlobalScore = 0;
    // var currentPlayerBoxGlobalScore;

    // checks the global score
    player1GlobalScore = parseInt(currentPlayerBoxGlobalScore[0].innerHTML);
    player2GlobalScore = parseInt(currentPlayerBoxGlobalScore[1].innerHTML);

    playerBox.forEach(function(node){
       activeStatus = node.classList.contains('is-active-player');
       currentRoundScore = node.querySelector('.player-current-round-score');
    // currentPlayerBoxGlobalScore = node.querySelector('.player-global-score');


       if(activeStatus == true){ // locks score changes to the current player class elements
            if(rollValue != 1){
                roundScore += rollValue;
                currentRoundScore.innerHTML = roundScore;

                (function(args1){
                    if((args1 >= 20)){
                        alert(args1);
                        }
                })(player1GlobalScore);
            }
            else{
                roundScore = 0;
                currentRoundScore.innerHTML = roundScore;
                functCallFlag = true; 
                // For some reason trying at call activePLayerToogle() here causes issues
                // when ran inside the forEach loop so I've added a var called functCallFag
                // which acts as a flag for whether or not activePlayerToogle() should be called.
                // An if statement outside the loop will check the value of of cuntCallFlag and 
                // determine whether or not activePLayerToggle() should be called/               
            }
       }

            
    });

    if(functCallFlag == true){activePlayerToggle(visibilityToggle);}

    // alert(typeof(player1GlobalScore));
    
    // if((player1GlobalScore >= 20)){
    //     alert(player1GlobalScore);
    //     }
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
