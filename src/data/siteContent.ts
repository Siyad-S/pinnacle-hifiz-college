import { SiteContent } from "@/types";

export const siteContent: SiteContent = {
    metadata: {
        name: "Pinnacle Hifzul Quran Academy",
        tagline: "Excellence in Hifz & Modern Education",
        description: "Welcome to Pinnacle Hifzul Quran Academy in Kannanalloor, Kollam. The premier institution for Hifz-ul-Qur’an and CBSE education. Join our top residential Islamic school in Kerala for Tajweed mastery and academic excellence.",
    },

    hero: {
        type: "image",
        src: "/images/banner.jpeg",
        poster: "/images/hero-fallback.jpg",
        title: "Pinnacle Hifzul Quran Academy",
        subtitle: "Established 2016. A distinguished institution where students pursue Hifz-ul-Qur’an alongside CBSE school education in a nurturing environment.",
        ctaPrimary: { text: "Our Programs", link: "/programs" },
        ctaSecondary: { text: "Admissions", link: "/contact" },
    },

    stats: [
        { label: "Established", value: "2016" },
        { label: "Curriculum", value: "Hifz + CBSE" },
        { label: "Facility", value: "Residential" },
        { label: "Focus", value: "Tajweed" },
    ],

    about: {
        title: "About Pinnacle",
        heading: "Pinnacle Hifzul Quran Academy: Spiritual & Academic Excellence",
        content: "Located in Kannanalloor, Kollam, Pinnacle Hifzul Quran Academy is a premier institution established on 21st March 2016. We provide a comfortable, air-conditioned residential environment where students nurture their Qur’anic recitation with proper Tajweed while continuing their modern CBSE education.",
        features: [
            {
                id: "f1",
                icon: "BookOpen", // Using existing icon keys
                title: "Hifz + CBSE",
                description: "Students pursue Hifz-ul-Qur’an alongside their CBSE school education with special tuition support.",
            },
            {
                id: "f2",
                icon: "Heart", // Fits 'Nurturing'
                title: "Premium Facilities",
                description: "Air-conditioned rooms, homely hygienic food, and a well-designed campus environment.",
            },
            {
                id: "f3",
                icon: "Users",
                title: "Expert Guidance",
                description: "Highly qualified teachers focusing on moral discipline, Islamic practices, and confident recitation.",
            },
        ],
    },

    programs: {
        title: "Our Programs",
        subtitle: "Pathways to Quranic Excellence & Academic Success",
        items: [
            {
                id: "p1",
                title: "Hifzul Qur’an & Tajweed Mastery",
                arabicTitle: "تحفيظ القران وتجويد",
                description: "At Pinnacle Hifzul Qur’an Academy, memorizing the Holy Qur’an is strictly based on the principles of Tajweed. We provide comprehensive training that begins with the fundamental study of Arabic letters and progresses to advanced Tajweed rules. Our focus is to ensure that every student masters the correct articulation (Makharij) and characteristics of each letter, enabling them to recite the Divine Book with precision, beauty, and soul.",
                ageGroup: "School Students",
                schedule: "Residential / Full-Time",
                features: ["Comprehensive Tajweed Training", "Makharij & Articulation Mastery", "Precision & Soulful Recitation"],
                image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1000&auto=format&fit=crop",
            },
            {
                id: "p2",
                title: "Academic Support & Vacation Programs",
                arabicTitle: "دعم أكاديمي وبرامج الإجازة",
                description: "At Pinnacle Hifzul Qur’an Academy, we ensure that our students’ school education remains a top priority alongside their Hifz journey. During school holidays, we provide dedicated academic tuition to help students stay thorough with their subjects and excel in their exams. Furthermore, the school vacation period is utilized effectively by conducting specialized classes on the fundamentals of Fiqh (Islamic Jurisprudence). These sessions empower students with essential knowledge of Islamic rituals and daily practices, ensuring they grow with a deep and practical understanding of their faith.",
                ageGroup: "All Students",
                schedule: "Vacations & Holidays",
                features: ["School Subject Tuition", "Fundamentals of Fiqh", "Islamic Rituals & Practices"],
                image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop",
            },
        ],
    },

    gallery: {
        title: "Life at Pinnacle",
        subtitle: "Glimpses of our facility, events, and blessed gatherings",
        items: [
            {
                id: "g1",
                src: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1000&auto=format&fit=crop",
                category: "Facility",
                caption: "Our Main Prayer Hall",
            },
            {
                id: "g2",
                src: "https://images.unsplash.com/photo-1576764402988-7143f6443346?q=80&w=1000&auto=format&fit=crop",
                category: "Ceremony",
                caption: "Annual Hifz Convocation 2025",
            },
            {
                id: "g3",
                src: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop",
                category: "Classroom",
                caption: "Students engaged in revision",
            },
            {
                id: "g4",
                src: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
                category: "Event",
                caption: "Ramadan Qiyam-ul-Layl",
            },
            {
                id: "g5",
                src: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=1000&auto=format&fit=crop",
                category: "Facility",
                caption: "Peaceful Study Courtyard",
            },
            {
                id: "g6",
                src: "https://images.unsplash.com/photo-1636136181464-996472d89286?q=80&w=1000&auto=format&fit=crop",
                category: "Classroom",
                caption: "Modern Audio-Visual Room",
            },
        ],
    },

    contact: {
        title: "Contact Us",
        subtitle: "We are here to answer your questions about admissions and programs.",
        info: {
            address: "Pinnacle Hifzul Quran Academy\nKannanalloor, Kollam\nKerala 691576\nIndia",
            email: "pinnaclehifzulquranacademy@gmail.com",
            phone: "",
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=...", // Add real Google Maps Embed URL here
            socials: {
                // facebook: "https://facebook.com",
                instagram: "https://www.instagram.com/pinnaclehifzacademy?utm_source=qr&igsh=M25kbXkzd2ZhcG05",
                // youtube: "https://youtube.com",
                whatsapp: "https://wa.me/+919037107840",
            },
        },
    },
};
