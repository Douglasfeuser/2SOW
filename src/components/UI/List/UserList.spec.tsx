import React from "react";
import fetchMock from "fetch-mock";
import { UserList } from "./UserList";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "node-fetch";
import { mockBaseUsers } from "../../../mockData/users.mock";

jest.mock("lodash.debounce", () => jest.fn((fn) => fn));
jest.mock("../../../hooks/useUsers", () => {
  return {
    useUsers: jest.fn(() => ({
      isLoading: false,
      pagination: {
        limit: 10,
        page: 1,
      },
      setPagination: jest.fn(),
      filter: "",
      setFilter: jest.fn(),
      sort: {
        sortColumn: "id",
      },
      setSort: jest.fn(),
      data: {
        totalCount: mockBaseUsers.length,
        users: mockBaseUsers,
      },
    })),
  };
});

describe("UserList", () => {
  beforeEach(() => {
    fetchMock.mock("*", [
      {
        id: 3,
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
      },
    ]);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("should render correctly", async () => {
    render(<UserList />);
    await waitFor(() => expect(screen.getByText("tes")).toBeInTheDocument());
  });

  it("Fail", () => {
    fetchMock.mock(
      "http://localhost:5000/usuarios",
      {
        status: 404,
        body: {
          message: "Some error message",
        },
      },
      {
        overwriteRoutes: true,
      }
    );
    render(<UserList />);
  });

  it("handles changes", async () => {
    render(<UserList />);
    await waitFor(() => expect(screen.getByText("t")).toBeInTheDocument());

    fetchMock.mock(
      "http://localhost:5000/usuarios",
      [
        {
          id: 3,
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
        },
      ],
      {
        query: {
          _sort: "make",
          _order: "asc",
        },
        overwriteRoutes: false,
      }
    );
    userEvent.click(screen.getByRole("columnheader", { name: "Make" }));

    fetchMock.mock(
      "http://localhost:5000/usuarios",
      [
        {
          id: 3,
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
        },
      ],
      {
        query: {
          _sort: "make",
          _order: "desc",
        },
        overwriteRoutes: false,
      }
    );
    userEvent.click(screen.getByRole("columnheader", { name: "Make" }));

    // change filter
    await userEvent.type(screen.getByRole("textbox"), "Volvo");

    // change limit
    userEvent.click(screen.getByRole("listbox"));

    const options = await screen.findAllByRole("option");
    const option = options.find((ele) => ele.textContent === "25");
    expect(option).toBeDefined();
    if (option) {
      userEvent.click(option); // verify your onChange event
    }

    // change page
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("navigation").childElementCount).toEqual(5);
    userEvent.click(screen.getByRole("navigation").children[3]);
  });
  
});
