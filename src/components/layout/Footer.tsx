'use client';
import { useSiteContent } from '@/components/layout/SiteContentProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const siteContent = useSiteContent();
    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="relative z-10 glass border-t border-white/10 text-white py-16 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs">PH</span>
                            {siteContent.metadata.name}
                        </h3>
                        <p className="text-gray-400 max-w-sm mb-6">
                            {siteContent.metadata.description}
                        </p>
                        <div className="flex gap-4">
                            {/* Socials */}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-accent">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/programs" className="hover:text-white transition-colors">Programs</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-accent">Contact</h4>
                        <div className="space-y-3 text-gray-400">
                            <p className="whitespace-pre-line">{siteContent.contact.info.address}</p>
                            {siteContent.contact.info.phone && <p>{siteContent.contact.info.phone}</p>}
                            <p>{siteContent.contact.info.email}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-16 pt-8 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} {siteContent.metadata.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
