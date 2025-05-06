import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import GoogleProvider from 'next-auth/providers/google';
import {DefaultUser, NextAuthOptions} from 'next-auth';
import {Role} from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface CustomAuthOptions extends NextAuthOptions {
  generateStaticParams?: () => Promise<{ [key: string]: any }>;
}


declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      oid: string;
      role: Role
      isMember: boolean;
    };
  }
}

const authOptions: CustomAuthOptions = {
  callbacks: {
    async session({session, token}) {
      if (session.user && token) {
        // Assign user id from token
        session.user.id = token.sub!;

        // Assuming roles are fetched from the database
        const user = await prisma.user.findUnique({where: {id: token.sub}});
        if (user && user.isMember) {
          session.user.isMember = user.isMember;
          session.user.role = user.role;
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'Email'},
        password: {label: 'Password', type: 'password', placeholder: 'Password'},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: {email: credentials.email},
        });

        if (!user) return null;
        // @ts-ignore
        const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password!
        );

        return passwordsMatch ? user : null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  generateStaticParams: async () => {
    // Add any static parameters you need to generate here
    return {
      // For example:
      someStaticParam: 'someValue',
    };
  },
};

export default authOptions;
