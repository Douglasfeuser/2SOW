import React, { useState } from "react";
import { Form, Popup } from "semantic-ui-react";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";
import debounce from "lodash.debounce";

const regex = new RegExp("^[a-zA-Z0-9 ]+$");

interface UserFilterProps {
  filter: string;
  totalCount: number;
  loading?: boolean;
  onSubmitFilter(value: string): void;
}

interface UserFilterState {
  filter: string;
  filterValid: boolean;
}

export const UserFilter: React.FC<UserFilterProps> = ({
  totalCount,
  loading,
  onSubmitFilter
}) => {
  const [state, setState] = useState<UserFilterState>({
    filter: "",
    filterValid: true
  });

  const f = debounce((value: string) => {
    if (value !== "" && !regex.test(value)) {
      setState({ filter: value, filterValid: false });
    } else {
      setState({ filter: value, filterValid: true });
      onSubmitFilter(value);
    }
  }, 500);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    f(value);
  };

  let popupMessage = "";
  if (!state.filterValid) {
    popupMessage = "Invalid character.";
  } else if (totalCount === 0) {
    popupMessage = "Sem resultados.";
  }

  return (
    <Form>
      <Form.Group>
        <Form.Field>
          <Popup
            trigger={
              <Form.Input
                placeholder={"Pesquisa."}
                name={"filter"}
                error={!state.filterValid}
                label={"Filter"}
                onChange={handleOnChange}
                icon={"search"}
                loading={loading}
              />
            }
            content={popupMessage}
            on={"click"}
            open={!state.filterValid || totalCount === 0}
            position={"right center"}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
