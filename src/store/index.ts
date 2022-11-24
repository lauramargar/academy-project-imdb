import { createStore } from "vuex";
import { Filter, Find } from "@/types/result.model";

export default createStore ({
 state: {
      yearFilter: false,
      minFilter: false,
      allFilms: {} as any[],
      minYear: 0,
      maxYear: 0,
      minMin: 0,
      maxMin: 0,
 },
 mutations: {
    year(state, value) {
      state.yearFilter = value;
    },
    duration(state, value) {
      state.minFilter = value;
    },
    minYear(state, value) {
      state.minYear = value;
    },
    maxYear(state, value) {
      state.maxYear = value;
    },
    minMin(state, value) {
      state.minMin = value;
    },
    maxMin(state, value) {
      state.maxMin = value;
    },
    setAllFilms(state, value) {
      state.allFilms = value;
    },
 },
 actions: {
    year(context, value) {
      context.commit("year", value);
    },
    duration(context, value) {
      context.commit("duration", value);
    },
    minYear(context, value) {
      context.commit("minYear", value);
    },
    maxYear(context, value) {
      context.commit("maxYear", value);
    },
    minMin(context, value) {
      context.commit("minMin", value);
    },
    maxMin(context, value) {
      context.commit("maxMin", value);
    },
    async findFilms({ commit, state }) {
      let response;
      if (state.yearFilter){
        response = await Filter.byYear(state.minYear,state.maxYear);
      }else if (state.minFilter){
        response = await Filter.byDuration(state.minMin,state.maxMin);
      } else {
        response = await Find.fetchFilms();
        console.log(response);
      }
      commit("setAllFilms", response);
    },
 },

});