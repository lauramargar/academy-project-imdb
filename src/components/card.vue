<template>
    <p>RESULTADOS</p>
    <article id="results" class="article">
        <div class="image">
            <img alt="Spiderman" src="../assets/spiderman2.png" />
        </div>
        <div class="name" v-for="name in names">{{ name }}</div>
        <div class="rating" v-for="average in averages">{{ average }}</div>
    </article>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { FindCat } from "../types/result.model";

export default defineComponent ({
  name: "ResultCard",
  data: function () {
    return {
        films: {} as any,
        names: [] as string[],
        averages: [] as number[],
    };
  },
  async mounted () {
    this.films = await FindCat.fetchFilms();
  },
  methods: {
    getInfo() {
      this.films.hits.forEach((hit: { primaryTitle: string; averageRating: number; }) => {
        this.names.push(hit.primaryTitle);
        this.averages.push(hit.averageRating);
      });
    }
  }
});


</script>
<style>

</style>