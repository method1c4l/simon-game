let machineSequence = [];
let playerSequence = [];


const $startButton = document.querySelector('#start');

$startButton.onclick = startGame;


disablePlayerInput();

function startGame() {
    handleBtnVisibility();

    resetStatus();

    playRound();
}


function resetStatus() {
    machineSequence = [];

    playerSequence = [];
}

function playRound() {
    machinePlays();

    playerPlays();

    playerSequence = [];
}


function machinePlays() {
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
        alert('YOU LOSE');

        handleBtnVisibility();

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
