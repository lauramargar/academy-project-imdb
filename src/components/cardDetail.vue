<template>
  <div class="card">
    <article id="card" class="article">
        <div class="image">
          <img class="imgDetail" :src="result.image" />
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
        <div class="director" v-if="(result.director?.length > 0)">Director: {{ result.director }}</div>
        <div class="director" v-if="(result.actors?.length > 0)">Actors: {{ result.actors }}</div>

    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "CardDetail",
  props: ['result','index'],
  data: function () {
    return {
        isDetail: this.$store.state.isDetail,
    };
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