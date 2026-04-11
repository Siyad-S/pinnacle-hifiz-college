'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
}

/**
 * AdminToast — fixed-position floating notification.
 * Wrap usage in <AnimatePresence> from the parent if you want exit animation,
 * or use the self-contained version below.
 */
export function AdminToast({ message, type }: ToastProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium ${
                type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
        >
            {type === 'success'
                ? <Check className="w-4 h-4 flex-shrink-0" />
                : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            {message}
        </motion.div>
    );
}

/**
 * useToast — simple hook to manage toast state + auto-dismiss.
 */
export function useToast() {
    const [toast, setToast] = useState<ToastProps | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const ToastHost = () => (
        <AnimatePresence>
            {toast && <AdminToast message={toast.message} type={toast.type} />}
        </AnimatePresence>
    );

    return { showToast, ToastHost };
}

// Need useState for the hook
import { useState } from 'react';
