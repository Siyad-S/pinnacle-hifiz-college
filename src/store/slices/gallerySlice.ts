import type { StateCreator } from 'zustand';
import type { DBGalleryItem, GalleryUploadMeta } from '../types';

export interface GallerySlice {
    // ── State ──────────────────────────────────────────────────────────────────
    gallery: {
        items: DBGalleryItem[];
        loading: boolean;
        uploading: boolean;
        error: string | null;
    };

    // ── Actions ────────────────────────────────────────────────────────────────
    fetchGallery: () => Promise<void>;
    uploadImage: (file: File, meta: GalleryUploadMeta) => Promise<void>;
    updateItem: (id: string, meta: GalleryUploadMeta, file?: File) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
}

export const createGallerySlice: StateCreator<GallerySlice, [], [], GallerySlice> = (set, get) => ({
    gallery: {
        items: [],
        loading: false,
        uploading: false,
        error: null,
    },

    // ── fetchGallery ───────────────────────────────────────────────────────────
    fetchGallery: async () => {
        set((s) => ({ gallery: { ...s.gallery, loading: true, error: null } }));
        try {
            const res = await fetch('/api/gallery');
            if (!res.ok) throw new Error('Failed to fetch gallery');
            const data: DBGalleryItem[] = await res.json();
            set((s) => ({
                gallery: {
                    ...s.gallery,
                    items: Array.isArray(data) ? data : [],
                    loading: false,
                },
            }));
        } catch (err: any) {
            set((s) => ({
                gallery: { ...s.gallery, loading: false, error: err.message || 'Unknown error' },
            }));
        }
    },

    // ── uploadImage ────────────────────────────────────────────────────────────
    uploadImage: async (file, meta) => {
        set((s) => ({ gallery: { ...s.gallery, uploading: true, error: null } }));
        try {
            // Step 1 — upload to Cloudinary via server proxy
            const formData = new FormData();
            formData.append('image', file);
            const uploadRes = await fetch('/api/gallery/upload', { method: 'POST', body: formData });
            const { imageUrl, publicId, error: uploadError } = await uploadRes.json();
            if (uploadError) throw new Error(uploadError);

            // Step 2 — persist metadata + Cloudinary refs to DB
            const saveRes = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl, publicId, ...meta }),
            });
            if (!saveRes.ok) throw new Error('Failed to save gallery item');

            // Refresh list
            await get().fetchGallery();
        } catch (err: any) {
            set((s) => ({
                gallery: { ...s.gallery, uploading: false, error: err.message || 'Upload failed' },
            }));
            throw err; // re-throw so callers can show toast
        }
        set((s) => ({ gallery: { ...s.gallery, uploading: false } }));
    },

    // ── updateItem ─────────────────────────────────────────────────────────────
    updateItem: async (id, meta, file) => {
        set((s) => ({ gallery: { ...s.gallery, uploading: !!file, error: null } }));
        try {
            let updatePayload = { ...meta } as any;

            // If an image file is provided, upload it first
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                const uploadRes = await fetch('/api/gallery/upload', { method: 'POST', body: formData });
                const { imageUrl, publicId, error: uploadError } = await uploadRes.json();
                if (uploadError) throw new Error(uploadError);

                updatePayload.imageUrl = imageUrl;
                updatePayload.publicId = publicId;
            }

            const res = await fetch(`/api/gallery/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatePayload),
            });
            if (!res.ok) throw new Error('Update failed');

            // Optimistic update in-place
            set((s) => ({
                gallery: {
                    ...s.gallery,
                    uploading: false,
                    items: s.gallery.items.map((item) =>
                        item._id === id ? { ...item, ...updatePayload } : item
                    ),
                },
            }));
        } catch (err: any) {
            set((s) => ({ gallery: { ...s.gallery, uploading: false, error: err.message || 'Update failed' } }));
            throw err;
        }
    },

    // ── deleteItem ─────────────────────────────────────────────────────────────
    deleteItem: async (id) => {
        try {
            const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');

            // Optimistic removal
            set((s) => ({
                gallery: {
                    ...s.gallery,
                    items: s.gallery.items.filter((item) => item._id !== id),
                },
            }));
        } catch (err: any) {
            throw err;
        }
    },
});
