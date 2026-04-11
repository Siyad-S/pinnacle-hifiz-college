'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Images, FileText } from 'lucide-react';
import AdminSidebar, { type NavItem } from '@/components/admin/AdminSidebar';
import AuthWrapper from '@/components/admin/AuthWrapper';

// ─── Navigation items ────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
    { id: 'gallery', label: 'Gallery', href: '/admin/gallery', icon: Images },
    // { id: 'content', label: 'Content Manager', href: '/admin/content', icon: FileText },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <AuthWrapper>
            <div className="relative z-10 min-h-screen flex font-sans text-white h-screen overflow-hidden">
                {/* Sidebar */}
                <AdminSidebar
                    session={session!}
                    navItems={NAV_ITEMS}
                />

                {/* Main content */}
                <main className="flex-1 p-8 overflow-y-auto scrollbar-hide">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold font-heading capitalize">
                            {NAV_ITEMS.find((n) => pathname.startsWith(n.href))?.label ?? 'Dashboard'}
                        </h1>
                        <span className="text-sm text-gray-400">
                            Welcome back, {session?.user?.name?.split(' ')[0] ?? 'Admin'}
                        </span>
                    </header>

                    {/* Render active tab */}
                    {children}
                </main>
            </div>
        </AuthWrapper>
    );
}
