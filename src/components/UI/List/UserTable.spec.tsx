import React from "react";
import { UserTable } from "./UserTable";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("UserTable", () => {
  it("should render correctly", () => {
    const users = [
      {
        id: 1,
        nome: "teste 12345",
        cpf: "123.123.840-45",
        email: "tes1234@tmail.com",
        endereco: {
          cep: 13454000,
          rua: "rua talvez",
          numero: 785,
          bairro: "bairro azul",
          cidade: "cidade azul"
        }
      },{
        id: 2,
        nome: "teste",
        cpf: "123.123.840-45",
        email: "t54321@tmail.com",
        endereco: {
          cep: 13454000,
          rua: "rua talvez 1",
          numero: 222,
          bairro: "bairro azul",
          cidade: "cidade azul"
        }
      },{
        id: 3,
        nome: "t",
        cpf: "123.54689-45",
        email: "te@tmail.com",
        endereco: {
          cep: 13454000,
          rua: "rua talvez",
          numero: 44,
          bairro: "bairro azul",
          cidade: "cidade azul"
        }
      }
    ];

    render(
      <UserTable
        users={users}
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={jest.fn()}
        onChangeLimit={jest.fn()}
        handleSort={jest.fn()}
        limit={10}
      />
    );
  });

  it("Empty props.users", () => {
    render(
      <UserTable
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={jest.fn()}
        onChangeLimit={jest.fn()}
        handleSort={jest.fn()}
        users={[]}
        limit={10}
      />
    );
  });

  it("should change page", () => {
    const onChangePageMock = jest.fn();

    render(
      <UserTable
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={onChangePageMock}
        onChangeLimit={jest.fn()}
        handleSort={jest.fn()}
        users={[]}
        limit={10}
      />
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("navigation").childElementCount).toEqual(11);
    userEvent.click(screen.getByRole("navigation").children[1]);

    expect(onChangePageMock).toHaveBeenCalledTimes(1);
  });
});
