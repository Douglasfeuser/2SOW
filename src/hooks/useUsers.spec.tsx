import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useUsers } from "./useUsers";
import fetchMock from "fetch-mock";
import "node-fetch";
import { mockBaseUsers } from "../mockData/users.mock";
import {
  queryClient,
  reactQueryTestWrapper,
} from "../utils/reactQueryTestWrapper";

describe("useUsers", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("default", () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: reactQueryTestWrapper,
    });

    expect(result.current.data).toEqual({ totalCount: 0, users: [] });
  });

  it("fetch mock", async () => {
    fetchMock.mock("/api/v1/vehicles", mockBaseUsers, {
      query: {
        _limit: 10,
        _page: 1,
        q: "",
        _sort: "id",
        _order: "asc",
      },
    });

    fetchMock.mock("/api/v1/vehicles", mockBaseUsers, {
      overwriteRoutes: false,
    });

    const { result, waitFor } = renderHook(() => useUsers(), {
      wrapper: reactQueryTestWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        totalCount: 1,
        vehicles: mockBaseUsers,
      });
    });
  });

  it("with filter", async () => {
    fetchMock.mock("/api/v1/vehicles", mockBaseUsers, {
      query: {
        _limit: 10,
        _page: 1,
        q: "mazda",
        _sort: "id",
        _order: "asc",
      },
    });

    fetchMock.mock("/api/v1/vehicles", mockBaseUsers, {
      query: {
        q: "mazda",
      },
      overwriteRoutes: false,
    });

    const { result, waitFor } = renderHook(() => useUsers(), {
      wrapper: reactQueryTestWrapper,
    });

    const { setFilter } = result.current;
    setFilter("mazda");

    await waitFor(() => {
      expect(result.current.data).toEqual({
        totalCount: 1,
        vehicles: mockBaseUsers,
      });
    });
  });

  it("handles network failing case", async () => {
    fetchMock.mock(
      "/api/v1/vehicles",
      {
        status: 404,
        body: {
          message: "Some error message",
        },
      },
      {
        query: {
          _limit: 10,
          _page: 1,
          q: "",
          _sort: "id",
          _order: "asc",
        },
      }
    );

    fetchMock.mock(
      "/api/v1/vehicles",
      {
        status: 404,
        body: {
          message: "Some error message",
        },
      },
      {
        overwriteRoutes: false,
      }
    );

    const { result, waitFor } = renderHook(() => useUsers(), {
      wrapper: reactQueryTestWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        totalCount: 0,
        vehicles: [],
      });
    });
  });
});
