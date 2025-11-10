import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/users/profile",
      transformResponse: (res) => {
        // Normalize single user profile into entity structure
        const userData = res?.user || res;
        return usersAdapter.setAll(
          initialState,
          userData ? [userData] : []
        );
      },
      providesTags: [{ type: "User", id: "PROFILE" }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
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

export const { useGetUserProfileQuery, useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

//MEMOIZED SELECTOR
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersId,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);

// Selector for getUserProfile result
export const selectUserProfileResult = (args = "User") =>
  usersApiSlice.endpoints.getUserProfile.select(args);

// Memoized selector for normalized user profile data
export const selectUserProfileData = createSelector(
  [selectUserProfileResult("User")],
  (profileResult) => profileResult?.data ?? initialState
);

export const selectCurrentUserProfile = createSelector(
  [selectUserProfileData],
  (profileData) => {
    const profiles = usersAdapter.getSelectors().selectAll(profileData);
    return profiles[0] || null; // Return the single user profile or null
  }
);
