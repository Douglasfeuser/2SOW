import React from 'react';
import './Home.css';
import {
  Container
} from 'semantic-ui-react'
import MenuNav from 'components/UI/Menu/Menu';

const PagesHome = () => {
  return (
    <>
      <MenuNav></MenuNav>
      <Container text style={{ marginTop: '7em' }}>
        <div className="pages-home">
          Listagem
        </div>
      </Container>
    </>
  );
};

export default PagesHome;
