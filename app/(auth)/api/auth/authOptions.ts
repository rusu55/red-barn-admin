import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prisma";

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
          name: 'credentials',
          credentials:{
            email: {label: 'email', type: 'text'},
            password: {label: 'password', type: 'password'},
          },
          async authorize(credentials, req){
            if(!credentials?.email || !credentials?.password){
              throw new Error('Invalid Credentials');
            }
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            });
            if(!user || !user.hashedPassword){
              throw new Error('Invalid Credentials')
            }

            const correctPassword =  await bcrypt.compare(credentials.password, user.hashedPassword);
            if(!correctPassword){
              throw new Error('Invalid Credentials');
            }
            return user;
          }
        })
    ],

    pages: {
        signIn: '/',
      },
      
    session: {
        strategy: "jwt",
      },
    secret: process.env.NEXTAUTH_SECRET,
}