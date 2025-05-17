const emojis = ["🌟", "🍓", "🌸", "🍩", "🍒", "🌟", "🍓", "🌸", "🍩"];
let shuffled = emojis.sort(() => 0.5 - Math.random());

const board = document.getElementById("board");
let selected = [];
let matched = [];

shuffled.forEach((emoji, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;
  board.appendChild(card);

  card.addEventListener("click", () => {
    if (selected.length < 2 && !selected.includes(card) && !card.classList.contains("matched")) {
      card.textContent = emoji;
      selected.push({ card, emoji });

      if (selected.length === 2) {
        setTimeout(() => {
          const [first, second] = selected;
          if (first.emoji === second.emoji) {
            first.card.classList.add("matched");
            second.card.classList.add("matched");
            matched.push(first.card, second.card);
          } else {
            first.card.textContent = "";
            second.card.textContent = "";
          }

          selected = [];

          // Show message if all matched
          if (matched.length === emojis.length) {
            document.getElementById("message").classList.remove("hidden");
          }

        }, 600);
      }
    }
  });
});
