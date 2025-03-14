import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData?.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) =>
        result?.ids
          ? [
              { type: "Users", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Users", id })), 
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

//MEMOIZED SELECTOR
const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersId
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState )
