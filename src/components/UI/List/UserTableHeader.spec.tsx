import React from "react";
import { UserTableHeader } from "./UserTableHeader";
import { Table } from "semantic-ui-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("UserTableHeader", () => {
  it("should render correctly", () => {
    render(
      <Table>
        <UserTableHeader handleSort={jest.fn()} />
      </Table>
    );
  });

  it("Column Header On Click", () => {
    const handleSortMock = jest.fn();

    render(
      <Table>
        <UserTableHeader handleSort={handleSortMock} column={"id"} />
      </Table>
    );

    expect(screen.getAllByRole("columnheader")).toHaveLength(5);
    screen.getAllByRole("columnheader").forEach(element => {
      userEvent.click(element);
    });

    expect(handleSortMock).toHaveBeenCalledTimes(4);
  });

  it("Sorted Column", () => {
    const columns = [
      "id",
      "make",
      "model",
      "year",
      "package",
      "fuelType",
      "transmission",
      "favorite"
    ];

    columns.forEach(column => {
      render(
        <Table>
          <UserTableHeader
            column={column}
            direction={"ascending"}
            handleSort={jest.fn()}
          />
        </Table>
      );
    });
  });
});
