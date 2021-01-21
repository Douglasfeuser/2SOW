import React from "react";
import { UserRow } from "./UserRow";
import { Table } from "semantic-ui-react";
import { render } from "@testing-library/react";

const users = [
  {
    id: 1,
    nome: "teste 12345",
    cpf: "123.123.840-45",
    email: "tes1234@tmail.com",
    endereco: {
      cep: '13454000',
      rua: "rua talvez",
      numero: '785',
      bairro: "bairro azul",
      cidade: "cidade azul"
    }
  },{
    id: 2,
    nome: "teste",
    cpf: "123.123.840-45",
    email: "t54321@tmail.com",
    endereco: {
      cep: '13454000',
      rua: "rua talvez 1",
      numero: '222',
      bairro: "bairro azul",
      cidade: "cidade azul"
    }
  },{
    id: 3,
    nome: "t",
    cpf: "123.54689-45",
    email: "te@tmail.com",
    endereco: {
      cep: '13454000',
      rua: "rua talvez",
      numero: '44',
      bairro: "bairro azul",
      cidade: "cidade azul"
    }
  }
];

describe("UserRow", () => {
  it("should render correctly", () => {
    render(
      <Table>
        <Table.Body>
          <UserRow user={users[0]} />
        </Table.Body>
      </Table>
    );
  });
});
