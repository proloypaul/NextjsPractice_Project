import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["postedNews"],
  endpoints: (builder) => ({
    postNews: builder.mutation({
      query: ({data}) => ({
        url: "/news",
        method: 'POST',
        body: data
      }),
      invalidatesTags: ["postedNews"],
    }),
    getNews: builder.query({
      query: () => "/news",
      providesTags: ["postedNews"],
    }),
  }),
})

// auto-generated based on the defined endpoints
export const {useGetNewsQuery, usePostNewsMutation} = apiSlice