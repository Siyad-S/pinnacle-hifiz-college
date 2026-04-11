import type { StateCreator } from 'zustand';
import type { ContactPayload } from '../types';

export type ContactStatus = 'idle' | 'sending' | 'success' | 'error';

export interface ContactSlice {
    // ── State ──────────────────────────────────────────────────────────────────
    contact: {
        status: ContactStatus;
        errorMessage: string | null;
    };

    // ── Actions ────────────────────────────────────────────────────────────────
    submitContact: (payload: ContactPayload) => Promise<void>;
    resetContact: () => void;
}

export const createContactSlice: StateCreator<ContactSlice, [], [], ContactSlice> = (set) => ({
    contact: {
        status: 'idle',
        errorMessage: null,
    },

    // ── submitContact ──────────────────────────────────────────────────────────
    submitContact: async (payload) => {
        set({ contact: { status: 'sending', errorMessage: null } });
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.error || 'Failed to send message');
            }

            set({ contact: { status: 'success', errorMessage: null } });
        } catch (err: any) {
            set({ contact: { status: 'error', errorMessage: err.message || 'Something went wrong' } });
            throw err;
        }
    },

    // ── resetContact ───────────────────────────────────────────────────────────
    resetContact: () => {
        set({ contact: { status: 'idle', errorMessage: null } });
    },
});
