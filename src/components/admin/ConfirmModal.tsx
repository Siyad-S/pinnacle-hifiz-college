'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle } from 'lucide-react';
import React from 'react';

interface ConfirmModalProps {
    open: boolean;
    loading?: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    icon?: React.ElementType<{ className?: string }>;
    variant?: 'danger' | 'warning' | 'primary';
}

export default function ConfirmModal({
    open,
    loading = false,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    icon: Icon = AlertTriangle,
    variant = 'danger'
}: ConfirmModalProps) {
    
    // Style configurations based on variant
    const variantStyles = {
        danger: {
            bgIcon: 'bg-red-500/15',
            textIcon: 'text-red-400',
            btnBg: 'bg-red-600 hover:bg-red-500',
        },
        warning: {
            bgIcon: 'bg-orange-500/15',
            textIcon: 'text-orange-400',
            btnBg: 'bg-orange-600 hover:bg-orange-500',
        },
        primary: {
            bgIcon: 'bg-primary/15',
            textIcon: 'text-primary',
            btnBg: 'bg-primary hover:bg-emerald-500',
        }
    };

    const styles = variantStyles[variant];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl p-7 w-full max-w-sm shadow-2xl"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${styles.bgIcon}`}>
                            <Icon className={`w-6 h-6 ${styles.textIcon}`} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            {description}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={onCancel}
                                disabled={loading}
                                className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                className={`flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${styles.btnBg}`}
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Please wait…</>
                                ) : (
                                    <><Icon className="w-4 h-4" /> {confirmText}</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
