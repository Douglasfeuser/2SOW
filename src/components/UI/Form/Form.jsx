import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";


const ProfileForm = props => {
  const { handleSubmit, reset } = props;

  return (
    <Fragment>

      <Form onSubmit={handleSubmit}>
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
        component={Form.Input}
        label="CEP"
        name="endereco.cep"
        placeholder="CEP"
        width={7}
        />

        <Form.Group widths="equal">
          <Field
            component={Form.Input}
            label="Rua"
            name="endereco.rua"
            placeholder="Rua"
          />
          <Field
            component={Form.Input}
            label="Número"
            name="endereco.numero"
            placeholder="Número"
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Field
            component={Form.Input}
            label="Bairro"
            name="endereco.nairro"
            placeholder="Bairro"
          />
          <Field
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
  form: "profile"
})(ProfileForm);
