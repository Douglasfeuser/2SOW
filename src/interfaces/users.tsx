export interface Pagination {
    limit: number;
    page: number;
  }
  
  export interface User {
    favorite: boolean;
    id: number;
    nome: string;
    email: string;
    cpf: number;
    package: string;
    fuelType: string;
    transmission: string;
  }
  
  export interface SortField {
    sortColumn: string;
    sortOrder?: "descending" | "ascending";
  }
  
  export interface QueryParam {
    pagination: Pagination;
    sort: SortField;
    filter: string;
  }
  