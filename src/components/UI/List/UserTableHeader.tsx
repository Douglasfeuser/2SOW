import { Table } from "semantic-ui-react";
import React from "react";

interface UserTableHeaderProps {
  column?: string;
  direction?: "ascending" | "descending";
  handleSort(column: string): void;
}
export const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  column,
  direction,
  handleSort
}) => (
  <Table.Header>
    <Table.Row>
      
      <Table.HeaderCell
        width={3}
        sorted={column === "nome" ? direction : undefined}
        onClick={() => handleSort("nome")}
      >
        Nome
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        sorted={column === "email" ? direction : undefined}
        onClick={() => handleSort("email")}
      >
        E-mail
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "cpf" ? direction : undefined}
        onClick={() => handleSort("cpf")}
      >
        CPF
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "cidade" ? direction : undefined}
        onClick={() => handleSort("cidade")}
      >
        Cidade
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
      >
        Ações
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);
