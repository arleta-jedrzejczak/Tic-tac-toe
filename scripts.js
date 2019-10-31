let isPlaying = false;
let isPlayer1;
let isWon = false;

let player1Fields = [];
let player2Fields = [];

const button = document.getElementById('button');
const table = document.getElementById('table');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const turn = document.getElementById('turn');
const fields = document.getElementsByTagName('td');
const winText = document.getElementById('winText');
const draw = document.getElementById('draw');

let fieldMap = [false, false, false, false, false, false, false, false, false];
const resultsArray = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
];

button.addEventListener('click', onToggleGame);

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', () => onFieldClick(fields[i]));
}

function onToggleGame() {
    if (!isPlaying) {
        onStartGame();
    } else {
        onEndGame()
    }
}

function onStartGame() {
    isPlaying = true;
    draw.classList.add('hidden');
    player2.classList.add('hidden');
    winText.classList.add('hidden');
    button.innerText = 'End game';
    table.classList.remove('hidden');
    turn.classList.remove('hidden');
    player1.classList.remove('hidden');
    isPlayer1 = true;
}

function onEndGame() {
    isPlaying = false;
    button.innerText = 'Start game';
    table.classList.add('hidden');
    turn.classList.add('hidden');
    player1.classList.add('hidden');
    player2.classList.add('hidden');
    isWon = false;
    resetGame();
}

function onFieldClick(field) {
    let fieldId = parseInt(field.id);
    let id = fieldId - 1;
    if (!fieldMap[id]) {
        fieldMap[id] = true;
        if (isPlayer1) {
            field.classList.add('blue');
            player1Fields.push(fieldId);
            onCheckFields(player1Fields, isPlayer1);
        } else {
            field.classList.add('red');
            player2Fields.push(fieldId);
            onCheckFields(player2Fields, isPlayer1);
        }
        if (!fieldMap.includes(false) && !isWon) {
            setTimeout(() => onDrawGame(), 500);
        }
    }
}

function onCheckFields(fieldsArray, isPlayer1) {
    if (fieldsArray.length >= 3) {
        fieldsArray.sort((a, b) => a - b);
        for (let i = 0; i < resultsArray.length; i++) {
            let a = resultsArray[i][0];
            let b = resultsArray[i][1];
            let c = resultsArray[i][2];
            if (fieldsArray.includes(a) && fieldsArray.includes(b) && fieldsArray.includes(c)) {
                isWon = true;
                setTimeout(() => onWinGame(isPlayer1), 500);
            }
        }
        onChangeTurn(isPlayer1);
    } else {
        onChangeTurn(isPlayer1);
    }
}

function onChangeTurn(isPlayerOne) {
    if (isPlayerOne) {
        isPlayer1 = false;
        player1.classList.add('hidden');
        player2.classList.remove('hidden');
    } else {
        isPlayer1 = true;
        player1.classList.remove('hidden');
        player2.classList.add('hidden');
    }
}

function onWinGame(isPlayerOne) {
    onEndGame();
    winText.classList.remove('hidden');
    if (isPlayerOne) {
        player1.classList.remove('hidden');
    } else {
        player2.classList.remove('hidden');
    }
}

function resetGame() {
    fieldMap = [false, false, false, false, false, false, false, false, false];
    player1Fields = [];
    player2Fields = [];
    for (let i = 0; i < fields.length; i++) {
        fields[i].className = '';
    }
}

function onDrawGame() {
    draw.classList.remove('hidden');
    onEndGame();
}
