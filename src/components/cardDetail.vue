<template>
    <div class="card">
      <article id="results" class="article">
          <div class="image">
              <img src="../assets/spiderman2.png" />
          </div>
          <div class="name">{{ result.primaryTitle }}</div>
          <div class="rating">{{ result.averageRating }}</div>
          <div class="genres">{{ result.genres }}</div>
          <div class="votes">{{ result.numVotes }}</div>
          <div class="duration">{{ result.runtimeMinutes }}</div>
          <div class="year">{{ result.startYear }}</div>
      </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "CardDetail",
  props: {
    result: {} as any,
  },
  data: function () {
    return {
        films: {} as any,
        images: [] as string[],
    };
  },
});

</script>
<style>

.grid-results{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
/*img:hover{
  width: 1.3em;
  height: 1.3em;
}*/

</style>