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
        return;
    }

    //verify code and get cards from firebase


    var blackCardsString = "406 406 412 413 403 402 411 410 405 400 408 404 401 407 89 399 409";
    var blackCards = blackCardsString.split(" ");
    for (let index = 0; index < blackCards.length; index++) {
        blackCards[index] = Number(blackCards[index]);
    }
});