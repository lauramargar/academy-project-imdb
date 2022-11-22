import { createStore } from "vuex";
import { FindCat } from "@/types/result.model";

export default createStore({
 state: {
    
 },

 actions: {
    async setFindGenres(context) {
        const response = await FindCat.fetchCat();
        await context.dispatch("findImages", response);
        context.commit("setFindGenres", response);
    },
    async findImages(context, films) {
        const allImages = [] as any[];
        for (let i = 0; i < films.length; i++) {
          const image = "N/A";
          //const image = await requestImages(films[i].primaryTitle);
          allImages[i] = image;
        }
        context.commit("setImages", allImages);
      },
 }

});