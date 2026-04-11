'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verifyAdmin = async () => {
            if (status === 'loading') return;

            // If no user session, go to login
            if (status === 'unauthenticated' || !session?.user) {
                router.push('/admin/login');
                return;
            }

            // Client-side quick check
            if (session.user.role !== 'ADMIN') {
                router.push('/admin/login?error=AccessDenied');
                return;
            }

            // Verify with database to ensure user still exists and is ADMIN
            try {
                const res = await fetch('/api/auth/verify-admin');
                if (res.ok) {
                    setIsVerified(true);
                } else {
                    router.push('/admin/login?error=AccessDenied');
                }
            } catch (error) {
                console.error("Failed to verify admin", error);
                router.push('/admin/login?error=AccessDenied');
            }
        };

        verifyAdmin();
    }, [session, status, router]);

    if (!isVerified) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
                <p className="text-slate-400 font-medium animate-pulse">Verifying access...</p>
            </div>
        );
    }

    return <>{children}</>;
}
