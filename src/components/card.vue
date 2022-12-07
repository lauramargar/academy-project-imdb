<template>
  <div class="card">
    <article id="card" class="article">
        <div class="image">
          <img :src="result.image" />        
        </div>
        <div class="name">{{ result.primaryTitle }}</div>
        <div class="rating">⭐ {{ result.averageRating }}</div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "ResultCard",
  props: ['result'],
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
  width: 300px;
  height: 580px;
}

</style>