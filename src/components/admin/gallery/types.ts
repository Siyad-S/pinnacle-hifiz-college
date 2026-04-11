// Shared types for the gallery module — used across admin components and API
export interface GalleryItem {
    _id: string;
    imageUrl: string;
    publicId: string;
    title: string;           // optional
    description?: string;    // optional
    time?: string;           // optional
    venue?: string;          // optional
    createdAt?: string;
}

export type GalleryMeta = {
    title: string;
    description: string;
    time: string;
    venue: string;
};

export const EMPTY_META: GalleryMeta = {
    title: '',
    description: '',
    time: '',
    venue: '',
};

// Field config for rendering form fields consistently
export const META_FIELDS: {
    key: keyof GalleryMeta;
    label: string;
    placeholder: string;
    required: boolean;
}[] = [
        { key: 'title', label: 'Title', placeholder: 'e.g. Graduation Ceremony', required: false },
        { key: 'description', label: 'Description', placeholder: 'Short description…', required: false },
        { key: 'time', label: 'Time / Date', placeholder: 'e.g. March 2024', required: false },
        { key: 'venue', label: 'Venue', placeholder: 'e.g. Main Hall', required: false },
    ];
