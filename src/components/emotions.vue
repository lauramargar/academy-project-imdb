<template>
  <div id="emotions">
    <p>¿How do you feel?</p>
    <button
      v-for="emotion in emotions"
      :key="emotion"
      @click="changeCat(emotion)"
    >
      hola
    </button>
  </div>
</template>
<script lang="ts">
import { ResultModel } from "../types/result.model";

export default {
  name: "EmotionsFilter",
  props: {
    facet: {
      type: { 
        ResultModel 
      }
  },
  data: function () {
    return {
      emotions: ["joy", "love", "neutral", "scary", "sad"],
      list: [""],
    };
  },
  methods: {
    changeCat(emotion: string) {
      this.list = [];
      for (let i = 0; i < this.facet.facets.length; i++) {
        if (emotion === this.facet.facets[i].facet) {
          for (let x = 0; x < this.facet.facets[i].values.length; x++) {
            this.list.push(this.facet.facets[i].values[x].id as string);
          }
        }
      }
    },
  },
};
/*export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});*/
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
