<template>
    <p>RESULTADOS</p>
    <div class="grid-results">
      <article id="results" class="article" v-for="result in getFilms">
          <div class="image">
              <img @click="showDetails" src="../assets/spiderman2.png" />
          </div>
          <div class="name">{{ result.primaryTitle }}</div>
          <div class="rating">{{ result.averageRating }}</div>
          <CardDetail v-if="isDetail" :result="result" />
      </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CardDetail from "./cardDetail.vue";

export default defineComponent ({
  name: "ResultCard",
  components: {
    CardDetail,
  },
  data: function () {
    return {
        isDetail: false,
        images: [] as string[],
    };
  },
  computed: {
    getFilms() {
      console.log(this.$store.getters.allFilms.hits);
      return this.$store.getters.allFilms.hits;
    }
  },
  methods: {
    showDetails(){
      this.isDetail = true;
    }
  }
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