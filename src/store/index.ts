import { createStore } from "vuex";
import { Filter, Find, ResponseModel } from "@/types/result.model";

export default createStore({
 state: {
    yearFilter: false,
    allFilms: {} as any[],
 },
 mutations: {
    year(state, value) {
      state.yearFilter = value;
    },
    setAllFilms(state, value) {
      state.allFilms = value;
    },
 },
 actions: {
    year(context, value) {
      context.commit("year", value);
    },
    /*async setFindFilms(context: { commit: (arg0: string, arg1: ResponseModel) => void; }, min:number, max:number) {
      if (this.yearFilter){
        const response = await Filter.byYear(min,max);
        context.commit("setAllFilms", response);
      }else{
        const response = await Find.fetchCat();
        context.commit("setAllFilms", response);
      }
    },*/
 },

});