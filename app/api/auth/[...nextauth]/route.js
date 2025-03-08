import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { userName, password } = credentials;

                try {
                    await connectToMongoDB();
                    const user = await User.findOne({ userName });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.userName,
                    };
                } catch (error) {
                    console.log("Error during authentication:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
}

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };