import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.github.com",
  prepareHeaders: (headers) => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    if (token) headers.set("Authorization", `token ${token}`)
    return headers
  },
})

// --- Entity adapter setup ---
const gitProjectsAdapter = createEntityAdapter({})
const initialState = gitProjectsAdapter.getInitialState()

export const gitApiSlice = createApi({
  reducerPath: "gitApi",
  baseQuery,
  tagTypes: ["Repos"],
  endpoints: (builder) => ({
    getRepos: builder.query({
      query: ({perPage, page}) => `/user/repos?visibility=all&per_page=${perPage}&page=${page}`,
      transformResponse: (responseData) => {
        return gitProjectsAdapter.setAll(initialState, responseData)
      },
      providesTags: ["Repos"],
    }),

    getRepo: builder.query({
      query: ({ repo }) => `/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${repo}`,
      providesTags: (result, error, arg) => [{ type: "Repos", id: arg.repo }],
    }),
  }),
})

export const { useGetReposQuery, useGetRepoQuery } = gitApiSlice

// --- Selectors ---

// Factory function to create parameterized selectors
export const makeGitProjectsSelectors = ({perPage, page}) => {
  const selectGitProjectResult = gitApiSlice.endpoints.getRepos.select({perPage, page})
  
  const selectGitProjectData = createSelector(
    selectGitProjectResult,
    (gitProjectResult) => gitProjectResult?.data || initialState
  )

  const {
    selectAll: selectAllGitProjects,
    selectById: selectGitProjectById,
    selectIds: selectGitProjectIds,
  } = gitProjectsAdapter.getSelectors((state) => selectGitProjectData(state))

  return {
    selectAllGitProjects,
    selectGitProjectById,
    selectGitProjectIds,
    selectGitProjectData
  }
}

// Usage example in components:
/*
import { makeGitProjectsSelectors } from './your-api-file'
import { useSelector } from 'react-redux'

function MyComponent() {
  const { perPage, page } = { perPage: 10, page: 1 }
  const { selectAllGitProjects } = makeGitProjectsSelectors({ perPage, page })
  const gitProjects = useSelector(selectAllGitProjects)
  
  // Or use the hook directly:
  const { data } = useGetReposQuery({ perPage: 10, page: 1 })
  // data will contain the normalized entity adapter state
}
*/