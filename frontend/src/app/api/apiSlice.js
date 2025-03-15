import { logout, setCredentials } from "@/features/auth/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: "https://my-portfolio-api-iqjr.onrender.com",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log("Access token expired. Trying refresh token...");

        const refreshResult = await baseQuery("/refresh", api, extraOptions);

        if (refreshResult?.data) {
            // const user = api.getState().auth.user || localStorage.getItem("username");
            api.dispatch(setCredentials({ ...refreshResult.data }));

            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("Refresh token expired. Logging out...");
            api.dispatch(logout());

            // Return an explicit error message to prevent using expired data
            return { error: { status: 403, data: "Session expired. Please log in again." } };
        }
    }

    return result;
};


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["Users", "Projects", "ContactMsgs", "Reviews"],
    endpoints: builder => ({})

})