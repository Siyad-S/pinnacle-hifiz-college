'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ZoomIn, ImageOff, Loader2 } from 'lucide-react';
import { useGallery, useGalleryActions } from '@/store';
import type { DBGalleryItem } from '@/store/types';

interface GalleryGridProps {
    title: string;
    subtitle: string;
}

export default function GalleryGrid({ title, subtitle }: GalleryGridProps) {
    const { items, loading } = useGallery();
    const { fetchGallery } = useGalleryActions();
    const [selectedItem, setSelectedItem] = useState<DBGalleryItem | null>(null);

    useEffect(() => {
        fetchGallery();
    }, [fetchGallery]);

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient"
                    >
                        {title}
                    </motion.h2>
                    <p className="text-lg text-slate-200">{subtitle}</p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                )}

                {/* Empty state */}
                {!loading && items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
                        <ImageOff className="w-16 h-16 opacity-30" />
                        <p className="text-lg opacity-50">No gallery images yet</p>
                    </div>
                )}

                {/* Masonry Grid */}
                {!loading && items.length > 0 && (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={item._id}
                                onClick={() => setSelectedItem(item)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden glass-card border-none"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title || 'Gallery Image'}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full">
                                        <ZoomIn className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                {/* Caption */}
                                {(item.title || item.venue) && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.venue && (
                                            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                                                {item.venue}
                                            </span>
                                        )}
                                        {item.title && (
                                            <p className="text-white font-medium">{item.title}</p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="relative flex justify-center items-center max-w-5xl w-full max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="fixed top-6 right-6 md:absolute md:-top-12 md:right-0 text-white/70 hover:text-white p-2 transition-colors z-50 bg-black/50 md:bg-transparent rounded-full"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <div className="relative inline-flex flex-col items-center max-w-full max-h-full rounded-xl overflow-hidden shadow-2xl">
                                <img
                                    src={selectedItem.imageUrl}
                                    alt={selectedItem.title || 'Gallery Image'}
                                    className="block w-auto h-auto max-w-full max-h-[85vh] object-contain"
                                />

                                {/* Info overlay */}
                                {(selectedItem.title || selectedItem.description || selectedItem.time || selectedItem.venue) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent text-white space-y-1"
                                    >
                                        {selectedItem.title && (
                                            <p className="text-2xl font-heading font-bold drop-shadow-md">{selectedItem.title}</p>
                                        )}
                                        {selectedItem.description && (
                                            <p className="text-gray-200 text-sm drop-shadow max-w-3xl">{selectedItem.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-4 text-xs text-accent mt-3 font-semibold">
                                            {selectedItem.time && <span className="flex items-center gap-1.5"><span className="text-white/60">🕐</span> {selectedItem.time}</span>}
                                            {selectedItem.venue && <span className="flex items-center gap-1.5"><span className="text-white/60">📍</span> {selectedItem.venue}</span>}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
