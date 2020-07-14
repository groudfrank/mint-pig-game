document.addEventListener("DOMContentLoaded", function(){

// DOM variables
var root, RollDiceBtn, dice, HoldBtn, NumericalDiceValue, PlayerBox, 
    PlayerOneGlobalScore, PlayerTwoGlobalScore, SettingsWrapper,
    PlayerGlobalScore, NewGameBtn, SettingsBtn, MainBoard, LightThemeBtn,
    DarkThemeBtn, AutomaticThemeBtn, ThemeBtn;

root = document.querySelector(':root');
MainBoard = document.getElementById('main-board');
SettingsWrapper = document.getElementById('settings-wrapper');
SettingsBtn = document.getElementById('settings-btn');
ThemeBtn = document.querySelectorAll('.theme-btn');
ColorSelectionBtn  = document.querySelectorAll('.color-selection-btn');
GradientPalette = document.querySelectorAll('.gradient-palette');
RollDiceBtn = document.getElementById('roll-dice-btn');
dice = document.getElementById('dice');
HoldBtn = document.getElementById('hold-btn');
NumericalDiceValue = document.getElementById('numerical-dice-value');
PlayerBox = document.querySelectorAll('.player-box');
PlayerOneGlobalScore = document.getElementById('player1-global-score');
PlayerTwoGlobalScore = document.getElementById('player2-global-score');
PlayerGlobalScore = document.querySelectorAll('player-global-score');
NewGameBtn = document.getElementById('new-game-btn');

// Regular variables
var RollValue, RoundScore, NumToWord, MaxGlobalScore;
RollValue = 0;
RoundScore = 0;
NumToWord = "";
MaxGlobalScore = 100;
var DiceValues = {
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
    PlayerBox.forEach(function(node){
        if(node.classList.contains('is-active-player') == true){
            node.querySelector('.active-player-indicator').classList.remove('hide-me');
        } else{
            node.querySelector('.active-player-indicator').classList.add('hide-me');
        }
    });
}

function activePlayerToggle(callback){
    PlayerBox.forEach(function(node){
        if(node.classList.contains('is-active-player') == true){
            node.classList.remove('is-active-player');
        } else{
            node.classList.add('is-active-player');
        }
        callback();
    });
}

function changeDice(number){
    NumToWord = DiceValues[number];
    dice.className = "fas fa-dice-" + NumToWord;
    NumericalDiceValue.innerHTML = number;
}

function clearFields(){
    PlayerOneGlobalScore.innerHTML = 0;
    PlayerTwoGlobalScore.innerHTML = 0;
    NumericalDiceValue.innerHTML = '0';
    dice.className = 'fas fa-dice';

    if(PlayerBox[0].classList.contains('is-active-player') == false){
        activePlayerToggle(visibilityToggle);
    }
}

// This function takes two arguments. One is the target node('root' in this case) while
// the other takes an object literal with property-value pairs used to replace those
// that correspond with the property-value pairs in the node/element that was passed as 
// the first argument(bait and switch basically). It constructs a new array, consisting
// of multiple arrays which are themselves made of the property-value pair that the
// Object.entries() function returns and stores them in PropertyEntries.
// The function then loops through PropertyEntries, extacts the property-value pair of
// each array member and sets the properties (setProperty()) on the target node(root).
var updateProperty = (node, obj) => {
    var PropertyEntries = Object.entries(obj); // PropertyEntries = [[key, value],[key, value], etc]
    var property;
    var value;
    // Loops through the newly created array of arrays(PropertyEntries) and grabs
    // the first(entry[0]) and second(entry[1]) values of each array entry. 
    PropertyEntries.forEach(entry => {
        property = entry[0];
        value = entry[1];
        node.style.setProperty(property, value);
    });   
}

// Sets styles on the --primary-color and --secondary-color variables
var changeThemeColor = (node, primary, secondary) => {
    node.style.setProperty('--primary-color', primary);
    node.style.setProperty('--secondary-color', secondary);
};

var propertyValueExtractor = (node, property) => {
    var PropertyValues = window.getComputedStyle(node);
    var FetchedPropertyValue = PropertyValues.getPropertyValue(property);
    return FetchedPropertyValue;
};

var gradientColorExtractor = (node, property) => {
    var PropertyString = propertyValueExtractor(node, property);
    PropertyString = PropertyString.replace(/\s|[a-z]|[A-Z]|\-/g, '');
    PropertyString = PropertyString.slice(2, -1);
    PropertyString = PropertyString.replace('),(',') (');
    PropertyStringArray = PropertyString.split(" ");

    for(var i in PropertyStringArray){
        PropertyStringArray[i] = 'rgb' + PropertyStringArray[i];
        console.log('append rgb = ' + PropertyStringArray[i]);
    }
  
    return PropertyStringArray;
};

GradientPalette.forEach((el) => {
    el.addEventListener('click', () =>  {
        var primary_color = gradientColorExtractor(el, 'background-image')[0];
        var secondary_color = gradientColorExtractor(el, 'background-image')[1];
        changeThemeColor(root, primary_color, secondary_color);
    })
});

SettingsBtn.addEventListener('click', function(){
    if(SettingsWrapper.classList.contains('no-display')){
        SettingsWrapper.classList.remove('no-display');
    } else{
        SettingsWrapper.classList.add('no-display');
    }
});

ThemeBtn.forEach(function(node){
    node.addEventListener('click', function(){
        if(node.id == 'light-theme-btn'){
            updateProperty(root, LightTheme);
        } else if(node.id == 'dark-theme-btn'){
            updateProperty(root, DarkTheme);
        } else if(node.id == 'automatic-theme-btn'){
            alert('feature not operational yet');
        }
    });
});

ColorSelectionBtn.forEach(function(node){
    node.addEventListener('click', function(){
        // console.log('you clicked ' + node.classList);
    });
});

NewGameBtn.addEventListener('click', function(){
    clearFields();
})

RollDiceBtn.addEventListener('click', function(){
    RollValue = Math.floor((Math.random() * 6) + 1);
    changeDice(RollValue);

    var ActivePlayerFlag = false;
    var ActiveStatus = "";
    var CurrentRoundScore;

    PlayerBox.forEach(function(node){
       ActiveStatus = node.classList.contains('is-active-player');
       CurrentRoundScore = node.querySelector('.player-current-round-score');

       if(ActiveStatus == true){ // locks score changes to the current player class elements
            if(RollValue != 1){
                RoundScore += RollValue;
                CurrentRoundScore.innerHTML = RoundScore;
                scoreCheckFlag = true;
            }
            else{
                RoundScore = 0;
                CurrentRoundScore.innerHTML = RoundScore;
                ActivePlayerFlag = true; 
                // For some reason trying at call activePLayerToogle() here causes issues
                // when ran inside the forEach loop so I've added a var called functCallFag
                // which acts as a flag for whether or not activePlayerToogle() should be called.
                // An if statement outside the loop will check the value of of countCallFlag and 
                // determine whether or not activePLayerToggle() should be called.             
            }
       }

            
    });

    if(ActivePlayerFlag == true){activePlayerToggle(visibilityToggle);}

});
 
var MutationCallback = (node) =>{
    var tally = parseInt(node.innerHTML, 10);

    if(tally >= 20){
        alert("A high score reached!");
    }
}

var MutationConfig = {childList: true}
var PlayerOneObserver = new MutationObserver(() => {MutationCallback(PlayerOneGlobalScore);});
var PlayerTwoObserver = new MutationObserver(() => {MutationCallback(PlayerTwoGlobalScore);});
PlayerOneObserver.observe(PlayerOneGlobalScore, MutationConfig);
PlayerTwoObserver.observe(PlayerTwoGlobalScore, MutationConfig);

HoldBtn.addEventListener('click', function(){
    var ActiveStatus, GlobalTotal;
    ActiveStatus = "";
    PlayerBox.forEach(function(node){
        ActiveStatus = node.classList.contains('is-active-player');
        var CurrentRoundScore = node.querySelector('.player-current-round-score');
        GlobalTotal = node.querySelector('.player-global-score');
        if(ActiveStatus == true){
            GlobalTotal.innerHTML = parseInt(GlobalTotal.innerHTML) + RoundScore;
            RoundScore = 0;
            CurrentRoundScore.innerHTML = 0;
        }
     });
     activePlayerToggle(visibilityToggle);   
});

var LightTheme = {
    "--theme-txt-color-inverted" : "#000",
    "--theme-txt-color-inverted-contrasted" : "#555",
    "--theme-color": "#fff",
    "--theme-color-contrasted" : "#f5f5f5",
    "--theme-txt-color" : "#fff",
    "--txt-shadow-lv1" : "0 10px 10px rgba(0,0,0,0.1)",
    "--board-btn-shadow" : "0 2px 3px -1px rgba(0,0,0,.08), 0 5px 10px -2px rgba(0,0,0,.15)",
    "--board-btn-background" : "rgba(0,0,0,0.07)"
}

var DarkTheme = {
    "--theme-txt-color-inverted" : "#000",
    "--theme-txt-color-inverted-contrasted" : "#d8d8d8",
    "--theme-color": "#222",
    "--theme-color-contrasted" : "#333",
    "--theme-txt-color" : "#222",
    "--txt-shadow-lv1" : "0 10px 10px rgba(0,0,0,0.5)",
    "--board-btn-shadow" : "0 2px 3px -1px rgba(0,0,0,.08), 0 5px 10px -2px rgba(0,0,0,0.4)",
    "--board-btn-background" : "rgba(255,255,255,0.07)"
}

console.log(window.getComputedStyle(root));

});
