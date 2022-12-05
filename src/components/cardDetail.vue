<template>
  <div class="card">
    <article id="card" class="article">
        <div class="image">
          <img class="imgDetail" src="../assets/spiderman2.png" />
        </div>
        <div class="name">{{ result.primaryTitle }}</div>
        <div class="rating">⭐ {{ result.averageRating }} </div>
        <div class="genres">
          Genres:
          <ul v-for="genre in result.genres">
            <li>{{ genre }}</li>
          </ul>
        </div>
        <div class="votes">Number of votes: {{ result.numVotes }}</div>
        <div class="duration">Duration: {{ result.runtimeMinutes }} minutes</div>       
        <div class="director" v-if="getDirector">Director: {{ getDirector }}</div>

    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "CardDetail",
  props: ['result'],
  data: function () {
    return {
        films: {} as any,
        images: [] as string[],
        retrn: true,
        isDetail: this.$store.state.isDetail,
        actors: [] as string[]
    };
  },
  mounted() {
    this.$store.dispatch('getDirector', this.result.directors[0].nconst)
  },
  computed: {
    getDirector() {
      return this.$store.state.director[0]?.primaryName;
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
  align-items: center;
}
</style>