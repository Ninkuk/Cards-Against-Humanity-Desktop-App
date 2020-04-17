var fs = require('fs');
var pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

var blackCards = JSON.parse(sessionStorage.getItem('blackCards'));
var myHand = JSON.parse(sessionStorage.getItem('myHand'));

console.log(blackCards);
console.log(pack["blackCards"][blackCards[0]]["text"]);
document.getElementById('black-card-text').innerText = pack["blackCards"][blackCards[0]]["text"];

for (let index = 0; index < 10; index++) {
    var card = document.getElementById(`white-card-${index}`).innerText;
    card = pack["whiteCards"][myHand[index]];
}