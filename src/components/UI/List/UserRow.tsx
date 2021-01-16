import React from "react";
import { Button, Table } from "semantic-ui-react";
import { Users } from "../../../interfaces/users";

interface UserRowProps {
  user: Users;
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
}) => (
  <Table.Row>
    <Table.Cell>{user.id}</Table.Cell>
    <Table.Cell>{user.make}</Table.Cell>
    <Table.Cell>{user.model}</Table.Cell>
    <Table.Cell>{user.year}</Table.Cell>
    <Table.Cell>{user.package}</Table.Cell>
    <Table.Cell>{user.fuelType}</Table.Cell>
    <Table.Cell>{user.transmission}</Table.Cell>
  </Table.Row>
);
