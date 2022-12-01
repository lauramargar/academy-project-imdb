<template>
  <div class="card">
    <article id="card" class="article">
        <div class="image">
          <img @click="showDetails()" class="imgDetail" src="../assets/spiderman2.png" />
        </div>
        <div class="name">{{ result.primaryTitle }}</div>
        <div class="rating">⭐ {{ result.averageRating }}</div>
        <div class="genres">
          Genres:
          <ul v-for="genre in result.genres">
            <li>{{ genre }}</li>
          </ul>
        </div>
        <div class="votes">Number of votes: {{ result.numVotes }}</div>
        <div class="duration">Duration: {{ result.runtimeMinutes }} minutes</div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import createStore from "../store/index";

export default defineComponent ({
  name: "CardDetail",
  data: function () {
    return {
        films: {} as any,
        images: [] as string[],
        retrn: true,
        result: createStore.state.filmDetail,
        isDetail: createStore.state.isDetail,
    };
  },
  methods: {
    /*returnResults(){
      this.retrn = false;
      this.$emit("retrn", this.retrn);
    },*/
    showDetails(){
      this.isDetail = false;
      createStore.dispatch("getIsDetail",this.isDetail);
    }
  }
});

</script>
<style>
.imgDetail{
  height: 200px;
  
}
.name {
  font-size: 25px;
  font-weight: 500;
}
li {
  list-style-position: inside;
}
</style>