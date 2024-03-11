let machineSequence = [];
let playerSequence = [];

let round = 0;


const $startButton = document.querySelector('#start');

$startButton.onclick = startGame;


updateStatus('Press START to begin the game!');

disablePlayerInput();


function startGame() {
    handleBtnVisibility();

    resetStatus();

    playRound();
}


function resetStatus() {
    machineSequence = [];

    playerSequence = [];

    round = 0;
}

function playRound() {
    machinePlays();

    playerPlays();

    playerSequence = [];

    round += 1;

    updateRound(round);
}


function machinePlays() {
    updateStatus('Pay attention...');

    disablePlayerInput();

    const newColor = selectRandomColor();

    machineSequence.push(newColor);


    machineSequence.forEach(function (color, index) {
        const $button = document.querySelector(`#${color}`);

        const DELAY = (index + 1) * 1000;

        setTimeout(function () {
            highlight($button);
        }, DELAY);
    })
}

function selectRandomColor() {
    const $buttons = document.querySelectorAll('#board button');

    const index = Math.floor(Math.random() * $buttons.length);
    const button = $buttons[index];

    const color = button.id;

    return color;
}

function highlight(button) {
    button.style.opacity = 1;

    setTimeout(function () {
        button.style.opacity = .5;
    }, 500);
}


function playerPlays() {
    const PLAYER_TURN_DELAY = (machineSequence.length + 1) * 1000;

    setTimeout(function () {
        updateStatus('Your turn!');

        enablePlayerInput();
    }, PLAYER_TURN_DELAY);
}

function handlePlayerInput(event) {
    const button = event.target;
    const color = button.id;

    highlight(button);

    playerSequence.push(color);


    const machineColor = machineSequence[playerSequence.length - 1];

    if (color !== machineColor) {
        loseTheGame();

        return;
    }

    if (playerSequence.length === machineSequence.length) {
        disablePlayerInput();

        setTimeout(playRound, 1000);
    }
}

function disablePlayerInput() {
    const $buttons = document.querySelectorAll('#board button');

    $buttons.forEach(function (button) {
        button.onclick = function () {
        }
    })
}

function enablePlayerInput() {
    const $buttons = document.querySelectorAll('#board button');

    $buttons.forEach(function (button) {
        button.onclick = handlePlayerInput;
    })
}


function handleBtnVisibility() {
    $startButton.classList.toggle('hidden');
}


function updateStatus(message, lose = false) {
    const $status = document.querySelector('#status');
    const statusMessage = $status.querySelector('p');

    statusMessage.textContent = message;

    if (lose) {
        $status.classList.remove('alert-success');

        $status.classList.add('alert-danger');
    } else {
        $status.classList.remove('alert-danger');

        $status.classList.add('alert-success');
    }
}

function updateRound(round) {
    const $round = document.querySelector('#round');

    $round.textContent = round;
}


function loseTheGame() {
    updateStatus('You lose! Press START to retry!', true);

    updateRound('-');

    disablePlayerInput();

    handleBtnVisibility();
}
