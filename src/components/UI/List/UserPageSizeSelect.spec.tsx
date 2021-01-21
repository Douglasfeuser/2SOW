import React from "react";
import { UserPageSizeSelect } from "./UserPageSizeSelect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("UserPageSizeSelect", () => {
  it("should render correctly", async () => {
    const onChangeLimitMock = jest.fn();
    render(
      <UserPageSizeSelect limit={10} onChangeLimit={onChangeLimitMock} />
    );

    userEvent.click(screen.getByRole("listbox"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert").innerHTML).toEqual("10");

    const options = await screen.findAllByRole("option");
    const option = options.find(ele => ele.textContent === "25");
    expect(option).toBeDefined();
    if (option) {
      userEvent.click(option);
    }

    expect(onChangeLimitMock).toHaveBeenCalledTimes(1);
    expect(onChangeLimitMock.mock.calls[0]).toEqual(["25"]);
  });
});
