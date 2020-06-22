var fs = require('fs');
var pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

var blackCards = JSON.parse(sessionStorage.getItem('blackCards'));
var myHand = JSON.parse(sessionStorage.getItem('myHand'));

let firstBlackCard = pack["blackCards"][blackCards[0]];
document.getElementById('black-card-text').innerText = firstBlackCard["text"];

let card = document.getElementsByClassName("white-card");
let cardsAllowed = firstBlackCard["pick"];
let cardsSelectedCount = 0;
for (let i = 0; i < card.length; i++) {

    card[i].addEventListener("click", () => {
        if (card[i].classList.contains("selectedOption")) {
            card[i].classList.remove("selectedOption");
            cardsSelectedCount--;
        } else if (cardsSelectedCount < cardsAllowed) {
            card[i].classList.add("selectedOption")
            cardsSelectedCount++;
        }
    })
}

for (let index = 0; index < 10; index++) {
    document.getElementById(`white-card-text-${index}`).innerText = myHand[index];
    console.log(myHand[index])
}