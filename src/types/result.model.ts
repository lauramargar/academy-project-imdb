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
    const films = await fetch("http://localhost:8080/search");
    return await films.json();
  };
  /*static async fetchImage(title: string) {
    const image = await fetch("https://www.omdbapi.com/?apikey=c901ed49&t="+title);
    return await image.json();
  };*/
}
export class Filter {
  static async byYear(min: number, max: number) {
    const filmsYear = await fetch("http://localhost:8080/search/?type=movie&minYear="+min+"&maxYear="+max);
    return await filmsYear.json();
  }
}