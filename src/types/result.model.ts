export interface ResultModel {
    facets: FacetModel[];
  }
  
  export interface ResponseModel {
    hits: Record<string, unknown>[];
    facets: FacetModel[];
  }
  
  export interface FacetModel {
    facet: string;
    type: string;
    values: Record<string, unknown>[];
  }

export class Find {
  static async fetchCat(): Promise<ResponseModel> {
      const response = await fetch("http://localhost:8080/search/genres");
      return await response.json();
  };
  static async fetchFilms() {
    const films = await fetch("http://localhost:8080/search/?type=movie&maxNHits=15");
    return await films.json();
  };
  static async fetchDirector(param: string) {
    const director = await fetch("http://localhost:8080/search/names?ids="+param);
    return await director.json();
  };
  static async fetchImage(title: string) {
    const image = await fetch("https://www.omdbapi.com/?apikey=c901ed49&t="+title);
    return await image.json();
  };
}
export class Filter {
  static async byYear (min: number, max: number) {
    const filmsYear = await fetch("http://localhost:8080/search/?type=movie&minYear="+min+"&maxYear="+max+"&sortNumVotes=Asc&maxNHits=15");
    return await filmsYear.json();
  }
  static async byDuration (min: number, max: number) {
    const filmsDuration = await fetch("http://localhost:8080/search/?type=movie&minMinutes="+min+"&maxMinutes="+max+"&sortNumVotes=Asc&maxNHits=15");
    return await filmsDuration.json();
  }
  static async byGenre (value:string) {
    const filmsGenre = await fetch("http://localhost:8080/search/?type=movie&genres="+value+"&sortNumVotes=Asc&maxNHits=15");
    return await filmsGenre.json();
  }
  static async byYearDur (minYear: number, maxYear: number,minDur: number, maxDur: number) {
    const filmsGenreDur = await fetch("http://localhost:8080/search/?type=movie&minYear="+minYear+"&maxYear="+maxYear+"&minMinutes="+minDur+"&maxMinutes="+maxDur+"&sortNumVotes=Asc&maxNHits=15");
    return await filmsGenreDur.json();
  }
  static async byGenreAndOne (value: string) {
    const filmsGenreAndOne = await fetch("http://localhost:8080/search/?type=movie&genres="+value+"&sortNumVotes=Asc&maxNHits=15");
    return await filmsGenreAndOne.json();
  }
  static async byAll (value: string) {
    const filmsAll = await fetch("http://localhost:8080/search/?type=movie&genres="+value+"&sortNumVotes=Asc&maxNHits=15");
    return await filmsAll.json();
  }
}