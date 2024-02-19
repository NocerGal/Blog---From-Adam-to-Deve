import { AuthOptions, NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import { env } from '@/lib/env';

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.name = user.name;
      session.user.image = user.image;
      session.user.id = user.id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
