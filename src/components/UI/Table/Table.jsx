
import _ from 'lodash'
import React from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'

const tableData = [
  { name: 'John', cpf: 895512, email: 't@tz.com', cidade: 'Criciuma' },
  { name: 'Andre', cpf: 295512, email: 't@tz.com', cidade: 'Floripa' },
  { name: 'Thalles', cpf: 195512, email: 'Abc@tz.com', cidade: 'Rincão' },
  { name: 'Amber', cpf: 874950, email: 't1111@t.com', cidade: 'São paulo' }
]

function exampleReducer(state, action) {
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
  const [state, dispatch] = React.useReducer(exampleReducer, {
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
        <Table.HeaderCell>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ cpf, email, name, cidade }) => (
          <Table.Row key={name}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{cpf}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{cidade}</Table.Cell>
            <Table.Cell> Edit || Del </Table.Cell>
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
                    <Icon name='user' /> Inserir usuário
                </Button>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>

    </Table>
  )
}

export default TableList

