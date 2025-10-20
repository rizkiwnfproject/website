import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    token?: string;
  }

  interface Session {
    user: {
      id: number;
      token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    token?: string;
  }
}
