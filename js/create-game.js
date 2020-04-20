var cardSets = ["Base Set", "The First Expansion", "The Second Expansion", "The Third Expansion",
    "The Fourth Expansion", "The Fifth Expansion", "The Sixth Expansion", "Green Box Expansion",
    "90s Nostalgia Pack", "Box Expansion", "Fantasy Pack", "Food Pack", "Science Pack",
    "World Wide Web Pack", "Vote for Hillary Pack", "Vote for Trump Pack", "Trump Survival Pack",
    "2012 Holiday Pack", "2013 Holiday Pack", "PAX East 2013", "PAX Prime 2013", "PAX East 2014",
    "PAX East 2014 Panel Pack", "PAX Prime 2014 Panel Pack", "PAX Prime 2015 Food Packs",
    "House of Cards Against Humanity", "Reject Pack", "Reject Pack 2", "Canadian",
    "Misprint Replacement Bonus Cards"
];

var cardSetId = ["Base", "CAHe1", "CAHe2", "CAHe3", "CAHe4", "CAHe5", "CAHe6", "greenbox", "90s", "Box",
    "fantasy", "food", "science", "www", "hillary", "trumpvote", "trumpbag", "xmas2012", "xmas2013",
    "PAXE2013", "PAXP2013", "PAXE2014", "PAXEP2014", "PAXPP2014", "PAX2015", "HOCAH", "reject", "reject2",
    "Canadian", "misprint"
];

for (let i = 0; i < 8; i++) {
    const setName = cardSets[i];
    const setId = cardSetId[i];

    let setOption = document.createElement('button');
    setOption.setAttribute('id', `${setId}`);
    setOption.setAttribute('onClick', `selected('${setId}', true)`)
    setOption.innerText = setName;
    document.getElementById('card-sets-required').appendChild(setOption);
}

for (let i = 8; i < cardSetId.length; i++) {
    const setName = cardSets[i];
    const setId = cardSetId[i];

    let setOption = document.createElement('button');
    setOption.setAttribute('id', `${setId}`);
    setOption.setAttribute('onClick', `selected('${setId}', false)`)
    setOption.innerText = setName;
    document.getElementById('card-sets-optional').appendChild(setOption);
}

var selectedCategories = [];
var requiredCategories = 0;

function selected(element, required) {
    var clickedElement = document.getElementById(element);
    if (clickedElement.hasAttribute('class')) {
        clickedElement.removeAttribute('class');

        for (let index = 0; index < selectedCategories.length; index++) {
            const category = selectedCategories[index];
            if (category == element) {
                selectedCategories.splice(index, 1);
            }

            if (required) {
                console.log("this works?");
                requiredCategories -= 1;
            }
        }
    } else {
        clickedElement.setAttribute('class', 'selectedOption');
        selectedCategories.push(element);

        if (required) {
            console.log("this works?2");
            requiredCategories += 1;
        }
    }
}


document.getElementById('continue-btn').addEventListener('click', () => {
    var categoriesReady = false;
    var nameReady = false;

    if (requiredCategories > 0) {
        document.getElementById('required-error').style.color = "rgba(255, 255, 255, 0.75)";
        categoriesReady = true;
    } else {
        document.getElementById('required-error').style.color = "#f44336";
        categoriesReady = false;
    }

    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    if (name == "") {
        nameInput.setAttribute('class', 'input-error');
        nameReady = false;
    } else {
        nameInput.removeAttribute('class');
        nameReady = true;
    }

    if (categoriesReady && nameReady) {
        document.getElementById('continue-btn').style.backgroundColor = "gray";
        document.getElementById('continue-btn').innerText = "Please wait...";
        var deck = prepareDeck(gameCode);

        //generate random number
        var gameCode = alphanumeric_unique();

        //add to firebase. on success move to lobby
        db.collection(gameCode.toString()).doc("cardsIndexes").set({
            blackCards: deck[0],
            whiteCards: deck[1]
        });

        db.collection(gameCode.toString()).doc("player0").set({
            playerID: 0,
            wins: 0,
            name: name
        }).then(function () {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('game-code', gameCode);
                sessionStorage.setItem('playerID', 0);
            } else {
                // F's in the chat?
            }

            window.location.assign('lobby.html');
        });
    }

    //TODO: add addional pack checks
    if (selectedCategories.length < 1) {

    }
});

function prepareDeck(gameCode) {
    var fs = require('fs');
    var pack = JSON.parse(fs.readFileSync('./json/Full_Pack.json', 'utf8'));

    //shuffle black and white cards indices
    var blackCards = [];
    var whiteCards = [];
    for (let index = 0; index < selectedCategories.length; index++) {
        blackCards = blackCards.concat(pack[`${selectedCategories[index]}`]["black"]);
        whiteCards = whiteCards.concat(pack[`${selectedCategories[index]}`]["white"]);
    }
    blackCards = shuffle(blackCards);
    whiteCards = shuffle(whiteCards);
    sessionStorage.setItem('blackCards', JSON.stringify(blackCards));
    sessionStorage.setItem('whiteCards', JSON.stringify(whiteCards));

    blackCardsString = blackCards.join(" ");
    whiteCardsString = whiteCards.join(" ");

    return [blackCardsString, whiteCardsString];
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function alphanumeric_unique() {
    return Math.random().toString(36).split('').filter(function (value, index, self) {
        return self.indexOf(value) === index;
    }).join('').substr(2, 6).toUpperCase();
}