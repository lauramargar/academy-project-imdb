<template>
    <div class="scene scene--card">
      <div
        class="card"
        @click="cardOne == 'start' ? (cardOne = 'flipped') : (cardOne = 'start')"
        v-bind:class="{ flipme: cardOne == 'flipped' }"
      >
        <div class="card__face card__face--front"><slot name="front" /></div>
        <div class="card__face card__face--back"><slot name="back" /></div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "Flip",
    data() {
      return {
        cardOne: "start",
      };
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .card {
    width: 300px;
    height: 580px;
    padding: 1.5rem;
    margin: 25px;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
  }
  
  .card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  
  .card__face--back {
    transform: rotateY(180deg);
  }
  
  /* this style is applied when the card is clicked */
  .flipme {
    transform: rotateY(180deg);
  }
  </style>