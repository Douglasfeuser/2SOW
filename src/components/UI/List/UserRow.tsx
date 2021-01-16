import React from "react";
import { Table } from "semantic-ui-react";
import { User } from "../../../interfaces/users";

interface UserRowProps {
  user: User;
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
}) => (
  <Table.Row>
    <Table.Cell>{user.id}</Table.Cell>
    <Table.Cell>{user.nome}</Table.Cell>
    <Table.Cell>{user.email}</Table.Cell>
    <Table.Cell>{user.cpf}</Table.Cell>
    <Table.Cell>{user.package}</Table.Cell>
    <Table.Cell>{user.fuelType}</Table.Cell>
    <Table.Cell>{user.transmission}</Table.Cell>
  </Table.Row>
);
