import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from 'components/Store/Context';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import './Login.css';

function initialState() {
  return { user: '', password: '' };
}

function login({ user, password }) {
  let msg = valid(user, password);
  if(!msg.valid){
    return msg;
  }

  if (user === 'admin' && password === 'admin') {
    return { token: '1234' };
  }

  return { error: 'Usuário ou senha inválido.' };
}

function valid(user, password) {
  if (!user) {
    return { valid: false, error: 'E-mail não pode ser vazio.' };
  }
  if (!password) {
    return { valid: false, error: 'Senha não pode ser vazio.' };
  }
  if (password.length <= 4) {
    return { valid: false, error: 'Senha deve ter mais que 4 caracteres.' };
  }
  return { valid: true };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
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

    if (token) {
      setToken(token);
      return history.push('/');
    }

    setError(error);
    // setValues(initialState);
  }

  return (
    <><Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
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
            <div className="user-login__error">{error}</div>
          )}
        </Form>
      </Grid.Column>
    </Grid></>
  );
};

export default UserLogin;
