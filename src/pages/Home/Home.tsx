import React from 'react';
import './Home.css';
import { Container, Icon, Button } from 'semantic-ui-react'
import MenuNav from '../../components/UI/Menu/Menu';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserList } from "../../components/UI/List/UserList";

const queryClient = new QueryClient();

const PagesHome = () => {

  return (
    <>
      <MenuNav></MenuNav>
      <Container style={{ marginTop: '6em' }}>
          <h1>
          Listagem usuários
          </h1>
          <QueryClientProvider client={queryClient}>
            <UserList />
          </QueryClientProvider>
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
      </Container>
    </>
  );
};

export default PagesHome;
