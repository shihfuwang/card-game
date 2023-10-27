const express = require('express');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

let gameState = {
  cardOrder: [],
  flippedCards: [],
};

function shuffleCards() {
  let cards = ["a", "b", "c", "d", "e", "a", "b", "c", "d", "e"];
  cards.sort(() => Math.random() - 0.5);
  return cards.map(value => ({ value, isFront: false }));
}


app.post('/start', (req, res) => {
  try {
    gameState.cardOrder = shuffleCards();
    gameState.flippedCards = [];
    res.json({ success: true });
  } catch (error) {
    console.error("Error in /start: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/clickCard', (req, res) => {
  const postIndex = req.body.index;
  const value = gameState.cardOrder[postIndex].value;
  gameState.cardOrder[postIndex].isFront = true;

  res.json({
    value: value,
  });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});