import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/lib/config/connectDB";
import User from "@/lib/models/UserModel";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({ email: credentials?.email });

                if (!user) {
                    throw new Error("User not found");
                }

                const isValidPassword = await bcrypt.compare(
                    credentials?.password || "",
                    user.password
                );

                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                return { id: user._id, name: user.name, email: user.email };
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.sub,
                    name: token.name,
                    email: token.email
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        }
    }
};

export default NextAuth(authOptions);
