import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type to include `role`
declare module "next-auth" {
  interface User extends DefaultUser {
    // access_token?: string; // Add the role property
  }

  interface Session extends DefaultSession {
    user: {
      name?: string | null;
    };
    access_token?: string;
  }
}
