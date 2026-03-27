import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// In a real production app, verify against a database user collection.
// For now, hardcoding an admin user via environment variables for simplicity as per requirement.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Simple strict equality check for this prototype
                if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin", email: ADMIN_EMAIL };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add user info to token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Add token info to session
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    }
};
