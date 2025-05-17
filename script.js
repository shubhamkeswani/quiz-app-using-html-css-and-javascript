const emojis = ["🌸", "🌟", "🍓", "🌸", "🌟", "🍓", "🍩", "🍩", "🍒"];
const gameBoard = document.getElementById("gameBoard");
let selected = [];
let matched = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const shuffled = shuffle(emojis.slice());
  shuffled.forEach((emoji, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.emoji = emoji;
    tile.dataset.index = index;
    tile.innerText = "❓";
    tile.addEventListener("click", handleClick);
    gameBoard.appendChild(tile);
  });
}

function handleClick(e) {
  const tile = e.target;
  const emoji = tile.dataset.emoji;

  if (selected.length === 2 || tile.classList.contains("revealed")) return;

  tile.innerText = emoji;
  tile.classList.add("revealed");
  selected.push(tile);

  if (selected.length === 2) {
    const [first, second] = selected;
    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add("matched");
      second.classList.add("matched");
      matched.push(first, second);
      selected = [];

      if (matched.length === emojis.length) {
        document.getElementById("message").classList.remove("hidden");
      }
    } else {
      setTimeout(() => {
        first.innerText = "❓";
        second.innerText = "❓";
        first.classList.remove("revealed");
        second.classList.remove("revealed");
        selected = [];
      }, 1000);
    }
  }
}

createBoard();
