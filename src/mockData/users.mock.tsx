import { User } from "../interfaces/users";

export const mockBaseUsers: User[] = [
  {
    id: 1,
    nome: "douglas",
    email: "teste@tmail.com",
    cpf: 88000,
    endereco: {
        cep: 13454000,
        rua: "rua talvez",
        numero: 785,
        bairro: "bairro azul",
        cidade: "cidade eterna"
    }}
];