const shuffleButton = document.querySelector('#shuffle');
const startGameButton = document.querySelector('#start');
const sizeBoard = document.querySelector('.size-board');
const board = document.querySelector('.board');
const sizes = Array.from(sizeBoard.querySelectorAll('.radio'));
const moves = document.querySelector('.status span');
let puzzles = Array.from(board.querySelectorAll('.puzzle'));
let game = new Game(selectedSize(sizes));

startGame();

function startGame() {
    removePuzzles();
    game = new Game(selectedSize(sizes));
    game.start();
    createPuzzles(selectedSize(sizes));
    puzzles = Array.from(board.querySelectorAll('.puzzle'));
    setPositionPuzzle(puzzles);
    moves.innerHTML = game.moves;
    titleСhanges(selectedSize(sizes));
    if (document.querySelector('.boardBlack')) removeBoard();
}

startGameButton.onclick = () => {
    startGame()
    vibrate(20);
}

shuffleButton.onclick = () => {
    if (game.map.map.length == 0) return;
    game.shuffle();
    setPositionPuzzle(puzzles);
    puzzleSolved(game.solved());
    moves.innerHTML = game.moves;
    vibrate(20);
}

function setPositionPuzzle(puzzles) {
    for (let x = 0; x < selectedSize(sizes); x++) {
        for (let y = 0; y < selectedSize(sizes); y++) {
            const value = game.getDigitAt(Coordinate.coord(x, y));
            const valueCheck = game.getDigitAt(Coordinate.coord(x, y), game.mapCheck);
            const checkPos = checkPosPuzzle(value, valueCheck);
            puzzles[value].innerHTML = value;
            setPuzzleStyle(puzzles[value], x, y, checkPos)
        }

    }
}

board.addEventListener('click', (event) => {
    const puzzle = event.target.closest('.puzzle');
    if (!puzzle) return;
    const puzzleCoord = findCoordinateByPuzzle(Number(puzzle.innerHTML), game.map.map)
    game.pressAt(puzzleCoord);
    setPositionPuzzle(puzzles);
    moves.innerHTML = game.moves;
    puzzleSolved(game.solved());
    vibrate(20);
});

function findCoordinateByPuzzle(value, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(value) != -1) {
            const puzzleCoord = Coordinate.coord(i, arr[i].indexOf(value));
            return puzzleCoord;
        }
    }
}

sizeBoard.addEventListener('click', (event) => {
    const radio = event.target.closest('.radio');
    if (!radio) return;
    if (radio.checked) return;
    titleСhanges(selectedSize(sizes));
    startGame()
    vibrate(20);
});

///////////////---------Secondary Function-----------///////////////

function selectedSize(arr) {
    for (let iterator of arr) {
        if (iterator.checked) return iterator.value;
    }
    return false;
}

///////////////---------DOM element changes-----------///////////////

////create new game button.

function createElemNewGame() {

    if (document.querySelector('.boardBlack')) removeBoard();
    let element = document.createElement('div');
    element.innerHTML = '<span>new game</span>';
    element.classList.add('boardBlack');
    board.append(element);
}

function removePuzzles() {
    puzzles.forEach(element => {
        element.remove()
    });
}

//create new element puzzle.
function createPuzzles(size) {

    // let assembly = document.createElement('div');_____????
    for (let i = 0; i < size ** 2; i++) {
        let element = document.createElement('div');
        element.classList.add('puzzle');
        if (size == 5) {
            element.style.width = '20%';
            element.style.height = '20%';
        }
        board.append(element);
    }
}

function checkPosPuzzle(a, b) {
    if (a === b) return true;
    return false;
}

function setPuzzleStyle(node, x, y, checkPos) {
    if (node.innerHTML == 0) {
        node.style.display = 'none';
    } else {
        let shiftPs = 100;
        node.style.transform = `translate3d(${y * shiftPs}%,${x * shiftPs}%,0)`;
        if (checkPos) {
            node.style.color = 'lawngreen'
        } else {
            node.style.color = 'white'
        };
    }
}

function titleСhanges(size) {
    let titileH1 = document.querySelector('h1');
    if (size == 4) {
        document.title = "15 PUZZLE";
        titileH1.textContent = '15 puzzle';
    } else if (size == 5) {
        document.title = "24 PUZZLE";
        titileH1.textContent = '24 puzzle';
    }
}

//create new element than solved.
function puzzleSolved(solved) {
    if (solved) {
        setTimeout(() => {
            vibrate([100, 100, 200, 300]);
            let element = document.createElement('div');
            element.innerHTML = '<span>you won!!! &#127942;</span>';
            element.classList.add('boardBlack');
            board.append(element);
        }, 400);
    }
    else {
        if (document.querySelector('.boardBlack')) removeBoard();

    }
}

function removeBoard() {
    document.querySelector('.boardBlack').remove();
}

function vibrate(valMs) {
    if (navigator.vibrate !== undefined) {
        navigator.vibrate(valMs);
    }
}
