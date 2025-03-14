import { apiSlice } from "@/app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const contactAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.date === b.date ? -1 : a.date ? 1 : 0),
});

const initialState = contactAdapter.getInitialState();

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContactMsgs: builder.query({
      query: () => ({
        url: "/contact",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData) => {
        const loadedContactMsgs = responseData?.map((contactMsg) => {
          contactMsg.id = contactMsg._id;
          return contactMsg;
        });
        return contactAdapter.setAll(initialState, loadedContactMsgs);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "ContactMsgs", id: "LIST" },
              ...result.ids.map((id) => ({ type: "ContactMsgs", id })),
            ]
          : [{ type: "ContactMsgs", id: "LIST" }],
    }),
    createContactMsg: builder.mutation({
      query: (msg) => ({
        url: "/contact",
        method: "POST",
        body: { ...msg },
        // validateStatus: (response, result) => {
        //   return response.status === 200 && !result.isError;
        // },
      }),
      invalidatesTags: [{ type: "ContactMsgs", id: "LIST" }],
    }),
  }),
});

export const { useGetContactMsgsQuery, useCreateContactMsgMutation } =
  contactApiSlice;

const selectContactMsgResults =
  contactApiSlice.endpoints.getContactMsgs.select();

export const selectContactMsgsData = createSelector(
  selectContactMsgResults,
  (contactMsgsResult) => contactMsgsResult.data
);

export const {
  selectAll: selectAllContactMsgs,
  selectById: selectAllContactMsgsById,
  selectIds: selectAllContactMsgsId,
} = contactAdapter.getSelectors(
  (state) => selectContactMsgsData(state) ?? initialState
);
