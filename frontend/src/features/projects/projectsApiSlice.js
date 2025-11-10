import { apiSlice } from "@/app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const projectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  },
});

const initialState = projectsAdapter.getInitialState();

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ featured } = {}) => {
        const params = {};
        if (featured !== undefined) {
          params.featured = featured;
        }
        return {
          url: `/projects`,
          params,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        };
      },
      transformResponse: (responseData) => {
        const loadedProjects =
          responseData.data?.map((project) => {
            project.id = project._id || project.id;
            return project;
          }) || [];
        return projectsAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Project", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Project", id })),
            ]
          : [{ type: "Project", id: "LIST" }],
    }),
    getProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
    getGithubProjectsAndUpdate: builder.mutation({
      query: () => ({
        url: `/projects/git-update`,
        method: "POST",
      }),
      invalidatesTags: ["Project"],
      transformResponse: (responseData) => {
        return responseData.data || responseData;
      },
    }),
    addProject: builder.mutation({
      query: (projectData) => {
        const formData = new FormData();

        // Append text fields
        formData.append("title", projectData.title);
        formData.append("description", projectData.description);
        formData.append(
          "technologies",
          JSON.stringify(projectData.technologies)
        );
        formData.append("demoLink", projectData.demoLink || "");
        formData.append("featured", projectData.featured || false);

        // Append files
        if (projectData.icon) {
          formData.append("icon", projectData.icon);
        }

        if (projectData.screenshots && projectData.screenshots.length > 0) {
          projectData.screenshots.forEach((screenshot, index) => {
            formData.append("screenshots", screenshot);
          });
        }

        return {
          url: "/projects",
          method: "POST",
          body: formData,
          headers: {
            // Let the browser set the content-type with boundary
          },
        };
      },
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (projectData) => {
        const formData = new FormData();

        // Append text fields
        formData.append("id", projectData.id);
        if (projectData.title) formData.append("title", projectData.title);
        if (projectData.description)
          formData.append("description", projectData.description);
        if (projectData.technologies)
          formData.append(
            "technologies",
            JSON.stringify(projectData.technologies)
          );
        if (projectData.demoLink !== undefined)
          formData.append("demoLink", projectData.demoLink);
        if (projectData.featured !== undefined)
          formData.append("featured", projectData.featured);

        // Append files
        if (projectData.icon) {
          formData.append("icon", projectData.icon);
        }

        if (projectData.screenshots && projectData.screenshots.length > 0) {
          projectData.screenshots.forEach((screenshot, index) => {
            formData.append("screenshots", screenshot);
          });
        }

        // Append screenshots data for deletion handling
        if (projectData.screenshotsData) {
          formData.append(
            "screenshots",
            JSON.stringify(projectData.screenshotsData)
          );
        }

        return {
          url: "/projects",
          method: "PATCH",
          body: formData,
          headers: {
            // Let the browser set the content-type with boundary
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: "/projects",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetGithubProjectsAndUpdateMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;

const selectProjectResult = projectApiSlice.endpoints.getProjects.select();
// MEMOIZED SELECTOR
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
