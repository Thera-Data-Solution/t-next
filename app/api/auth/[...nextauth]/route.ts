import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { RoleList } from "@/generated/prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? "dev",
      clientSecret: process.env.GITHUB_SECRET ?? "dev",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      try {
        session.user.role = user.role || RoleList.User;
        return session;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error in session callback:", error.message)
        }
        session.user.role = RoleList.User;
        return session;
      }
    }
  },
});

export { handler as GET, handler as POST };
