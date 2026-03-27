'use client';

import { GalleryItem } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import clsx from 'clsx';

interface GalleryGridProps {
    title: string;
    subtitle: string;
    items: GalleryItem[];
}

export default function GalleryGrid({ title, subtitle, items }: GalleryGridProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedItem = items.find((i) => i.id === selectedId);

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient"
                    >
                        {title}
                    </motion.h2>
                    <p className="text-lg text-slate-200">{subtitle}</p>
                </div>

                {/* Masonry-ish Grid (CSS Columns) */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layoutId={`card-${item.id}`}
                            onClick={() => setSelectedId(item.id)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden glass-card border-none"
                        >
                            <img
                                src={item.src}
                                alt={item.caption}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full">
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">{item.category}</span>
                                <p className="text-white font-medium">{item.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox / Modal */}
                {selectedId && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className="relative max-w-5xl w-full max-h-[90vh] bg-transparent rounded-none overflow-visible"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white p-2"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <motion.img
                                src={selectedItem.src}
                                alt={selectedItem.caption}
                                className="w-full h-full object-contain max-h-[85vh] rounded-lg shadow-2xl"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white rounded-b-lg"
                            >
                                <span className="text-accent font-bold uppercase text-sm tracking-wider">{selectedItem.category}</span>
                                <p className="text-2xl font-heading mt-2">{selectedItem.caption}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
