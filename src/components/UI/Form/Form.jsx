import React, { Fragment } from "react";
import { Field, reduxForm, change } from "redux-form";
import { Form } from "semantic-ui-react";

const UserForm = props => {
  const { handleSubmit, reset, setFieldValue } = props;

  function onBlurCep(ev){

    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        props.dispatch(change('user', 'endereco.rua', data.logradouro));
        props.dispatch(change('user', 'endereco.bairro', data.bairro));
        props.dispatch(change('user', 'endereco.cidade', data.localidade));
      });

  }

  return (
    <Fragment>
      <Form name="user" onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Field
            required
            component={Form.Input}
            label="Nome"
            name="nome"
            placeholder="Nome"
          />
          <Field
            component={Form.Input}
            label="CPF"
            name="cpf"
            placeholder="CPF"
            required
          />
          <Field
            component={Form.Input}
            label="E-mail"
            name="email"
            placeholder="E-mail"
            required
          />
        </Form.Group>

        <Field
        required
        component={Form.Input}
        label="CEP"
        name="endereco.cep"
        placeholder="CEP"
        width={7}
        onBlur={(ev) => onBlurCep(ev, setFieldValue)}
        />

        <Form.Group widths="equal">
          <Field
            required
            component={Form.Input}
            label="Rua"
            name="endereco.rua"
            placeholder="Rua"
          />
          <Field
            required
            component={Form.Input}
            label="Número"
            name="endereco.numero"
            placeholder="Número"
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Field
            required
            component={Form.Input}
            label="Bairro"
            name="endereco.bairro"
            placeholder="Bairro"
          />
          <Field
            required
            component={Form.Input}
            label="Cidade"
            name="endereco.cidade"
            placeholder="Cidade"
          />
        </Form.Group>

        <Form.Group inline>
          <Form.Button primary>Salvar</Form.Button>
          <Form.Button onClick={reset}>Limpar</Form.Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default reduxForm({
  form: "user"
})(UserForm);
