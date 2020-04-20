// const {
//     clipboard
// } = require('electron');

var gameCode = sessionStorage.getItem('game-code')
var myPlayerID = sessionStorage.getItem('playerID');

if (myPlayerID > 0) {
    var continuebtn = document.getElementById('continue-btn');
    continuebtn.style.backgroundColor = "gray";
    continuebtn.innerText = "Waiting for host...";
    // continuebtn.disabled = true;
}


document.getElementById('game-code').innerText = gameCode;


var startIndex = myPlayerID * 10;
var endIndex = (myPlayerID * 10) + 9;

var whiteCards = JSON.parse(sessionStorage.getItem('whiteCards'));

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

db.collection(gameCode).where("wins", "==", 0).onSnapshot(function (querySnapshot) {
    var players = [];
    querySnapshot.forEach(function (doc) {
        let p = document.createElement('p');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        span1.setAttribute('class', 'text-bold person-joined');
        span2.setAttribute('class', 'person-joined');
        span1.innerText = `${doc.data().name} `;
        span2.innerText = "has joined";
        p.appendChild(span1);
        p.appendChild(span2);
        document.getElementById('people-list-container').appendChild(p);
    });
    console.log("Current players: ", players.join(", "));
});