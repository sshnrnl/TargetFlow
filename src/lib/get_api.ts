import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

/**
 * Fetches data from an API using the access_token from NextAuth session.
 * @param url - The API endpoint to fetch.
 * @param config - Optional Axios request configuration.
 * @returns The parsed API response.
 */
export const fetchWithAuth = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    // Get session and access_token

    const session = await getSession();

    if (!session?.access_token) {
      throw new Error("No access token found in session.");
    }

    // Prepare headers
    const headers = {
      ...config.headers,
      Authorization: `Bearer ${session.access_token}`,
    };

    // Make API call
    const response = await axios.get<T>(
      process.env.NEXT_PUBLIC_BACKEND_ADDRESS + url,
      {
        ...config,
        headers, // Merge headers
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data with auth:", error);
    throw error;
  }
};
