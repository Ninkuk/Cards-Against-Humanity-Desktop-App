document.getElementById('continue-btn').addEventListener('click', () => {
    var nameInput = document.getElementById('name');
    var codeInput = document.getElementById('code');

    if (nameInput.value == "") {
        nameInput.setAttribute('class', 'input-error');
    } else {
        nameInput.removeAttribute('class');
    }

    if (codeInput.value == "") {
        codeInput.setAttribute('class', 'input-error');
    } else {
        codeInput.removeAttribute('class');
    }

    //verify code and get cards from firebase
    var collectionRef = db.collection(codeInput.value);
    collectionRef.doc("cardsIndexes").get().then(function (doc) {
        if (doc.exists) {
            sessionStorage.setItem('game-code', codeInput.value);
            var blackCards = doc.data().blackCards.split(" ");
            var whiteCards = doc.data().whiteCards.split(" ");

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

    collectionRef.get().then(function (doc) {
        var counter = 0
        doc.forEach(element => {
            counter += 1;
        });

        collectionRef.doc(`player${counter-1}`).set({
            playerID: counter - 1,
            wins: 0,
            name: nameInput.value
        }).then(function () {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('game-code', codeInput.value);
                sessionStorage.setItem('playerID', playerNum);
            } else {
                // F's in the chat?
            }

            window.location.assign('lobby.html');
        });
    });

});