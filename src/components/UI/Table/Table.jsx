
import _ from 'lodash'
import React from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'

const tableData = [
  { id: 1, name: 'John', cpf: 895512, email: 't@tz.com', cidade: 'Criciuma' },
  { id: 2, name: 'Andre', cpf: 295512, email: 't@tz.com', cidade: 'Floripa' },
  { id: 3, name: 'Thalles', cpf: 195512, email: 'Abc@tz.com', cidade: 'Rincão' },
  { id: 4, name: 'Amber', cpf: 874950, email: 't1111@t.com', cidade: 'São paulo' }
]

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
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
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
        {data.map(({ id, cpf, email, name, cidade }) => (
          <Table.Row key={name}>
            <Table.Cell>{name}</Table.Cell>
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

