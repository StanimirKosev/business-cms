import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
import { prisma } from "@repo/database/client";
import { compare } from "bcryptjs";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              password: true,
            },
          });

          if (!user) {
            return null;
          }

          const passwordMatch = await compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.email,
          };
        } catch (error) {
          console.error("[Auth] Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user }: { user?: User }) => {
      return !!user;
    },
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

export async function auth() {
  return getServerSession(authConfig);
}
