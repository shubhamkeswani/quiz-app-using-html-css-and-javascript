const emojis = ['🍓', '🌸', '🍩'];
let cards = [];
let flippedCards = [];
let matchedGroups = 0;
let timer = 0;
let timerInterval;

const gameBoard = document.getElementById('gameBoard');
const messageBox = document.getElementById('messageBox');
const timerBox = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const matchSound = document.getElementById('matchSound');
const winSound = document.getElementById('winSound');

function showMessage(text, delay = 0) {
  setTimeout(() => {
    messageBox.textContent = text;
  }, delay);
}

function updateTimer() {
  timer++;
  timerBox.textContent = `⏱ Time: ${timer}s`;
}

function resetGame() {
  cards = [...emojis, ...emojis, ...emojis].sort(() => 0.5 - Math.random());
  flippedCards = [];
  matchedGroups = 0;
  timer = 0;
  gameBoard.innerHTML = '';
  restartBtn.style.display = 'none';
  
  // Updated starting message:
  showMessage('Ananya Ji, let’s test your memory! 🧠💗');
  timerBox.textContent = '⏱ Time: 0s';

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  cards.forEach(emoji => gameBoard.appendChild(createCard(emoji)));
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
        matchSound.play();

        if (matchedGroups === 3) {
          clearInterval(timerInterval);
          // Updated final message without extra emoji except the smiley you wanted:
          showMessage('Wow, you have such an amazing memory! Should I start preparing for your next memory test already? 😄', 500);
          winSound.play();
          restartBtn.style.display = 'inline-block';
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

restartBtn.addEventListener('click', resetGame);

window.onload = resetGame;
