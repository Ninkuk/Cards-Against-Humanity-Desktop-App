var fs = require('fs');
var pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

var blackCards = JSON.parse(sessionStorage.getItem('blackCards'));
var myHand = JSON.parse(sessionStorage.getItem('myHand'));

document.getElementById('black-card-text').innerText = pack["blackCards"][blackCards[0]]["text"];

for (let index = 0; index < 10; index++) {
    document.getElementById(`white-card-${index}`).innerText = myHand[index];
}