const gameBoard = document.getElementById('game-board');
const moveCounter = document.getElementById('move-counter');
const restartButton = document.getElementById('restart-button');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

// Array of image sources (replace with your image paths)
const images = [
    'jaguar.jpg', 'jaguar.jpg', // Pair 1
    'squirrel.jpg', 'squirrel.jpg', // Pair 2
    'fox.jpg', 'fox.jpg'  // Pair 3
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    moveCounter.textContent = moves;

    shuffle(images);

    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const front = document.createElement('img');
        front.src = image;
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            moveCounter.textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === images.length / 2) {
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', createBoard);

// Initialize the game
createBoard();
  