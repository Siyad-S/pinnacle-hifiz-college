import type { SiteContent } from '@/types';

// ─── DB-shape GalleryItem (uses MongoDB _id) ─────────────────────────────────
export interface DBGalleryItem {
    _id: string;
    imageUrl: string;
    publicId: string;
    title?: string;
    description?: string;
    time?: string;
    venue?: string;
}

export interface GalleryUploadMeta {
    title?: string;
    description?: string;
    time?: string;
    venue?: string;
}

// ─── Contact form payload ─────────────────────────────────────────────────────
export interface ContactPayload {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// ─── Re-export for convenience ────────────────────────────────────────────────
export type { SiteContent };
