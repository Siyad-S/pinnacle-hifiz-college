'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { type Session } from 'next-auth';
import { LogOut, type LucideIcon } from 'lucide-react';
import ConfirmModal from '@/components/admin/ConfirmModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
}

interface AdminSidebarProps {
    session: Session;
    navItems: NavItem[];
}

export default function AdminSidebar({ session, navItems }: AdminSidebarProps) {
    const [showSignOut, setShowSignOut] = useState(false);
    const pathname = usePathname();

    const handleConfirmSignOut = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <aside className="w-64 h-screen glass border-r border-white/10 flex flex-col">
            {/* Brand */}
            <div className="p-6 border-b border-white/10">
                <h2 className="font-heading text-2xl font-bold text-accent">Pinnacle Admin</h2>
                <p className="text-xs text-gray-500 mt-1">Management Dashboard</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ id, label, href, icon: Icon }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                        <Link
                            key={id}
                            href={href}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                                isActive
                                    ? 'bg-primary text-white shadow-lg shadow-emerald-900/30'
                                    : 'hover:bg-white/5 text-slate-300'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* User info + sign out */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    {session?.user?.image ? (
                        <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full" />
                    ) : (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-sm text-white">
                            {session.user?.name?.[0] ?? 'A'}
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                        <p className="text-xs text-emerald-400">Admin</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowSignOut(true)}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 hover:bg-white/5 rounded-lg text-sm"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>

            <ConfirmModal
                open={showSignOut}
                title="Sign Out"
                description="Are you sure you want to sign out of the admin panel?"
                confirmText="Sign Out"
                cancelText="Cancel"
                icon={LogOut}
                variant="warning"
                onConfirm={handleConfirmSignOut}
                onCancel={() => setShowSignOut(false)}
            />
        </aside>
    );
}
