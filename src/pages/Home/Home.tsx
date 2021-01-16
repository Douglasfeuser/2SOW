import React from 'react';
import './Home.css';
import {
  Container
} from 'semantic-ui-react'
import MenuNav from '../../components/UI/Menu/Menu';
import TableList from '../../components/UI/Table/Table';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserList } from "../../components/UI/List/UserList";

const queryClient = new QueryClient();

const PagesHome = () => {

  return (
    <>
      <MenuNav></MenuNav>
      <Container text style={{ marginTop: '6em' }}>
          <h1>
          Listagem usuários
          </h1>
          <QueryClientProvider client={queryClient}>
            <UserList />
          </QueryClientProvider>
        <TableList></TableList>
      </Container>
    </>
  );
};

export default PagesHome;
