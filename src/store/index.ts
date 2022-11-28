import { createStore } from "vuex";
import { Filter, Find } from "@/types/result.model";

export default createStore ({
 state: {
      yearFilter: false,
      minFilter: false,
      genreFilter: false,
      allFilms: {} as any[],
      minYear: 0,
      maxYear: 0,
      minMin: 0,
      maxMin: 0,
      value: [],
 },
 getters: {
  allFilms(state){
      return state.allFilms;
  }
 },
 mutations: {
    year(state, value) {
      state.yearFilter = value;
    },
    duration(state, value) {
      state.minFilter = value;
    },
    genre(state, value) {
      state.genreFilter = value;
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
    value(state, value) {
      state.value = value;
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
    genre(context, value) {
      context.commit("genre", value);
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
    value(context, value) {
      context.commit("value", value);
    },
    async findFilms({ commit, state }) {
      let response;
      if (state.yearFilter && !state.genreFilter && !state.minFilter){
        response = await Filter.byYear(state.minYear,state.maxYear);
      }else if (state.minFilter && !state.genreFilter && !state.yearFilter){
        response = await Filter.byDuration(state.minMin,state.maxMin);
      } else if (state.genreFilter && !state.yearFilter && !state.minFilter){
        const genres = state.value.join(",");
        response = await Filter.byGenre(genres);
      } else if (state.yearFilter && state.minFilter && !state.genreFilter){
        response = await Filter.byYearDur(state.minYear,state.maxYear,state.minMin,state.maxMin);
      } else if (((state.yearFilter && !state.minFilter) || (state.minFilter && !state.yearFilter)) && state.genreFilter){
        if (state.yearFilter){
          const param = state.value.join(",")+"&minYear="+state.minYear+"&maxYear="+state.maxYear;
          response = await Filter.byGenreAndOne(param);
        } else if (state.minFilter){
          const param = state.value.join(",")+"&minMinutes="+state.minMin+"&maxMinutes="+state.maxMin;
          response = await Filter.byGenreAndOne(param);
        }
      } else if (state.genreFilter && state.minFilter && state.yearFilter){
        const param = state.value.join(",")+"&minMinutes="+state.minMin+"&maxMinutes="+state.maxMin+"&minYear="+state.minYear+"&maxYear="+state.maxYear;
        response = await Filter.byAll(param);
      } else {
        response = await Find.fetchFilms();
      }
      commit("setAllFilms", response);
    },
 },

});