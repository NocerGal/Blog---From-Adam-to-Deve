import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

if (!githubId || !githubSecret) {
  throw new Error('Missing GITHUBID or GITHUB SECRET env');
}

export const authConfig = {
  providers: [
    GitHubProvider({ clientId: githubId, clientSecret: githubSecret }),
  ],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
