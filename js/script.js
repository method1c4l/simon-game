let machineSequence = [];
let playerSequence = [];


const $startButton = document.querySelector('#start');

$startButton.onclick = startGame;


function startGame() {
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

function playerPlays() {
    const PLAYER_TURN_DELAY = (machineSequence.length + 1) * 1000;

    setTimeout(function () {
        const $buttons = document.querySelectorAll('#board button');

        $buttons.forEach(function (button) {
            button.onclick = handlePlayerInput;
        })
    }, PLAYER_TURN_DELAY);
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


function handlePlayerInput(event) {
    const button = event.target;
    const color = button.id;

    highlight(button);

    playerSequence.push(color);


    const machineColor = machineSequence[playerSequence.length - 1];

    if (color !== machineColor) {
        alert('YOU LOSE');

        return;
    }

    if (playerSequence.length === machineSequence.length) {
        setTimeout(playRound, 1000);
    }
}
