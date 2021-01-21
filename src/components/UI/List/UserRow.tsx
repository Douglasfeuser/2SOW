import React from "react";
import { Table, Icon, Button } from 'semantic-ui-react'
import { User } from "../../../interfaces/users";
import { userService } from '../../../helpers/user.service';
import { useHistory } from 'react-router-dom';

interface UserRowProps {
  user: User;
}

const history = useHistory();

function deleteUser(id) {
  userService.delete(id).then(() => {
      history.push('/');
  });
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
}) => (
  <Table.Row>
    <Table.Cell>{user.nome}</Table.Cell>
    <Table.Cell>{user.email}</Table.Cell>
    <Table.Cell>{user.cpf}</Table.Cell>
    <Table.Cell>{user.endereco.cidade}</Table.Cell>
    <Table.Cell>
      <Button
          href={'/formulario/edit/' + user.id}
          icon
          color='orange'
          size='small' >
          <Icon name='edit'/>
      </Button>
      <Button
          onClick={() => deleteUser(user.id)}
          icon
          color='red'
          size='small'>
          <Icon name='trash alternate'/>
      </Button>
    </Table.Cell>
  </Table.Row>
);
