const emojis = ["🍎", "🐶", "🌸", "🍎", "🐶", "🌸", "🌞", "🌞", "🍩"];
let shuffled = emojis.sort(() => 0.5 - Math.random());
const grid = document.getElementById('grid');
let firstTile = null;
let lockBoard = false;
let matchedCount = 0;

shuffled.forEach((emoji, index) => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.dataset.emoji = emoji;
  tile.dataset.index = index;
  tile.innerText = "❓";

  tile.addEventListener('click', () => {
    if (lockBoard || tile.classList.contains('matched') || tile === firstTile) return;

    tile.innerText = tile.dataset.emoji;

    if (!firstTile) {
      firstTile = tile;
    } else {
      if (firstTile.dataset.emoji === tile.dataset.emoji) {
        firstTile.classList.add('matched');
        tile.classList.add('matched');
        matchedCount += 2;
        if (matchedCount === emojis.length) {
          document.getElementById('message').style.display = 'block';
        }
        firstTile = null;
      } else {
        lockBoard = true;
        setTimeout(() => {
          firstTile.innerText = "❓";
          tile.innerText = "❓";
          firstTile = null;
          lockBoard = false;
        }, 700);
      }
    }
  });

  grid.appendChild(tile);
});
