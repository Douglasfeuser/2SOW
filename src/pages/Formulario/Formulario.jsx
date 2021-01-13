import React from 'react';
import {
  Container,
  Message
} from 'semantic-ui-react'
import MenuNav from 'components/UI/Menu/Menu';
import ProfileForm from 'components/UI/Form/Form';
import { connect } from "react-redux";

const PagesFormulario = props => {
  
  return (
    <>
      <MenuNav></MenuNav>
      <Container text style={{ marginTop: '7em' }}>
        <div>
          Formulario de usuário
          <br/>
        </div>
          <ProfileForm onSubmit={() => console.log("ProfileForm was submitted")} />

          <Message>
            <Message.Header>Form data:</Message.Header>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </Message>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return state.form.profile
    ? {
        values: state.form.profile.values,
        submitSucceeded: state.form.profile.submitSucceeded
      }
    : {};
};

export default connect(mapStateToProps)(PagesFormulario);
