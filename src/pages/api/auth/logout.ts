// pages/api/auth/logout.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // Use getSession to check and delete the session

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Get the session from the request
    const session = await getSession({ req });

    if (session) {
      // Session exists, so we clear it
      // Call next-auth's signOut function but directly using the session
      res.setHeader("Set-Cookie", [
        `next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `next-auth.csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ]);

      return res.status(200).json({ message: "Logged out successfully" });
    }

    return res.status(400).json({ message: "No active session" });
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
