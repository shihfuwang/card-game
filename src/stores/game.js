import { defineStore } from "pinia";

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => {
    let cardOrder = [
      { value: "a", isFront: true, matched: false },
      { value: "b", isFront: true, matched: false },
      { value: 'c', isFront: true, matched: false },
      { value: 'd', isFront: true, matched: false },
      { value: 'e', isFront: true, matched: false },
      { value: 'a', isFront: true, matched: false },
      { value: 'b', isFront: true, matched: false },
      { value: 'c', isFront: true, matched: false },
      { value: 'd', isFront: true, matched: false },
      { value: 'e', isFront: true, matched: false },
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
      fetch('http://localhost:3030/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardOrder: this.cardOrder })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.gameOver = false;
            this.gameStart = true;
            this.cardOrder = this.cardOrder.map(card => ({
              ...card,
              isFront: false,
              matchedL: false,
            }));
          }
        })
        .catch(error => {
          console.error("There was an error in start!", error);
        });
    },
    clickCard(index) {
      if (this.gameStart && !this.cardOrder[index].isFront && this.countDown !== 0) {
        fetch('http://localhost:3030/clickCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ index })
        })
          .then(response => response.json())
          .then(data => {
            if (this.flippedCards.length >= 2) {
              return
            }
            this.cardOrder[index].value = data.value;
            this.cardOrder[index].isFront = true;
            this.checkCardValue(data.value, index)
          })
          .catch(error => {
            console.error("There was an error!", error);
          });
      }
    },
    checkCardValue(value, index) {
      if (this.flippedCards.length >= 2) {
        return
      }
      this.flippedCards.push({ value, index });
      if (this.flippedCards.length === 2) {
        if (this.flippedCards[0].value === this.flippedCards[1].value) {
          this.cardOrder[this.flippedCards[0].index].matched = true;
          this.cardOrder[this.flippedCards[1].index].matched = true;
          this.flippedCards = [];
        } else {
          setTimeout(() => {
            this.cardOrder[this.flippedCards[0].index].isFront = false;
            this.cardOrder[this.flippedCards[1].index].isFront = false;
            this.flippedCards = [];
          }, 500)
        }
      }
    },
  }
}
)