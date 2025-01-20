import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import NextAuth from "next-auth";
import { verifyJwt } from "./jwt";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_ADDRESS + "/api/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );
          console.log(response.data);

          // If access_token is available, return it with user info
          if (response.data.access_token) {
            console.log(response.data.access_token);
            return {
              id: "1", // You can modify this to any unique identifier
              name: credentials?.username,
              access_token: response.data.access_token,
            };
          }

          // Throw error if no access_token
          throw new Error("Invalid credentials");
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Customize this to your login page if necessary
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      // If user is returned from authorize, persist the access_token in the token object
      if (user) {
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // console.log(token);

      if (token.access_token) {
        session.access_token = String(token.access_token); // Cast to string
      }

      // Validate token by explicitly converting to string
      // console.log(validateToken(String(session.access_token)));

      return session;
    },
  },
};

export default NextAuth(authOptions);
