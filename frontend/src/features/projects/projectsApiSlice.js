import { apiSlice } from "@/app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const projectsAdapter = createEntityAdapter({});

const initialState = projectsAdapter.getInitialState();

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedProjects = responseData.map((project) => {
          project.id = project._id;
          return project;
        });
        return projectsAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Projects", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Projects", id })),
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: { ...project },
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "PATCH",
        body: { ...project },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Projects", id: arg.id }]
    }),
    deleteProject: builder.mutation({
      query: ({id}) => ({
        url: "/projects",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Projects", id: arg.id }]
    }),
  }),
});

export const { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = projectApiSlice;

const selectProjectResult = projectApiSlice.endpoints.getProjects.select();
//MOMOIZED SELECTOR
export const selectProjectData = createSelector(
  selectProjectResult,
  (projectResult) => projectResult.data
);

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(
  (state) => selectProjectData(state) ?? initialState
);
