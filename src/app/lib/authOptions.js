import { logIn } from "@/services/LogIn";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const session = await logIn(credentials)
                //Debemos retornar un objeto con la información del usuario
                return session.data
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
          session.user = token;
          return session;
        },
      },
    pages: {
        signIn: "/auth/login",
    },
    session: { maxAge: 60 * 60 * 6 },
    secret: process.env.NEXTAUTH_SECRET,
}



