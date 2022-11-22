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

export class FindCat {
  static async fetchCat(): Promise<ResponseModel> {
      const response = await fetch("http://localhost:8080/search/genres");
      return await response.json();
  };
  static async fetchFilms() {
    const films = await fetch("http://localhost:8080/search");
    return await films.json();
  };
}
