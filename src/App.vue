<template>
  <div id="app">
    <div id="start" v-if="!isOpen">
      <img alt="Vue logo" src="./assets/logo.png" />
      <h1>START SEARCHING FILMS</h1>
      <button @click="isOpen = true">Search</button>
    </div>
    <MainModal v-if="isOpen && !isFilter">
      <div id="emotions">
        <EmotionsFilter v-bind:facet="facet"></EmotionsFilter>
        <!--<p>¿How do you feel?</p>
        <button class="joyBtn" @click="changeCat('joy')">😊</button>
        <button class="loveBtn" @click="changeCat('love')">😍</button>
        <button class="neutralBtn" @click="changeCat('neutral')">😐</button>
        <button class="scaryBtn" @click="changeCat('scary')">😧</button>
        <button class="sadBtn" @click="changeCat('sad')">😢</button>-->
      </div>
      <div id="categories">
        <p>Choose a category:</p>
        <div class="list-cat">
          <article v-for="item in list" :key="item">
            <!--<button>{{ item }}</button>-->
            <input type="radio" /> {{ item }}
          </article>
        </div>
      </div>
      <div id="duration">
        <p>Select an interval for the film duration:</p>
        <section class="range-slider container">
          <div class="range">
            <span class="output outputOne">{{ inputOne }}</span>
            <span class="output outputTwo">{{ inputTwo }}</span>
          </div>
          <span class="full-range"></span>
          <span class="incl-range"></span>
          <input
            class="rangeOne"
            name="rangeOne"
            min="0"
            max="100"
            step="1"
            type="range"
            v-model="inputOne"
          />
          <input
            class="rangeTwo"
            name="rangeTwo"
            min="0"
            max="100"
            step="1"
            type="range"
            v-model="inputTwo"
          />
        </section>
      </div>
      <button class="apply" @click="isFilter = true">Apply Filters</button>
    </MainModal>
    <main v-if="isFilter">
      <p>RESULTADOS</p>
      <article id="results" class="article">
        <div class="image">
          <img alt="Spiderman" src="./assets/spiderman2.png" />
        </div>
        <div class="name">{{ name }}</div>
        <div class="rating">{{ rating }}</div>
      </article>
      <button @click="isFilter = false">Return to filters</button>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import datos from "./components/data.json";
import response from "./components/facets.json";
import EmotionsFilter from "./components/emotions.vue";
import { FacetModel } from "./types/result.model";
import { ResponseModel } from "./types/result.model";
import { ResultModel } from "./types/result.model";



export default defineComponent({
  name: "App",
  components: {
    EmotionsFilter,
  },
  data: function () {
    return {
      datos,
      list: [""],
      name: datos.hits[0].primaryTitle,
      rating: datos.hits[0].averageRating,
      isOpen: false,
      isFilter: false,
      facet: mapResponse(response),
      inputOne: "10",
      inputTwo: "90",
    };
  },
  /*methods: {
    changeCat(emotion: string) {
      this.list = [];
      for (let i = 0; i < this.facet.facets.length; i++) {
        if (emotion === this.facet.facets[i].facet) {
          for (let x = 0; x < this.facet.facets[i].values.length; x++) {
            this.list.push(this.facet.facets[i].values[x].id as string);
          }
        }
      }
    },
  },*/
});
/*function calcPosition(input: string) {
  // outputOne.style.left = this.value / this.getAttribute('max') * 100 + '%';
  const outputOne = document.getElementsByClassName(
    "output outputOne"
  ) as HTMLCollectionOf<HTMLElement>;
  outputOne[0].style.left =
    ((input as unknown as number) /
      document.getElementsByClassName("rangeOne").max) *
      100 +
    "%";
}*/
const mapResponse = (response: ResponseModel): ResultModel => {
  return {
    id: response.id,
    title: response.name,
    facets: mapFacets(response.facets),
  };
};

const mapFacets = (facets: FacetModel[]): FacetModel[] => {
  // Aqui es donde meterias tu logica para guardar los filtros cuando te vienen de la respuesta
  // Comprobariamos si el facet es el de categorias o el que queremos usar para agrupar emociones
  const mappedFacets: FacetModel[] = [];
  facets.forEach((facet) => {
    if (facet.facet === "categories") {
      // Aqui hacemos la agrupacion
      // Recorremos los values del facet categorias y los vamos agrupando
      const newFacet: FacetModel[] = [];

      facet.values.forEach((value) => {
        // Sacamos la emocion a la que pertenece
        const emotions = getKeyByValue(value.id as string);
        // Generamos un nuevo facet en base a esa emocion, para ello miramos si la hemos encontrado
        if (emotions.length > 0) {
          // Antes de añadir un facet nuevo, miramos sin el array de facets que estamos creando, ya existe
          // alguna entrada para esa emocion, si existe, añadimos un value mas.
          const isFacetCreated = newFacet.filter((facet) =>
            emotions.includes(facet.facet)
          );
          if (isFacetCreated.length > 0) {
            isFacetCreated.forEach((facet) => facet.values.push(value));
          } else {
            emotions.forEach((emotion) => {
              newFacet.push({
                facet: emotion,
                type: facet.type,
                values: [value],
              });
            });
          }
        }
      });
      mappedFacets.push(...newFacet);
    }
    // Si no, mapeamos directamente ese facet,
    else {
      mappedFacets.push({
        facet: facet.facet,
        type: facet.type,
        values: facet.values,
      });
    }
  });
  return mappedFacets;
};

function getKeyByValue(value: string) {
  const emotions: Record<string, string[]> = {
    joy: ["comedy", "cartoon", "scifi"],
    scary: ["terror", "horror"],
    sad: ["fantasy", "asd", "comedy"],
  };
  return Object.keys(emotions).filter((key) => emotions[key].includes(value));
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.article {
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 8px 7px 12px 3px rgba(0, 0, 0, 0.6);
  padding: 1.5rem;
  margin: 20px;
  width: max-content;
}
#emotions button {
  font-size: 40px;
  border: none;
  background-color: white;
  border-radius: 40%;
  margin-left: 30px;
  margin-right: 30px;
}
#emotions button:hover {
  background-color: #b4b6b8;
}
#emotions button:focus {
  background-color: #b4b6b8;
}
#categories {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}
.list-cat {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#categories button {
  font-size: 30px;
  border: 2px;
  border-radius: 10%;
  margin-left: 30px;
  margin-right: 30px;
}
#categories button:hover {
  background-color: #8a8c8f;
}
#categories button:focus {
  background-color: #8a8c8f;
}
#duration {
  margin-top: 50px;
  margin-bottom: 50px;
}
.apply {
  margin-top: 50px;
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
  bottom: 75%;
  left: 50%;
  transform: translate(-50%, 0);
}
.output.outputTwo {
  left: 100%;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin-top: 60px;
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
