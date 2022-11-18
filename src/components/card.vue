<template>
    <p>RESULTADOS</p>
    <article id="results" class="article">
        <div class="image">
            <img alt="Spiderman" src="../assets/spiderman2.png" />
        </div>
        <div class="name">{{ name }}</div>
        <div class="rating">{{ rating }}</div>
    </article>
    {{findCat()}}
</template>
<script lang="ts">
import datos from "../components/data.json";
import { defineComponent } from "vue";

export default defineComponent ({
  name: "ResultCard",
  data: function () {
    return {
        datos,
        name: datos.hits[0].primaryTitle,
        rating: datos.hits[0].averageRating,
    };
  },
  methods: {
    async findCat () {
        const response = await fetch("http://localhost:8080/search", {});
        const data = await response.json();
        console.log(data);
        return data;
    },
  }
});

</script>
<style>

</style>