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

var optionsContainer = document.getElementById('card-sets');

for (let i = 0; i < cardSets.length; i++) {
    const setName = cardSets[i];
    const setId = cardSetId[i];

    let setOption = document.createElement('button');
    setOption.setAttribute('id', `${setId}`);
    setOption.setAttribute('onClick', `selected('${setId}')`)
    setOption.innerText = setName;
    optionsContainer.appendChild(setOption);
}

var selectedCategories = [];

function selected(element) {
    var clickedElement = document.getElementById(element);
    if (clickedElement.hasAttribute('class')) {
        clickedElement.removeAttribute('class');

        for (let index = 0; index < selectedCategories.length; index++) {
            const category = selectedCategories[index];
            if (category == element) {
                selectedCategories.splice(index, 1);
            }
        }
    } else {
        clickedElement.setAttribute('class', 'selectedOption');
        selectedCategories.push(element);
    }
}


document.getElementById('continue-btn').addEventListener('click', () => {
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    if (name == "") {
        nameInput.setAttribute('class', 'input-error');
    } else {
        nameInput.removeAttribute('class');
    }

    console.log(selectedCategories);
});


var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./json/Base.json', 'utf8'));

whiteCardsIndex = shuffle(obj["Base"]["white"]);

var shuffledIndex = `${whiteCardsIndex[0]}`

for (let index = 1; index < whiteCardsIndex.length; index++) {
    const element = whiteCardsIndex[index];
    shuffledIndex += ` ${element}`
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