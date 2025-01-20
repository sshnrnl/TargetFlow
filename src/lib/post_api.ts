import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

/**
 * Posts data to an API using the access_token from NextAuth session.
 * @param url - The API endpoint to post to.
 * @param data - The JSON body to send in the request.
 * @param config - Optional Axios request configuration.
 * @returns The parsed API response.
 */
export const postWithAuth = async <T>(
  url: string,
  data: Record<string, any>,
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
      "Content-Type": "application/json",
    };

    // Make API call
    const response = await axios.post<T>(
      process.env.NEXT_PUBLIC_BACKEND_ADDRESS + url,
      data,
      {
        ...config,
        headers, // Merge headers
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting data with auth:", error);
    throw error;
  }
};
