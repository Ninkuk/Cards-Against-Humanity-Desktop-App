document.getElementById('continue-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const codeInput = document.getElementById('code');

    //TODO add check for duplicate names

    if (nameInput.value === "") {
        nameInput.setAttribute('class', 'input-error');
    } else {
        nameInput.removeAttribute('class');
    }

    if (codeInput.value === "") {
        codeInput.setAttribute('class', 'input-error');
    } else {
        codeInput.removeAttribute('class');
    }

    //verify code and get cards from firebase
    const collectionRef = db.collection(codeInput.value);
    collectionRef.doc("cardsIndexes").get().then(function (doc) {
        if (doc.exists) {
            document.getElementById('continue-btn').style.backgroundColor = "gray";
            document.getElementById('continue-btn').innerText = "Please wait...";

            sessionStorage.setItem('game-code', codeInput.value);
            const blackCards = doc.data().blackCards.split(" ");
            const whiteCards = doc.data().whiteCards.split(" ");

            for (let index = 0; index < blackCards.length; index++) {
                blackCards[index] = Number(blackCards[index]);
            }

            for (let index = 0; index < whiteCards.length; index++) {
                whiteCards[index] = Number(whiteCards[index]);
            }

            sessionStorage.setItem('blackCards', JSON.stringify(blackCards));
            sessionStorage.setItem('whiteCards', JSON.stringify(whiteCards));
        } else {
            codeInput.setAttribute('class', 'input-error');
        }
    });

    // get counter then create player and update counter
    collectionRef.doc("gameStats").get().then(function (doc) {
        let counter = doc.data().playerCounter;
        console.log(counter);

        collectionRef.doc(`player${counter}`).set({
            playerID: counter,
            wins: 0,
            name: nameInput.value
        }).then(function () {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('game-code', codeInput.value);
                sessionStorage.setItem('playerID', counter);
            }

            collectionRef.doc("gameStats").update({
                playerCounter: counter + 1
            });

            window.location.assign('lobby.html');
        });
    });
});