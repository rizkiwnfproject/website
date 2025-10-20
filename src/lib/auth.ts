import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
    signIn: "/admin/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const isValidAdmin =
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD;

        if (!isValidAdmin) return null;

        const adminToken = jwt.sign(
          { email: credentials.email },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" } 
        );

        return {
          id: 1,
          name: "Admin",
          email: credentials.email,
          token: adminToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.token = token.token as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
