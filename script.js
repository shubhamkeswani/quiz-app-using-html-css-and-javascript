const emojis = ['🍓', '🌸', '🍩']; // 3 emojis
let cards = [...emojis, ...emojis, ...emojis]; // total 9
cards = cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const messageBox = document.getElementById('messageBox');

let flippedCards = [];
let matchedGroups = 0;

function showMessage(text, delay = 0) {
  setTimeout(() => {
    messageBox.textContent = text;
  }, delay);
}

function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.textContent = '❓';

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || flippedCards.includes(card) || flippedCards.length === 3) return;

    card.classList.add('flipped');
    card.textContent = emoji;
    flippedCards.push(card);

    if (flippedCards.length === 3) {
      const [a, b, c] = flippedCards;
      const allMatch = a.dataset.emoji === b.dataset.emoji && b.dataset.emoji === c.dataset.emoji;

      if (allMatch) {
        matchedGroups++;
        flippedCards = [];
        if (matchedGroups === 3) {
          showMessage('💖 Get well soon Chandni Ji 💖', 500);
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.textContent = '❓';
          });
          flippedCards = [];
        }, 1000);
      }
    }
  });

  return card;
}

function startGame() {
  showMessage('Chandini Ji, let’s test your brain! 🧠💗');
  cards.forEach(emoji => gameBoard.appendChild(createCard(emoji)));
}

startGame();
