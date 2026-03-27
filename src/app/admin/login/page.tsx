'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('Invalid credentials');
        } else {
            router.push('/admin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background blobs for aesthetics */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-[-1]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-[-1]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 glass-card rounded-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 text-white">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white">Admin Access</h1>
                    <p className="text-gray-400">Secure entry for authorized personnel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20"
                    >
                        Sign In
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
