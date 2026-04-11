'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '@/components/layout/SiteContentProvider';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const siteContent = useSiteContent();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: siteContent.about.title, href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: siteContent.contact.title, href: '/contact', isCta: true },
    ];

    // Don't show navbar on admin dashboard
    if (pathname.startsWith('/admin')) return null;

    return (
        <>
            <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass border border-white/10 shadow-lg transition-all duration-300">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                        {/* Logo Icon */}
                        <img
                            src="/logo/pinnacle-logo.png"
                            alt="Pinnacle Logo"
                            className="w-8 h-8 rounded-full object-cover bg-white/90"
                        />
                        <span className="hidden sm:inline">{siteContent.metadata.name}</span>
                        <span className="sm:hidden">Pinnacle</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-5 lg:gap-8">
                        {navLinks.map((link) => (
                            !link.isCta ? (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors whitespace-nowrap ${pathname === link.href ? 'text-accent' : 'text-gray-300 hover:text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all backdrop-blur-md whitespace-nowrap"
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden pt-28 px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-2xl font-heading font-bold transition-all ${link.isCta
                                            ? 'bg-primary hover:bg-emerald-600 text-white p-4 rounded-xl text-center shadow-lg shadow-emerald-900/20 mt-4'
                                            : pathname === link.href ? 'text-accent' : 'text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
