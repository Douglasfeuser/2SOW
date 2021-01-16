import React from "react";
import { Table, Pagination } from "semantic-ui-react";

import { UserPageSizeSelect } from "./UserPageSizeSelect";
import { UserTableHeader } from "./UserTableHeader";
import { UserRow } from "./UserRow";
import { PaginationProps } from "semantic-ui-react/dist/commonjs/addons/Pagination/Pagination";
import { Users } from "../../../interfaces/Users";

interface UserTableProps {
  users: Users[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  column?: string;
  limit: number;
  direction?: "ascending" | "descending";
  onChangePage(page: number): void;
  handleSort(clickedColumn: string): void;
  onChangeLimit(limit: number): void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  totalCount,
  totalPages,
  column,
  currentPage,
  onChangeLimit,
  direction,
  handleSort,
  limit,
  onChangePage,
}) => {
  const userRows = users.map((user, index) => (
    <UserRow key={index} user={user} />
  ));
  const handleChangePage = (
    event: React.MouseEvent<HTMLAnchorElement>,
    { activePage }: PaginationProps
  ) => {
    onChangePage(activePage as number);
  };

  return (
    <React.Fragment>
      <UserPageSizeSelect limit={limit} onChangeLimit={onChangeLimit} />
      Total count: {totalCount}.
      <Table celled selectable sortable>
        <UserTableHeader
          column={column}
          direction={direction}
          handleSort={handleSort}
        />

        <Table.Body>{userRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              <Pagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={handleChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};
