<template>
  <div class="card">
    <article id="card" class="article">
        <div class="image">
            <img @click="showDetails(result)" src="../assets/spiderman2.png" />
        </div>
        <div class="name">{{ result.primaryTitle }}</div>
        <div class="rating">⭐ {{ result.averageRating }}</div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//import CardDetail from "./cardDetail.vue";
import createStore from "../store/index";

export default defineComponent ({
  name: "ResultCard",
  props: ['result'],
  data: function () {
    return {
        isDetail: createStore.state.isDetail,
        images: [] as string[],
        isFilter: true,
        show: false,
    };
  },
  /*computed: {
    getFilms() {
      console.log(this.$store.getters.allFilms.hits);
      return this.$store.getters.allFilms.hits;
    }
  },*/
  methods: {
    showDetails(item: any){
      this.isDetail = true;
      createStore.dispatch("getIsDetail",this.isDetail);
      createStore.dispatch("getDetailFilm",item);
    },
    changeBool(){
      this.isFilter = false;
      this.$emit("aux", this.isFilter);
    },
  }
});

</script>
<style>
.results {
  font-weight: bold;
}
.article {
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 8px 7px 12px 3px rgba(0, 0, 0, 0.6);
  padding: 1.5rem;
  margin: 20px;
  width: 275px;
  height: 525px;
}

</style>