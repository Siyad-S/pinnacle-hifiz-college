import { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "./mongoose";
import { User } from "../models/User";

// Extend NextAuth types to include role id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    pages: {
        signIn: '/admin/login',
        error: '/admin/login'
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 24 hours
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    await connectMongo();

                    // Check if any admin already exists in the database
                    const existingAdmin = await User.findOne({ role: "ADMIN" });

                    if (!existingAdmin) {
                        // No admin yet — the very first sign-in automatically becomes ADMIN
                        console.log(`[AUTH] No admin found. Promoting first user ${user.email} to ADMIN.`);
                        await User.findOneAndUpdate(
                            { email: user.email },
                            {
                                name: user.name,
                                image: user.image,
                                role: "ADMIN",
                            },
                            { upsert: true, new: true }
                        );
                        return true;
                    }

                    // An admin already exists — only allow that exact admin account
                    if (existingAdmin.email === user.email) {
                        return true;
                    }

                    console.log(`[AUTH] Access denied for ${user.email}. Admin already exists: ${existingAdmin.email}`);
                    // Any other user is blocked (NextAuth will redirect to ?error=AccessDenied)
                    return false;
                }
                return true;
            } catch (error) {
                console.error("[AUTH] Error in signIn callback:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            try {
                if (user) {
                    // Initial sign in
                    await connectMongo();
                    const dbUser = await User.findOne({ email: user.email });
                    
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.role = dbUser.role || "USER";
                    } else {
                        // Fallback if user not found in DB immediately after sign-in (e.g. race condition)
                        console.warn(`[AUTH] User ${user.email} not found in DB during JWT callback`);
                        token.id = user.id;
                        token.role = "USER";
                    }
                }
            } catch (error) {
                console.error("[AUTH] Error in jwt callback:", error);
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
};
