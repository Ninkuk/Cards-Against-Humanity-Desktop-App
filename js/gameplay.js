const fs = require('fs');
const pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

const blackCards = JSON.parse(sessionStorage.getItem('blackCards'));
const myHand = JSON.parse(sessionStorage.getItem('myHand'));
const gameCode = sessionStorage.getItem('game-code');
const myPlayerID = sessionStorage.getItem('playerID');

const numberOfRounds = 8;
const numberOfPlayers = 5;

let collectionRef = db.collection(gameCode);
collectionRef.doc("gameStats").onSnapshot(function (doc) {
    let counter = doc.data().playerCounter;
    let currentRound = doc.data().currentRound;

    if ((myPlayerID + 1) % (currentRound) === 0) {
        czarDisplay();
    } else {
        plebView();
    }

    let blackCard = pack["blackCards"][blackCards[currentRound]];
    document.getElementById('black-card-text').innerText = blackCard["text"];
});

let cards = document.getElementsByClassName("white-card");

function czarDisplay() {
    cards.forEach(element => element.onmousedown = new Function("return false"));
}

function plebView() {


}

let cardsAllowed = blackCard["pick"];
let cardsSelectedCount = 0;
for (let i = 0; i < cards.length; i++) {

    cards[i].addEventListener("click", () => {
        if (cards[i].classList.contains("selectedOption")) {
            cards[i].classList.remove("selectedOption");
            cardsSelectedCount--;
        } else if (cardsSelectedCount < cardsAllowed) {
            cards[i].classList.add("selectedOption")
            cardsSelectedCount++;
        }
    });
}

for (let index = 0; index < 10; index++) {
    document.getElementById(`white-card-text-${index}`).innerText = myHand[index];
    console.log(myHand[index])
}