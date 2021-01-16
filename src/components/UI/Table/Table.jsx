
import _ from 'lodash'
import React from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'

let tableData = [];

fetch(`http://localhost:5000/usuarios`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log('teste');
        tableData = await data;
    })

function deleteUser(id) {
    console.log(id);
}

function sortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

function TableList() {
  const [state, dispatch] = React.useReducer(sortReducer, {
    column: null,
    data: tableData,
    direction: null,
  })
  const { column, data, direction } = state

  return (
    <Table sortable celled fixed striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'nome' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'nome' })}
          >
            Nome
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cpf' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'cpf' })}
          >
            CPF
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'email' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'email' })}
          >
            E-mail
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cidade' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'cidade' })}
          >
            Cidade
          </Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ id, cpf, email, nome, cidade }) => (
          <Table.Row key={nome}>
            <Table.Cell>{nome}</Table.Cell>
            <Table.Cell>{cpf}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{cidade}</Table.Cell>
            <Table.Cell textAlign='center'> 
                <Button
                    href={'/edit/' + id}
                    icon
                    color='orange'
                    size='small' >
                    <Icon name='edit'/>
                </Button>
                <Button
                    onClick={() => deleteUser(id)}
                    icon
                    color='red'
                    size='small'>
                    <Icon name='trash alternate'/>
                </Button>
                </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='5'>
                <Button
                    href='/formulario'
                    floated='right'
                    icon
                    labelPosition='left'
                    primary
                    size='small'
                >
                    <Icon name='plus circle' /> Inserir usuário
                </Button>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>

    </Table>
  )
}

export default TableList

