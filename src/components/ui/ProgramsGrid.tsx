'use client';

import { Program } from '@/types';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle } from 'lucide-react';

interface ProgramsGridProps {
    title: string;
    subtitle: string;
    items: Program[];
    limitDescription?: boolean;
}

export default function ProgramsGrid({ title, subtitle, items, limitDescription = true }: ProgramsGridProps) {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-200"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative glass-card rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors z-10" />
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 z-20 glass-pill px-3 py-1 rounded-full text-xs font-bold text-white">
                                    {program.ageGroup}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {program.title}
                                    </h3>
                                    {program.arabicTitle && (
                                        <span className="font-heading text-xl text-primary opacity-80" lang="ar">
                                            {program.arabicTitle}
                                        </span>
                                    )}
                                </div>

                                <p className={`text-slate-200 mb-6 ${limitDescription ? 'line-clamp-3' : ''}`}>
                                    {program.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <Calendar className="w-4 h-4 text-accent" />
                                        <span>{program.schedule}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {program.features.slice(0, 3).map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
