import { defineStore } from "pinia";

const API_BASE_URL = "https://card-game-vwhp.onrender.com"; // 你的 Render 後端網址

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => {
    let cardOrder = [
      { value: "a", isFront: true, matched: false, failed: false },
      { value: "b", isFront: true, matched: false, failed: false },
      { value: 'c', isFront: true, matched: false, failed: false },
      { value: 'd', isFront: true, matched: false, failed: false },
      { value: 'e', isFront: true, matched: false, failed: false },
      { value: 'a', isFront: true, matched: false, failed: false },
      { value: 'b', isFront: true, matched: false, failed: false },
      { value: 'c', isFront: true, matched: false, failed: false },
      { value: 'd', isFront: true, matched: false, failed: false },
      { value: 'e', isFront: true, matched: false, failed: false },
    ];

    return {
      cardOrder,
      flippedCards: [],
      countDown: 10,
      resultMessage: "",
      beforeGameStart: false,
      gameStart: false,
      gameOver: false,
      timer: null,
    };
  },
  getters: {
    showMessage() {
      if (this.gameOver && this.countDown === 0) return 'GAMEOVER';
      if (this.cardOrder.every(card => card.isFront)) return 'YOU WIN !';
      return '';
    },
    startBtnText() {
      if (this.gameOver) {
        return 'Try again';
      }
      return this.gameStart ? 'starting' : 'Get Start';
    },
    buttonClass(state) {
      return !state.gameStart || state.gameOver ? "" : 'opacity-50 pointer-events-none';
    }
  },
  actions: {
    start() {
      // fetch('http://localhost:3030/start', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ cardOrder: this.cardOrder })
      // })
      fetch(`${API_BASE_URL}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardOrder: this.cardOrder })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.flippedCards = [],
              this.gameOver = false;
            this.gameStart = true;
            this.cardOrder = this.cardOrder.map(card => ({
              ...card,
              isFront: false,
              matched: false,
              failed: false,
            }));
          }
        })
        .catch(error => {
          console.error("There was an error in start!", error);
        });
    },
    async clickCard(index) {
      if (this.gameStart && !this.cardOrder[index].isFront && this.countDown !== 0) {
        try {
          // const response = await fetch('http://localhost:3030/clickCard', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({ index })
          // });
          const response = await fetch(`${API_BASE_URL}/clickCard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
           });

          const data = await response.json();

          if (this.flippedCards.length < 2) {
            this.cardOrder[index].value = data.value;
            this.cardOrder[index].isFront = true;

            await this.checkCardValue(data.value, index);

            if (this.cardOrder.every(card => card.matched)) {
              setTimeout(() => {
                this.gameOver = true;
                clearInterval(this.timer);
                this.gameStart = false;
              }, 100);
            }
          }
        } catch (error) {
          console.error("There was an error!", error);
        }
      }
    },
    checkCardValue(value, index) {
      return new Promise((resolve) => {
        if (this.flippedCards.length >= 2) {
          resolve();
          return;
        }
        this.flippedCards.push({ value, index });

        if (this.flippedCards.length === 2) {
          if (this.flippedCards[0].value === this.flippedCards[1].value) {
            setTimeout(() => {
              this.cardOrder[this.flippedCards[0].index].matched = true;
              this.cardOrder[this.flippedCards[1].index].matched = true;
              this.flippedCards = [];
              resolve();
            }, 500);
          } else {
            setTimeout(() => {
              this.cardOrder[this.flippedCards[0].index].isFront = false;
              this.cardOrder[this.flippedCards[1].index].isFront = false;
              setTimeout(() => {
                this.cardOrder[this.flippedCards[0].index].value = null;
                this.cardOrder[this.flippedCards[1].index].value = null;
                this.flippedCards = [];
                resolve();
              }, 500);
            }, 500);
          }
        } else {
          resolve();
        }
      });
    },
    endGame() {
      this.cardOrder.forEach(card => {
        if (!card.matched) {
          try {
            // fetch('http://localhost:3030/endGame')
              fetch(`${API_BASE_URL}/endGame`)
              .then(response => response.json())
              .then(data => {
                this.cardOrder.forEach((card, index) => {
                  card.value = data[index].value;
                })
                card.isFront = true;
                  card.failed = true;
              })
          }
          catch (error) {
            console.error("There was an error!", error);
          };
        }
      });
    }
  }
}
)