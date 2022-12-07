import { createStore } from "vuex";
import { Filter, Find } from "@/types/result.model";

export default createStore ({
 state: {
      yearFilter: false,
      minFilter: false,
      genreFilter: false,
      allFilms: {} as any,
      minYear: 0,
      maxYear: 0,
      minMin: 0,
      maxMin: 0,
      selectedFilters: [] as string[],
      filmDetail: {} as any,
      isDetail: false,
 },
 getters: {
  allFilms(state){
      return state.allFilms;
  },
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
    selectedFilters(state, filters) {
      state.selectedFilters = filters;
    },
    setAllFilms(state, value) {
      state.allFilms = value;
    },
    setDetailFilm(state,filmDetail){
      state.filmDetail = filmDetail;
    },
    setIsDetail(state,isDetail){
      state.isDetail = isDetail;
    }
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
    getDetailFilm(context, detailFilm){
      context.commit("setDetailFilm",detailFilm);
    },
    getIsDetail(context, isDetail){
      context.commit("setIsDetail", isDetail);
    },
    addGenreFilter({ commit, state}, filter) {
      if(state.selectedFilters.includes(filter)) {
        const newSelectedFilters = state.selectedFilters.filter(selectedFilter => selectedFilter!== filter);
        commit("selectedFilters", newSelectedFilters);
      }
      else {
        commit("selectedFilters", [...state.selectedFilters, filter]);
      }
    },
    async findFilms({ commit, state }) {
      let response;
      if (state.yearFilter && !state.genreFilter && !state.minFilter){
        response = await Filter.byYear(state.minYear,state.maxYear);
      }else if (state.minFilter && !state.genreFilter && !state.yearFilter){
        response = await Filter.byDuration(state.minMin,state.maxMin);
      } else if (state.genreFilter && !state.yearFilter && !state.minFilter){
        const genres = state.selectedFilters.join(",");
        response = await Filter.byGenre(genres);
      } else if (state.yearFilter && state.minFilter && !state.genreFilter){
        response = await Filter.byYearDur(state.minYear,state.maxYear,state.minMin,state.maxMin);
      } else if (((state.yearFilter && !state.minFilter) || (state.minFilter && !state.yearFilter)) && state.genreFilter){
        if (state.yearFilter){
          const param = state.selectedFilters.join(",")+"&minYear="+state.minYear+"&maxYear="+state.maxYear;
          response = await Filter.byGenreAndOne(param);
        } else if (state.minFilter){
const param = state.selectedFilters.join(",")+"&minMinutes="+state.minMin+"&maxMinutes="+state.maxMin;
          response = await Filter.byGenreAndOne(param);
        }
      } else if (state.genreFilter && state.minFilter && state.yearFilter){
        const param = state.selectedFilters.join(",")+"&minMinutes="+state.minMin+"&maxMinutes="+state.maxMin+"&minYear="+state.minYear+"&maxYear="+state.maxYear;
        response = await Filter.byAll(param);
      } else {
        response = await Find.fetchFilms();
      }

      for(let film of response.hits){        
        const director = await Find.fetchDirector(film.directors[0].nconst);
        film.director = director[0].primaryName;

        const ids= [];
        for (let character of film.starring){
          if(character.characters != '/N'){
            ids.push(character.name.nconst);
          }
        }
        const actors = await Find.fetchDirector(ids.join(","));
        const actorsList = [];
        for (let actor of actors){
          actorsList.push(actor.primaryName);
        }
        console.log(actorsList);
        film.actors = actorsList[0]+', '+actorsList[1]+', '+actorsList[2];

        const poster = await Find.fetchImage(film.primaryTitle);
        film.image = poster.Poster;
      };

      commit("setAllFilms", response);
    },
 },

});