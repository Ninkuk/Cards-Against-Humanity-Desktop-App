function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, cardNum) {
    ev.dataTransfer.setData("cardNum", cardNum);
    document.getElementById('drop-area').style.display = 'block';
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("cardNum");
    console.log(data);
    // ev.target.appendChild(document.getElementById('white-card-0'));
    document.getElementById('drop-area').style.display = 'none';
}


var fs = require('fs');
var pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

var blackCards = JSON.parse(sessionStorage.getItem('blackCards'));
var myHand = JSON.parse(sessionStorage.getItem('myHand'));

document.getElementById('black-card-text').innerText = pack["blackCards"][blackCards[0]]["text"];

for (let index = 0; index < 10; index++) {
    document.getElementById(`white-card-${index}`).innerText = myHand[index];
    console.log(myHand[index])
}