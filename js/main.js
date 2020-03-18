document.addEventListener("DOMContentLoaded", function(){

// DOM variables
var root, rollDiceBtn, dice, holdBtn, numericalDiceValue, playerBox, 
    playerOneGlobalScore, playerTwoGlobalScore,
    playerGlobalScore, newGameBtn, settingBtn, mainBoard;

root = document.querySelector(':root');
mainBoard = document.getElementById('main-board');
settingsBtn = document.getElementById('settings-btn');
rollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
holdBtn = document.getElementById('hold-btn');
numericalDiceValue = document.getElementById('numerical-dice-value');
playerBox = document.querySelectorAll('.player-box');
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

function clearFields(){
    playerOneGlobalScore.innerHTML = 0;
    playerTwoGlobalScore.innerHTML = 0;
    numericalDiceValue.innerHTML = 'X';
    dice.className = 'fas fa-dice';

    if(playerBox[0].classList.contains('is-active-player') == false){
        activePlayerToggle(visibilityToggle);
    }
}

var updateProperty = (node, obj) => {
    var property_entries = Object.entries(obj);
    var property;
    var value;
    // Decontstructs the arrayx gets the property-values and 
    // updates the node passed in as arguments.
    property_entries.forEach(entry => {
        property = entry[0];
        value = entry[1];
        node.style.setProperty(property, value);
    });   
}

settingsBtn.addEventListener('click', function(){
    if(mainBoard.classList.contains('dark-theme-active') == false){
        updateProperty(root, darkTheme);
        mainBoard.classList.add('dark-theme-active');
    } else {
        updateProperty(root, lightTheme);
        mainBoard.classList.remove('dark-theme-active');
    }
});

newGameBtn.addEventListener('click', function(){
    clearFields();
})

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);

    var activePlayerFlag = false;
    var activeStatus = "";
    var currentRoundScore;

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
                // An if statement outside the loop will check the value of of countCallFlag and 
                // determine whether or not activePLayerToggle() should be called.             
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

var lightTheme = {
    "--theme-txt-color-inverted" : "#000",
    "--theme-txt-color-inverted-contrasted" : "#555",
    "--theme-color": "#fff",
    "--theme-color-contrasted" : "#f5f5f5",
    "--theme-txt-color" : "#fff",
    "--txt-shadow-lv1" : "0 10px 10px rgba(0,0,0,0.1)",
    "--board-btn-shadow" : "0 2px 3px -1px rgba(0,0,0,.08), 0 5px 10px -2px rgba(0,0,0,.15)",
    "--board-btn-background" : "rgba(0,0,0,0.07)"
}

var darkTheme = {
    "--theme-txt-color-inverted" : "#000",
    "--theme-txt-color-inverted-contrasted" : "#d8d8d8",
    "--theme-color": "#222",
    "--theme-color-contrasted" : "#333",
    "--theme-txt-color" : "#222",
    "--txt-shadow-lv1" : "0 10px 10px rgba(0,0,0,0.5)",
    "--board-btn-shadow" : "0 2px 3px -1px rgba(0,0,0,.08), 0 5px 10px -2px rgba(0,0,0,0.4)",
    "--board-btn-background" : "rgba(255,255,255,0.07)"
}

});
