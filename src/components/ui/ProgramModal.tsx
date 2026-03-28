'use client';

import { Program } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Clock, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ProgramModalProps {
    program: Program | null;
    onClose: () => void;
}

export default function ProgramModal({ program, onClose }: ProgramModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (program) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [program]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {program && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#0f172a]/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 z-0"
                    />

                    <motion.div
                        layoutId={`program-${program.id}`}
                        className="relative z-[101] w-full max-w-4xl max-h-[90vh] glass-card rounded-3xl overflow-hidden flex flex-col bg-[#090e1a]/70 shadow-2xl border border-white/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col md:flex-row h-full overflow-hidden">
                            {/* Modal Image */}
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a]/95 via-transparent to-transparent z-10 md:hidden" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#090e1a]/95 via-transparent to-transparent z-10 hidden md:block md:right-auto md:left-full md:-ml-1 w-1" />
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6 z-20 glass-pill px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg">
                                    {program.ageGroup}
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 md:p-10 flex-grow pt-4 md:pt-10 overflow-y-auto scrollbar-hide">
                                <div className="flex flex-col">
                                    <div className="mb-2 flex items-center gap-4">
                                        <h3 className="font-heading text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                                            {program.title}
                                        </h3>
                                    </div>
                                    {program.arabicTitle && (
                                        <span className="font-heading text-2xl text-primary/80 mb-6" lang="ar" dir="rtl">
                                            {program.arabicTitle}
                                        </span>
                                    )}

                                    <div className="flex flex-wrap items-center gap-4 mb-8">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300">
                                            <Clock className="w-4 h-4 text-accent" />
                                            <span className="text-sm">{program.schedule}</span>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                                            <BookOpen className="w-5 h-5 text-primary" />
                                            Program Overview
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                            {program.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                            Key Features
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {program.features.map((feat, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-emerald-400/70 shrink-0 mt-0.5" />
                                                    <span className="text-slate-300">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
