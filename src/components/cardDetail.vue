<template>
    <p>RESULTADOS</p>
    <article id="results" class="article">
        <div class="image">
            <img alt="Spiderman" src="../assets/spiderman2.png" />
        </div>
        <div class="name">{{ name }}</div>
        <div class="rating">{{ rating }}</div>
    </article>
</template>
<script lang="ts">
import datos from "./data.json";
import { defineComponent } from "vue";

export default defineComponent ({
  name: "CardDetail",
  data: function () {
    return {
        datos,
        name: datos.hits[0].primaryTitle,
        rating: datos.hits[0].averageRating,
    };
  },
});

</script>
<style>

</style>