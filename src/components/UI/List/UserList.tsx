import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import { UserTable } from "./UserTable";
import { UserFilter } from "./UserFilter";
import { useUsers } from "../../../hooks/useUsers";

export const UserList: React.FC = () => {
  const {
    isLoading,
    data,
    filter,
    setFilter,
    pagination,
    setPagination,
    sort,
    setSort,
  } = useUsers();

  const handleSort = (clickedColumn: string) => {
    const { sortColumn, sortOrder } = sort;

    let newOrder: "ascending" | "descending" =
      sortOrder === "ascending" ? "descending" : "ascending";
    if (sortColumn !== clickedColumn) {
      newOrder = "ascending";
    }

    setPagination({ ...pagination, page: 1 });
    setSort({ sortColumn: clickedColumn, sortOrder: newOrder });
  };

  const onSubmitFilter = (value: string) => {
    if (value !== filter) {
      setFilter(value);
      setPagination({ ...pagination, page: 1 });
    }
  };

  const onChangeLimit = (limit: number) => {
    if (limit !== pagination.limit) {
      setPagination({ limit, page: 1 });
    }
  };

  const onChangePage = (page: number) => {
    if (page !== pagination.page) {
      setPagination({ ...pagination, page });
    }
  };

  return (
    <Segment>
      <UserFilter
        filter={filter}
        totalCount={data?.totalCount || 0}
        onSubmitFilter={onSubmitFilter}
        loading={isLoading}
      />
      <Divider />
      <UserTable
        users={data?.users || []}
        totalCount={data?.totalCount || 0}
        totalPages={Math.ceil((data?.totalCount || 0) / pagination.limit)}
        currentPage={pagination.page}
        onChangePage={onChangePage}
        column={sort.sortColumn}
        direction={sort.sortOrder}
        handleSort={handleSort}
        onChangeLimit={onChangeLimit}
        limit={pagination.limit}
      />
    </Segment>
  );
};
