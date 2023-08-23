import admin from "@/db/models/admin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDatabase from "@/db/connect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDatabase();
        let existingAdmin = await admin.findOne({ email });
        let match = await bcrypt.compare(password, existingAdmin.password);
        if (match) {
          return {
            email: existingAdmin.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (!session) return;

      await connectDatabase();
      let existingAdmin = await admin.findOne({
        email: session.user.email,
      });

      return {
        ...session,
        user: {
          ...session.user,
          email: existingAdmin.email,
          id: existingAdmin._id,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_SALT,
};

export default NextAuth(authOptions);
