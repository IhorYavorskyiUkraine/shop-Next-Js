import { UserRole } from "@prisma/client";
import { prisma } from "@prisma/PrismaClient";
import { compare, hashSync } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID || "",
         clientSecret: process.env.GITHUB_SECRET || "",
         profile(profile) {
            return {
               id: profile.id,
               name: profile.name || profile.login,
               email: profile.email,
               image: profile.avatar_url,
               role: "USER" as UserRole,
            };
         },
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID || "",
         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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

            const findUser = await prisma.user.findFirst({
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

            if (!findUser.verified) {
               return null;
            }

            return {
               id: findUser.id,
               email: findUser.email,
               name: findUser.fullName,
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
      async signIn({ user, account }) {
         try {
            if (account?.provider === "credentials") {
               return true;
            }

            if (!user.email) {
               return false;
            }

            const findUser = await prisma.user.findFirst({
               where: {
                  OR: [
                     {
                        provider: account?.provider,
                        providerId: account?.providerAccountId || "",
                     },
                     { email: user.email },
                  ],
               },
            });

            if (findUser) {
               await prisma.user.update({
                  where: {
                     id: findUser.id,
                  },
                  data: {
                     provider: account?.provider,
                     providerId: account?.providerAccountId || "",
                  },
               });

               return true;
            }

            await prisma.user.create({
               data: {
                  email: user.email,
                  fullName: user.name || "User #" + user.id,
                  password: hashSync(user.id.toString(), 10),
                  verified: new Date(),
                  provider: account?.provider,
                  providerId: account?.providerAccountId,
               },
            });

            return true;
         } catch (e) {
            console.error(e);
            return false;
         }
      },
      async jwt({ token }) {
         if (!token.email) {
            return token;
         }

         const user = await prisma.user.findFirst({
            where: {
               email: token.email,
            },
         });

         if (user) {
            token.id = String(user.id);
            token.email = user.email;
            token.fullName = user.fullName;
            token.role = user.role;
         }
         return token;
      },
      async session({ session, token }) {
         if (session?.user) {
            session.user.id = token.id;
            session.user.role = token.role;
         }
         return session;
      },
   },
};
