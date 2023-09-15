import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Account } from "next-auth";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}

interface UserCredentials {
  id: string;
  name: string;
  email: string;
  token: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<UserCredentials | null> => {
        const res = await fetch("http://localhost:5249/Account/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data && data.user) {
          return {
            id: data.user.id.toString(),
            name: data.user.username,
            email: data.user.email,
            token: data.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
