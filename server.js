const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3030; // 讓 Render 使用動態 PORT

app.use(express.json());
app.use(cors());

// 提供 Vue 前端的靜態檔案
app.use(express.static(path.join(__dirname, 'dist')));

// 確保 Vue 前端的路由可以正確運作
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

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

app.get('/endGame', (req, res) => {
  res.json(gameState.cardOrder);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});