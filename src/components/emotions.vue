<template>
  <div id="emotions">
    <p>¿How do you feel?</p>
      <button class="joyBtn" @click="changeCat('joy')" >😊</button>
      <button class="loveBtn" @click="changeCat('love')">😍</button>
      <button class="neutralBtn" @click="changeCat('neutral')">😐</button>
      <button class="scaryBtn" @click="changeCat('scary')">😧</button>
      <button class="sadBtn" @click="changeCat('sad')">😢</button>
      <button class="intertngBtn" @click="changeCat('interesting')">🤔</button>
  </div>
</template>
<script lang="ts">
import { ResultModel } from "../types/result.model";
import { defineComponent } from "vue";

export default defineComponent ({
  name: "EmotionsFilter",
  props: {
    result: {facets: [] } as any,
  },
  data: function () {
    return {
      list: [""],
    };
  },
  methods: {
    async changeCat(emotion: string) {
      this.list = [];
      console.log("lista vacía");
      console.log(this.result);
      for (let i = 0; i < (this.result).facets.length; i++) {
        console.log("antes de encontrar emoción");
        console.log(this.result.facets[i].facet);
        console.log(emotion);
        if (emotion === this.result.facets[i].facet) {
          console.log("encuentro emoción");
          for (let x = 0; x < this.result.facets[i].values.length; x++) {
            this.list.push(this.result.facets[i].values[x].id as string);
          }
        }
      }
      console.log("lista llena");
      console.log(this.list);
      this.$emit("list", this.list);
    },
  },
});
</script>
<style scoped>
p {
  font-size: 30px;
}
#emotions button {
  font-size: 40px;
  border: none;
  background-color: white;
  border-radius: 40%;
  margin-left: 30px;
  margin-right: 30px;
}
#emotions button:hover {
  background-color: #b4b6b8;
}
#emotions button:focus {
  background-color: #b4b6b8;
}
</style>
