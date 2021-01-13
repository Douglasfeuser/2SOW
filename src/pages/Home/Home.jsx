import React from 'react';
import './Home.css';
import {
  Container
} from 'semantic-ui-react'
import MenuNav from 'components/UI/Menu/Menu';
import TableList from 'components/UI/Table/Table';

const PagesHome = () => {
  return (
    <>
      <MenuNav></MenuNav>
      <Container text style={{ marginTop: '6em' }}>
          <h1>
          Listagem usuários
          </h1>
        <TableList></TableList>
      </Container>
    </>
  );
};

export default PagesHome;
