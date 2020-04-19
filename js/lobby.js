const {
    clipboard
} = require('electron');

var gameCode = sessionStorage.getItem('game-code')


document.getElementById('game-code').innerText = gameCode;

var myPlayerNum = 0;

var startIndex = myPlayerNum * 10;
var endIndex = (myPlayerNum * 10) + 9;

var whiteCards = JSON.parse(sessionStorage.getItem('whiteCards'));
console.log(whiteCards);

var fs = require('fs');
var pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

var myHand = [];

for (let index = startIndex; index < endIndex + 1; index++) {
    myHand = myHand.concat(pack["whiteCards"][whiteCards[index]]);
    console.log(whiteCards[index]);
}

sessionStorage.setItem('myHand', JSON.stringify(myHand));

document.getElementById('copy-btn').addEventListener('click', () => {
    clipboard.writeText(gameCode);
});

