export interface Pagination {
    limit: number;
    page: number;
  }
  
  export interface User {
    id: number;
    nome: string;
    email: string;
    cpf: number;
    endereco: {
      cep:number;
      rua:string;
      numero:number;
      bairro:string;
      cidade:string;
    }
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
  