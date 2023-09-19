import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        // user object is returned from the authorize function
        token.accessToken = account.accessToken; // set accessToken to user.token
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
