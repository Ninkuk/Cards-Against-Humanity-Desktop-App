const {
    clipboard
} = require('electron');

const gameCode = sessionStorage.getItem('game-code');
const myPlayerID = sessionStorage.getItem('playerID');

// Only host can start the game once everyone joins
const continueButton = document.getElementById('continue-btn');
if (myPlayerID > 0) {
    continueButton.style.backgroundColor = "gray";
    continueButton.innerText = "Waiting for host...";
    //TODO only for quick testing. remove in prod.
    continueButton.disabled = true;
} else {
    continueButton.addEventListener('click', () => {
        window.location.assign('gameplay.html');
    });
}


document.getElementById('game-code').innerText = gameCode;

// get player's white cards first set index
const startIndex = myPlayerID * 10;
const endIndex = (myPlayerID * 10) + 9;

const whiteCards = JSON.parse(sessionStorage.getItem('whiteCards'));

const fs = require('fs');
const pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

let myHand = [];

for (let index = startIndex; index < endIndex + 1; index++) {
    myHand = myHand.concat(pack["whiteCards"][whiteCards[index]]);
    console.log(whiteCards[index]);
    console.log(myHand);
}

sessionStorage.setItem('myHand', JSON.stringify(myHand));

// copies the game code
document.getElementById('copy-btn').addEventListener('click', () => {
    clipboard.writeText(gameCode);
});

// real time listener which shows the players joining in real time
db.collection(gameCode).where("wins", "==", 0).onSnapshot(function (querySnapshot) {
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
});