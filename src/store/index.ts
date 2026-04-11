import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { createGallerySlice, type GallerySlice } from './slices/gallerySlice';
import { createContentSlice, type ContentSlice } from './slices/contentSlice';
import { createContactSlice, type ContactSlice } from './slices/contactSlice';

// ─── Combined store type ───────────────────────────────────────────────────────
export type AppStore = GallerySlice & ContentSlice & ContactSlice;

// ─── Single store instance ────────────────────────────────────────────────────
export const useStore = create<AppStore>()((...args) => ({
    ...createGallerySlice(...args),
    ...createContentSlice(...args),
    ...createContactSlice(...args),
}));

// ─── Convenience selectors ────────────────────────────────────────────────────
// useShallow wraps object-returning selectors so Zustand compares by value
// (shallow equality) instead of reference — prevents the infinite-loop error.

export const useGallery = () => useStore((s) => s.gallery);
export const useGalleryActions = () =>
    useStore(
        useShallow((s) => ({
            fetchGallery: s.fetchGallery,
            uploadImage: s.uploadImage,
            updateItem: s.updateItem,
            deleteItem: s.deleteItem,
        }))
    );

export const useContent = () => useStore((s) => s.content);
export const useContentActions = () =>
    useStore(
        useShallow((s) => ({
            fetchContent: s.fetchContent,
            saveContent: s.saveContent,
        }))
    );

export const useContact = () => useStore((s) => s.contact);
export const useContactActions = () =>
    useStore(
        useShallow((s) => ({
            submitContact: s.submitContact,
            resetContact: s.resetContact,
        }))
    );
