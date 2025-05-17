const emojis = ['🍓', '🌸', '🍩', '🌟', '🍒'];
let cards = [...emojis, ...emojis];
cards = cards.sort(() => 0.5 - Math.random());

const memoryGame = document.querySelector('.memory-game');
const messageBox = document.getElementById('messageBox');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function showMessage(text, delay = 0) {
  setTimeout(() => {
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');
  }, delay);
}

function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.innerHTML = '❓';

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.innerHTML = emoji;

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
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.innerHTML = '❓';
        secondCard.classList.remove('flipped');
        secondCard.innerHTML = '❓';
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
  cards.forEach(emoji => memoryGame.appendChild(createCard(emoji)));
}

startGame();
