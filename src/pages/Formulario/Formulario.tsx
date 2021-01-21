import React from 'react';
import {
  Container
} from 'semantic-ui-react'
import MenuNav from '../../components/UI/Menu/Menu';
import UserForm from '../../components/UI/Form/Form';
import { connect } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import { userService } from '../../helpers/user.service';
import { alertService } from '../../helpers/alert.service';

const PagesFormulario = props => {

  const history = useHistory();
  const location = useLocation();

  const editMode = location.pathname.split('/');
  let isAddMode = true;
  let id = '';
  if(editMode[2] === 'edit'){
    isAddMode = false;
    id = editMode[3];
  }

  async function createUser(data) {
    console.log('teste');
    console.log(data);
    await userService.create(data);
    alertService.success('User added', { keepAfterRouteChange: true });
    history.push('.');
  }

  function updateUser(id, data) {
      return userService.update(id, data)
          .then(() => {
              alertService.success('User updated', { keepAfterRouteChange: true });
              history.push('/');
          })
          .catch(alertService.error);
  }

  function submitUserForm(props){
    console.log(props);
    console.log("ProfileForm was submitted");
    return isAddMode
        ? createUser(props)
        : updateUser(id, props);
  }
  
  return (
    <>
      <MenuNav></MenuNav>
      <Container style={{ marginTop: '7em' }}>
        <div>
          Formulario de usuário
          <br/>
        </div>
          <UserForm onSubmit={() => submitUserForm(props)} />
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return state.form.user
    ? {
        values: state.form.user.values,
        submitSucceeded: state.form.user.submitSucceeded
      }
    : {};
};

export default connect(mapStateToProps)(PagesFormulario);
