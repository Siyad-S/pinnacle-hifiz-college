import type { StateCreator } from 'zustand';
import type { SiteContent } from '../types';

export interface ContentSlice {
    // ── State ──────────────────────────────────────────────────────────────────
    content: {
        data: SiteContent | null;
        loading: boolean;
        saving: boolean;
        error: string | null;
    };

    // ── Actions ────────────────────────────────────────────────────────────────
    fetchContent: () => Promise<void>;
    saveContent: (body: Partial<SiteContent>) => Promise<void>;
}

export const createContentSlice: StateCreator<ContentSlice, [], [], ContentSlice> = (set) => ({
    content: {
        data: null,
        loading: false,
        saving: false,
        error: null,
    },

    // ── fetchContent ───────────────────────────────────────────────────────────
    fetchContent: async () => {
        set((s) => ({ content: { ...s.content, loading: true, error: null } }));
        try {
            const res = await fetch('/api/content');
            if (!res.ok) throw new Error('Failed to fetch content');
            const data: SiteContent = await res.json();
            set((s) => ({ content: { ...s.content, data, loading: false } }));
        } catch (err: any) {
            set((s) => ({
                content: { ...s.content, loading: false, error: err.message || 'Unknown error' },
            }));
        }
    },

    // ── saveContent ────────────────────────────────────────────────────────────
    saveContent: async (body) => {
        set((s) => ({ content: { ...s.content, saving: true, error: null } }));
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error('Failed to save content');
            // Re-fetch to get updated canonical state
            const updated: SiteContent = await res.json();
            set((s) => ({ content: { ...s.content, data: updated, saving: false } }));
        } catch (err: any) {
            set((s) => ({
                content: { ...s.content, saving: false, error: err.message || 'Save failed' },
            }));
            throw err;
        }
    },
});
