import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDatabase();
        let nAdmin = await admin.findOne({ email });
        if (nAdmin && nAdmin.password === password) {
          let responseUser = {
            email: nAdmin.email,
            name: nAdmin.name,
          };
          return responseUser;
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
      let nAdmin = await admin.findOne({
        email: session.user.email,
      });

      return {
        ...session,
        user: {
          ...session.user,
          name: nAdmin.name,
          email: nAdmin.email,
          id: nAdmin._id,
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
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
