const emojis = ['🍓', '🌸', '🍩']; // 3 emojis → 6 cards (pairs)
let cards = [...emojis, ...emojis];

// Add 3 empty cards to fill 9 spots (3x3 grid)
for (let i = 0; i < 3; i++) cards.push('empty');

cards = cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const messageBox = document.getElementById('messageBox');
const restartBtn = document.getElementById('restartBtn');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function showMessage(text, delay = 0) {
  setTimeout(() => {
    messageBox.textContent = text;
  }, delay);
}

function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;

  if (emoji === 'empty') {
    card.classList.add('empty');
    card.textContent = '';
    return card;
  }

  card.textContent = '❓';

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped') || card === firstCard) return;

    card.classList.add('flipped');
    card.textContent = emoji;

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      matchedPairs++;
      resetTurn();
      if (matchedPairs === emojis.length) {
        setTimeout(() => {
          messageBox.textContent = '🎉 Waah Chandini Ji! You did it brilliantly! 💕';
          restartBtn.style.display = 'inline-block';
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.textContent = '❓';
        secondCard.classList.remove('flipped');
        secondCard.textContent = '❓';
        resetTurn();
      }, 1000);
    }
  });

  return card;
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  showMessage('Chandini Ji, get ready! 🧠 Let’s test your brain! 💗', 500);
  cards.forEach(emoji => gameBoard.appendChild(createCard(emoji)));
  restartBtn.style.display = 'none';
}

restartBtn.addEventListener('click', () => {
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  messageBox.textContent = 'Chandini Ji, get ready! 🧠 Let’s test your brain! 💗';
  restartBtn.style.display = 'none';
  gameBoard.innerHTML = '';

  cards = [...emojis, ...emojis];
  for (let i = 0; i < 3; i++) cards.push('empty');
  cards = cards.sort(() => 0.5 - Math.random());

  cards.forEach(emoji => gameBoard.appendChild(createCard(emoji)));
});

startGame();
