document.addEventListener("DOMContentLoaded", function(){

var rollDiceBtn = document.getElementById('roll-dice-btn');
var dice = document.getElementById('dice');
var numericalDiceValue = document.getElementById('numerical-dice-value');
var rollValue, numToWord, numToKey, newClassName;
var diceValues = {
        1:'one',
        2:'two', 
        3:'three',
        4:'four',
        5:'five',
        6:'six'
};

function changeDice(number){
    numToWord = diceValues[number];
    dice.className = "fas fa-dice-" + numToWord;
    numericalDiceValue.innerHTML = number;
}

rollDiceBtn.addEventListener('click', function(){
    rollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(rollValue);
});



});
