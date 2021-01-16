import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../Store/Context';
import { Button, Form, Grid, Header, Segment, Message} from 'semantic-ui-react';

import './Login.css';

function initialState() {
  return { user: '', password: '' };
}

function login({ user, password }) {
  if (!user) {
    return { error: 'E-mail não pode ser vazio.', token: null };
  }
  if (!password) {
    return { error: 'Senha não pode ser vazio.', token: null };
  }
  if (password.length <= 4) {
    return { error: 'Senha deve ter mais que 4 caracteres.', token: null };
  }

  if (user === 'admin@tmail.com' && password === 'admin') {
    return { error: '', token: '1234' };
  }

  return { error: 'Usuário ou senha inválido.', token: null };
}

function valid(user, password) {
  
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(String);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token, error } = login(values);

    console.log(token);
    console.log('testeeeee');
    if (token) {
      setToken(token);
      return history.push('/');
    }

    setError(error);
    // setValues(initialState);
  }

  return (
    <><Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 470 }}>
        <Header as='h1' color='teal' textAlign='center' className="user-login__title">
          Login
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input fluid
              id="user"
              type="email"
              name="user" 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail' 
              onChange={onChange} 
              value={values.user}/>
            <Form.Input
              fluid              
              id="password"
              type="password"
              name="password"
              icon='lock'
              iconPosition='left'
              placeholder='Senha'
              onChange={onChange}
              value={values.password}/>

            <Button color='teal' fluid size='large' type="submit">
                            Login
            </Button>
          </Segment>
          {error && (
            <Message>{error}</Message>
          )}
        </Form>
      </Grid.Column>
    </Grid></>
  );
};

export default UserLogin;
