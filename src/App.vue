<template>
 <div id="app">
    <div id="start" v-if="!isOpen">
      <h1>START SEARCHING FILMS</h1>
      <button @click="isOpen = true" class="searchBtn">Search >></button>
    </div>
    <MainModal v-if="isOpen && !isFilter">
      <div class="mainModal">
        <span class='arrowUp' @click="scrollSliderUp"></span>
        <div class="slider">
          <div class="box">
            <div id="emotions" class="filter">
              <EmotionsFilter :result="facet" @list="changeCat" />
            </div>
            <div id="categories" class="filter">
              <p>Choose a category:</p>
              <div class="list-cat">
                <article v-for="item in listCat" :key="item">
                  <input type="radio" /> {{ item }}
                </article>
              </div>
            </div>
            <div id="duration" class="filter">
              <p>Select an interval for the film duration:</p>
              <SliderFilter />
            </div>
            <div id="year" class="filter">
              <p>Select an interval for a year or a decade:</p>
              <SliderFilter />
            </div>
          </div>
        </div>
        <span class='arrowDown' @click="scrollSliderDown"></span>
        <button class="apply" @click="isFilter = true">Apply Filters >></button>
      </div>
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
      <button @click="isFilter = false" class="apply">Return to filters</button>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import datos from "./components/data.json";
import response from "./components/facets.json";
import EmotionsFilter from "./components/emotions.vue";
import SliderFilter from "./components/slider.vue";
import { FacetModel } from "./types/result.model";
import { ResponseModel } from "./types/result.model";
import { ResultModel } from "./types/result.model";

export default defineComponent({
  name: "App",
  components: {
    EmotionsFilter,
    SliderFilter,
  },
  data: function () {
    return {
      datos,
      listCat: [""],
      name: datos.hits[0].primaryTitle,
      rating: datos.hits[0].averageRating,
      isOpen: false,
      isFilter: false,
      facet: mapResponse(response),
    };
  },
  methods: {
    changeCat(list: string[]) {
      this.listCat = list;
    },
    
    scrollSliderDown() {
      const slider = document.querySelector(".slider");
      const box = document.querySelector(".filter") as HTMLElement;
      console.log("hola");
      slider?.scrollTo({
        top: box?.offsetHeight + slider.scrollTop
      });
    },
    scrollSliderUp() {
      const slider = document.querySelector(".slider");
      const box = document.querySelector(".filter") as HTMLElement;
      slider?.scrollTo({
        top: slider.scrollTop - box?.offsetHeight
      });
    },
  },
});
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
}
.mainModal {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1{
  color: white;
  position: absolute;
  bottom: 50%;
  font-size: 50px;
}
#start {
  height: 100vh;
  background-image: url("./assets/fondo3.png");
  background-size: cover;
  background-repeat:no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
p {
  font-size: 30px;
}
.slider {
  position: relative;
  align-items: center;
  height: 80vh;
  overflow: scroll;
  scroll-snap-type: y mandatory;
  padding: 0;
  margin: 0;
}
.box {
 gap: 20px;
 align-items: center;
}
.filter {
  width: 100%;
  height: 80vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.arrowDown, .arrowUp {
    position: relative;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 5px;
    background-color: rgb(65, 65, 65);
}
.arrowDown{
  margin-bottom: 10px;
}
.arrowDown::before {
    content: "";
    position: absolute;
    top: 7px;
    left: 5px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 14px solid white;
}
.arrowUp::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 14px solid white;
}
.searchBtn {
  padding: .375rem .75rem;
  border: 1px solid #14467b;
  border-radius: .25rem;
  color: #14467b;
  transition: color .15s ease-in-out,
    background-color .15s ease-in-out;
  position: absolute;
  bottom: 40%;
  font-size: 20px;
}
.searchBtn:hover, .searchBtn:active, .searchBtn:focus {
  color: #fff;
  background-color: #14467b;
}
.apply {
  padding: .375rem .75rem;
  border: 1px solid rgb(72, 70, 70);
  border-radius: .25rem;
  color: rgb(72, 70, 70);
  transition: color .15s ease-in-out,
    background-color .15s ease-in-out;
  font-size: 20px;
}
.apply:hover, .apply:active, .apply:focus {
  color: #fff;
  background-color: rgb(72, 70, 70);
}
</style>
