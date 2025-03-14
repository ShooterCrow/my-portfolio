import { apiSlice } from '@/app/api/apiSlice'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

const servicesAdapter = createEntityAdapter({
  // sortComparer: (a, b) => a.title.localeCompare(b.title)
})

const initialState = servicesAdapter.getInitialState()

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getServices: builder.query({
      query: () => ({
        url: '/services',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: responseData => {
        const loadedServices = responseData.map(service => {
            service.id = service._id
            return service
        })
        return servicesAdapter.setAll(initialState, loadedServices)
      },
      providesTags: (result, error, arg) => [
        { type: 'Service', id: 'LIST' },
        ...(result?.ids?.map(id => ({ type: 'Service', id })) || [])
      ]
    }),
    getServiceById: builder.query({
      query: id => `/services/${id}`,
      transformResponse: responseData => {
        return servicesAdapter.upsertOne(initialState, responseData)
      },
      providesTags: (result, error, arg) => [
        { type: 'Service', id: arg }
      ]
    })
  })
})

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery
} = servicesApiSlice

// Selectors
export const selectServicesResult = servicesApiSlice.endpoints.getServices.select()

// Create memoized selectors
const selectServicesData = createSelector(
  selectServicesResult,
  servicesResult => servicesResult.data
)

// getSelectors creates selectors for: selectAll, selectById, selectIds
export const {
  selectAll: selectAllServices,
  selectById: selectServiceById,
  selectIds: selectServiceIds
} = servicesAdapter.getSelectors(state => selectServicesData(state) ?? initialState)