export interface ResultModel {
    id: number;
    title: string;
    facets: FacetModel[];
  }
  
  export interface ResponseModel {
    id: number;
    name: string;
    facets: FacetModel[];
    stars: string;
    genre: string;
    score: number;
  }
  
  export interface FacetModel {
    facet: string;
    type: string;
    values: Record<string, unknown>[];
  }