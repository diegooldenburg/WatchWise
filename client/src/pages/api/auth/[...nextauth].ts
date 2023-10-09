import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedSession extends Session {
  accessToken?: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:5249/Account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          console.log(credentials);
          if (!res.ok) {
            console.error(
              `Error response from /api/account/login: ${res.status} ${res.statusText}`
            );
            return null;
          }
          const data = await res.json();
          console.log("authorize data:", data);
          console.log({ id: data.username, accessToken: data.token });
          return { id: data.username, accessToken: data.token };
        } catch (error) {
          console.error(`Error in authorize function: ${error}`);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken as string | undefined;
      }
      console.log("jwt callback token:", token);
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: JWT;
    }) {
      session.accessToken = token.accessToken as string | undefined;
      console.log("session callback session:", session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
