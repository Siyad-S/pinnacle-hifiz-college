import type { Metadata } from "next";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our commitment to balancing spiritual & academic excellence at Pinnacle Hifzul Qur’an Academy.",
};
import { BookOpen, Users, Heart } from "lucide-react";
import Image from "next/image";

// Helper for icons (duplicate considering move to utils if frequent)
const IconMap: Record<string, any> = {
    BookOpen: BookOpen,
    Users: Users,
    Heart: Heart,
};

export default function AboutPage() {
    return (
        <main className="pt-24 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">{siteContent.about.title}</h1>
                    <p className="text-xl text-slate-200">{siteContent.about.content}</p>
                </div>

                {/* Vision/Mission/Values layout - reusing features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {siteContent.about.features.map((feature) => {
                        const Icon = IconMap[feature.icon] || BookOpen;
                        return (
                            <div key={feature.id} className="text-center p-8 glass-card rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-16 h-16 mx-auto glass-pill rounded-full flex items-center justify-center text-emerald-400 shadow-lg mb-6">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Stats Section with Banner */}
                <div className="relative rounded-3xl overflow-hidden mb-24 shadow-2xl group">
                    {/* Banner Background */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/stats-banner.png"
                            alt="Islamic Architecture Detail"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500 z-10" />
                    </div>

                    <div className="relative z-10 p-12 md:p-20 text-white text-center">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {siteContent.stats.map((stat, i) => (
                                <div key={i} className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center h-full min-h-[140px]">
                                    <div className="text-3xl md:text-5xl font-bold text-emerald-400 mb-2 break-words w-full">{stat.value}</div>
                                    <div className="text-sm md:text-base font-medium opacity-90 uppercase tracking-widest text-slate-100">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
