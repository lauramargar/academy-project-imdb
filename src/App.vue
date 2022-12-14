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
              <EmotionsFilter :result="facet" @list="changeCat" @click="scrollSliderDown" />
            </div>
            <div id="categories" class="filter">
              <p>Choose a category:</p>
              <div class="list-cat">
                <article v-for="item in listCat" :key="item">
                  <label class="label"><input class="check" id="check" type="checkbox" @click="addGenre(item)" :checked="isChecked(item)"/> {{ item }} </label>
                </article>
              </div>
            </div>
            <div id="duration" class="filter">
              <p>Select an interval for the film duration:</p>
              <DurationSlider />
            </div>
            <div id="year" class="filter">
              <p>Select an interval for a year or a decade:</p>
              <SliderFilter />
            </div>
          </div>
        </div>
        <span class='arrowDown' @click="scrollSliderDown"></span>
        <button class="apply" @click="searchWithFilters">Apply Filters >></button>
      </div>
    </MainModal>
    
    <main v-if="isFilter">
      <p class="results">RESULTS</p>
      <div class="grid-results">
        <div class="grid" v-for="(result, index) in getFilms">
          <Flip>
            <template #front>
              <ResultCard :result="result" />
            </template>
            <template #back>
              <CardDetail :result="result" :index="index" />
            </template>
          </Flip>
        </div>
      </div>
      <img src="./assets/arrow.png" v-if="!isDetail" @click="returnFilters" class="arrow" />
      <!--<button v-if="!isDetail" @click="returnFilters" class="apply">Return to filters</button>-->
    </main>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmotionsFilter from "./components/emotions.vue";
import SliderFilter from "./components/slider.vue";
import DurationSlider from "./components/durationSlider.vue";
import ResultCard from "./components/card.vue";
import CardDetail from "./components/cardDetail.vue";
import Flip from "./components/flip.vue";
import { FacetModel } from "./types/result.model";
import { ResponseModel } from "./types/result.model";
import { ResultModel } from "./types/result.model";
import { Find } from "./types/result.model";

export default defineComponent({
  name: "App",
  components: {
    EmotionsFilter,
    SliderFilter,
    ResultCard,
    DurationSlider,
    CardDetail,
    Flip,
  },
  data: () => {
    return {
      listCat: [""],
      isOpen: false,
      isFilter: false,
      facet: {facets: [] } as any,
      minYear: 0,
      maxYear: 0,
      values: [] as string[]
    };
  },
  computed: {
    getFilms() {
      return this.$store.getters.allFilms.hits;
    },
    isDetail() {
      return this.$store.state.isDetail;
    }
  },
  async mounted () {
    const response = await Find.fetchCat();
    this.facet = mapResponse(response);
  },
  methods: {
    returnFilters(){
      this.isFilter = false;
    },
    isChecked(item: string) {
     return this.$store.state.selectedFilters.includes(item.charAt(0).toUpperCase() + item.slice(1));
    },
    toggleCard(film: {}){
      this.$store.dispatch("getDetailFilm", film);
    },
    addGenre(item: string){
      this.$store.dispatch("genre", true);
      this.$store.dispatch("addGenreFilter", item.charAt(0).toUpperCase() + item.slice(1));
    },
    changeCat(list: string[]) {
      this.listCat = list;
    },
    outputYear(min: number, max: number){
      //this.year = true;
      this.minYear = min;
      this.maxYear = max;
    },
    scrollSliderDown() {
      const slider = document.querySelector(".slider");
      const box = document.querySelector(".filter") as HTMLElement;
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
    searchWithFilters() {
      this.isFilter = true;
      this.$store.dispatch("findFilms");
    }
  },
});

const mapResponse = (response: ResponseModel): ResultModel => {
  return {
    facets: mapFacets(response.facets),
  };
};

const mapFacets = (facets: FacetModel[]): FacetModel[] => {
  // Aqui es donde meterias tu logica para guardar los filtros cuando te vienen de la respuesta
  // Comprobariamos si el facet es el de categorias o el que queremos usar para agrupar emociones
  const mappedFacets: FacetModel[] = [];
  facets.forEach((facet) => {
    if (facet.facet === "facetGenres") {
      // Aqui hacemos la agrupacion
      // Recorremos los values del facet categorias y los vamos agrupando
      const newFacet: FacetModel[] = [];
      facet.values.forEach((value) => {
        // Sacamos la emocion a la que pertenece
        const emotions = getKeyByValue(value.id as string);
        // Generamos un nuevo facet en base a esa emocion, para ello miramos si la hemos encontrado
        if (emotions.length > 0) {
          // Antes de a??adir un facet nuevo, miramos sin el array de facets que estamos creando, ya existe
          // alguna entrada para esa emocion, si existe, a??adimos un value mas.
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
    joy: ["comedy", "action", "adventure", "animation", "fantasy", "reality-tv", "family", "sci-fi"],
    love: ["romance", "music", "musical"],
    neutral: ["adult","short","reality-tv","game-show","talk-show","western"],
    scary: ["mistery", "horror", "crime", "thriller"],
    sad: ["drama", "war", "crime", "western", "comedy"],
    interesting: ["biography", "documentary", "news", "history", "sport", "talk-show"]
  }; 
  return Object.keys(emotions).filter((key) => emotions[key].includes(value));
}
</script>

<style>
.arrow{
  position: sticky;
  width: 100px;
  bottom: 85%;
  right: 90%;
}
.grid-results {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.label{
  text-transform: capitalize;
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
  margin: 40px;
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
