import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/PrismaClient";
import { compare } from "bcrypt";

export const authOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID || "",
         clientSecret: process.env.GITHUB_SECRET || "",
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials) {
               return null;
            }

            const values = {
               email: credentials.email,
            };

            const findUser = prisma.user.findFirst({
               where: values,
            });

            if (!findUser) {
               return null;
            }

            const isPasswordValid = await compare(
               credentials.password,
               findUser.password,
            );

            if (!isPasswordValid) {
               return null;
            }

            return {
               id: findUser.id,
               fullName: findUser.fullName,
               email: findUser.email,
               role: findUser.role,
            };
         },
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   session: {
      strategy: "jwt",
   },
   callbacks: {
      async jwt({ token, user }) {
         const findUser = await prisma.user.findFirst({
            where: {
               email: token.email,
            },
         });

         if (findUser) {
            token.id = user.id;
            token.email = user.email;
            token.fullName = user.fullName;
            token.role = user.role;
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            session.user.id = token.id;
            session.user.role = token.role;
         }
         return session;
      },
   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
