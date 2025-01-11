import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type to include `role`
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Add the role property
  }

  interface Session extends DefaultSession {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add the role property to the session
    };
  }

  interface JWT {
    role?: string; // Add the role property to JWT token
  }
}
