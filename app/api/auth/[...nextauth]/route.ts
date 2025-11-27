import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? "dev",
      clientSecret: process.env.GITHUB_SECRET ?? "dev",
    }),
  ],
});

export { handler as GET, handler as POST };
