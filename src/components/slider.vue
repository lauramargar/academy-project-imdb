<template>
  <div class="sliderFilter">
    <section class="range-slider container">
        <div class="range">
        <span class="output outputOne">{{ inputOne }}</span>
        <span class="output outputTwo">{{ inputTwo }}</span>
        </div>
        <span class="full-range"></span>
        <span class="incl-range"></span>
        <input class="rangeOne" name="rangeOne" min="1990" max="2021" step="1" type="range" v-model="inputOne" />
        <input class="rangeTwo" name="rangeTwo" min="1991" max="2022" step="1" type="range" v-model="inputTwo" />
    </section>
    <button class="sliderBtn" @click="outputInfo()" >Save</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import createStore from "../store/index";

export default defineComponent ({
  name: "SliderFilter",
  data: function () {
    return {
        inputOne: "2000",
        inputTwo: "2015",
    };
  },
  methods: {
    outputInfo(){
      createStore.dispatch("minYear",this.inputOne);
      createStore.dispatch("maxYear", this.inputTwo);
      createStore.dispatch("year", true);
    }
  }
});
</script>
<style>
.sliderBtn{
  padding: .375rem .75rem;
  border: 1px solid #14467b;
  border-radius: .25rem;
  color: #14467b;
  transition: color .15s ease-in-out,
    background-color .15s ease-in-out;
  bottom: 40%;
  font-size: 15px;
}
.sliderBtn:focus, .sliderBtn:active {
    content: "ok";
    font-size: 1.3rem;
    background-color: greenyellow;
    transform: scale(1);
}
.range {
  display: flex;
  flex-direction: row;
}
.range-slider {
  position: relative;
  width: 200px;
  height: 35px;
  text-align: center;
}
.range-slider input {
  pointer-events: none;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 15px;
  width: 200px;
  outline: none;
  height: 18px;
  margin: 0;
  padding: 0;
}
.range-slider input::-webkit-slider-thumb {
  pointer-events: all;
  position: relative;
  z-index: 1;
  outline: 0;
}
.range-slider input::-moz-range-thumb {
  pointer-events: all;
  position: relative;
  z-index: 10;
  -moz-appearance: none;
  width: 9px;
}
.range-slider input::-moz-range-track {
  position: relative;
  z-index: -1;
  background-color: rgba(0, 0, 0, 1);
  border: 0;
}
.range-slider input:last-of-type::-moz-range-track {
  -moz-appearance: none;
  background: none transparent;
  border: 0;
}
.range-slider input[type="range"]::-moz-focus-outer {
  border: 0;
}
.rangeValue {
  width: 30px;
}
.output {
  position: absolute;
  border: 1px solid #999;
  width: 40px;
  height: 30px;
  text-align: center;
  color: #999;
  border-radius: 4px;
  display: inline-block;
  align-items: center;
  font: bold 15px/30px Helvetica, Arial;
  transform: translate(-50%, -50%);
}
.output.outputTwo {
  left: 100%;
}
.container {
  position: relative;
  left: 35%;
}
input[type="range"] {
  -webkit-appearance: none;
  background: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 5px;
  border: none;
  border-radius: 3px;
  background: transparent;
}
input[type="range"]::-ms-track {
  height: 5px;
  background: transparent;
  border: none;
  border-radius: 3px;
}
input[type="range"]::-moz-range-track {
  height: 5px;
  background: transparent;
  border: none;
  border-radius: 3px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #555;
  margin-top: -5px;
  position: relative;
  z-index: 10000;
}
input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #555;
  margin-top: -5px;
  position: relative;
  z-index: 10000;
}
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #555;
  margin-top: -5px;
  position: relative;
  z-index: 10000;
}
input[type="range"]:focus {
  outline: none;
}
.full-range,
.incl-range {
  width: 100%;
  height: 5px;
  left: 0;
  top: 21px;
  position: absolute;
  background: #ddd;
}
.incl-range {
  background: gold;
}
</style>