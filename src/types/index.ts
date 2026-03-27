export type MediaType = 'image' | 'video';

export interface HeroSection {
    type: MediaType;
    src: string; // Video URL or Image path
    poster?: string; // Fallback image if video fails to load
    title: string;
    subtitle: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
}

export interface Feature {
    id: string;
    icon: string; // Using string identifiers for Lucide/HeroIcons
    title: string;
    description: string;
}

export interface Program {
    id: string;
    title: string;
    arabicTitle?: string;
    description: string;
    ageGroup: string;
    schedule: string;
    features: string[];
    image: string;
}

export interface GalleryItem {
    id: string;
    src: string;
    category: 'Event' | 'Facility' | 'Classroom' | 'Ceremony';
    caption: string;
}

export interface ContactInfo {
    address: string;
    email: string;
    phone: string;
    mapEmbedUrl: string; // Optional for iframe
    socials: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
    };
}

export interface SiteContent {
    metadata: {
        name: string;
        tagline: string;
        description: string;
    };
    hero: HeroSection;
    stats: { label: string; value: string }[];
    about: {
        title: string;
        heading: string;
        content: string;
        features: Feature[];
    };
    programs: {
        title: string;
        subtitle: string;
        items: Program[];
    };
    gallery: {
        title: string;
        subtitle: string;
        items: GalleryItem[];
    };
    contact: {
        title: string;
        subtitle: string;
        info: ContactInfo;
    };
}
