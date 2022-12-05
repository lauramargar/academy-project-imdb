<template>
  <div class="card">
    <article id="card" class="article">
        <div class="image">
            <img src="../assets/spiderman2.png" />
        </div>
        <div class="name">{{ result.primaryTitle }}</div>
        <div class="rating">⭐ {{ result.averageRating }}</div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//import CardDetail from "./cardDetail.vue";
import createStore from "../store/index";

export default defineComponent ({
  name: "ResultCard",
  props: ['result', 'isDetail'],
  data: function () {
    return {
        isDetail: createStore.state.isDetail,
        images: [] as string[],
        isFilter: true,
        show: false,
    };
  },
  methods: {
    changeBool(){
      this.isFilter = false;
      this.$emit("aux", this.isFilter);
    },
  }
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
  width: 275px;
  height: 525px;
}

</style>