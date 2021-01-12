import React, { useContext } from 'react'
import StoreContext from 'components/Store/Context'
import './Menu.css';
import {
  Container,
  Menu,
  Button,
} from 'semantic-ui-react'

const MenuNav = () => {
    const { setToken } = useContext(StoreContext);

    return (
        <div>
            <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' href="/" header>
                Listudo
                </Menu.Item>
                <Menu.Item as='a' href="/">Listagem</Menu.Item>
                <Menu.Item as='a' href="/formulario">Inserir usuário</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' onClick={() => setToken(null)}>
                    LOGOUT
                  </Button>
                </Menu.Item>
            </Container>
            </Menu>
        </div>
    )
}

export default MenuNav