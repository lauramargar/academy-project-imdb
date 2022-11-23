<template>
    <p>RESULTADOS</p>
    <div class="grid-results">
      <article id="results" class="article" v-for="i=0 in 12">
          <div class="image">
              <!--<img :src="images[i]" />-->
              <img src="../assets/spiderman2.png" />
          </div>
          <div class="name">{{ names[i] }}</div>
          <div class="rating">{{ averages[i] }}</div>
      </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Find } from "../types/result.model";

export default defineComponent ({
  name: "ResultCard",
  data: function () {
    return {
        films: {} as any,
        names: [] as string[],
        averages: [] as number[],
        images: [] as string[],
    };
  },
  async mounted () {
    this.films = await Find.fetchFilms();
    this.films.hits.forEach((hit: { primaryTitle: string; averageRating: number; }) => {
        this.names.push(hit.primaryTitle);
        this.averages.push(hit.averageRating);
    });
    /*for(let i = 0; i<12; i++){
      const poster = await Find.fetchImage(this.names[i]);
      this.images.push(poster.Poster);
    }*/
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

</style>