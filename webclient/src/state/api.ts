import { BASE_API } from "./../lib/variables";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProps } from "@/types/User";
import { getSession } from "@/lib/supabase/client";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: async headers => {
      const userSession = await getSession();

      if (userSession) {
        headers.set(
          "Authorization",
          `Bearer ${userSession.data.session?.access_token}`
        );
      }

      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: build => ({
    getAuthUser: build.query<UserProps, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const userData = await fetchWithBQ({ url: "/users" });

          if (userData.error) {
            return { error: userData.error };
          }

          return { data: userData.data as UserProps };
        } catch (error: any) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Unknown error",
            },
          };
        }
      },
    }),
  }),
});

export const { useGetAuthUserQuery } = api;
