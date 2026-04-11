import { getSiteContent } from "@/lib/getContent";
import Hero from "@/components/ui/Hero";
import ProgramsGrid from "@/components/ui/ProgramsGrid";
import GalleryGrid from "@/components/ui/GalleryGrid";
import ContactForm from "@/components/ui/ContactForm";
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Heart } from 'lucide-react';

// Icon mapper helper
const IconMap: Record<string, any> = {
  BookOpen: BookOpen,
  Users: Users,
  Heart: Heart,
};

export default async function Home() {
  const siteContent = await getSiteContent();

  return (
    <main className="min-h-screen relative">
      {/* Global 3D Background now in layout.tsx */}

      <div className="relative z-10">
        <Hero data={siteContent.hero} />

        {/* About Summary */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                <span className="text-accent font-bold uppercase tracking-wider text-sm">{siteContent.about.title}</span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-gradient">
                  {siteContent.about.heading}
                </h2>
                <p className="text-lg text-slate-100/90 leading-relaxed">
                  {siteContent.about.content}
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                  Learn More about Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteContent.about.features.map((feature) => {
                  const Icon = IconMap[feature.icon] || BookOpen;
                  return (
                    <div key={feature.id} className="p-6 glass-card rounded-2xl hover:bg-white/10 transition-colors group">
                      <div className="w-12 h-12 glass-pill rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-slate-200 text-sm">{feature.description}</p>
                    </div>
                  );
                })}

                {/* Stat Cards */}
                <div className="p-6 glass-card bg-primary/20 text-white rounded-2xl flex flex-col justify-center items-center text-center backdrop-blur-md border-primary/30">
                  <span className="text-4xl font-bold mb-1">{siteContent.stats[0].value}</span>
                  <span className="text-sm opacity-90">{siteContent.stats[0].label}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProgramsGrid
          title={siteContent.programs.title}
          subtitle={siteContent.programs.subtitle}
          items={siteContent.programs.items}
        />

        {/* Gallery — images fetched live from DB */}
        <GalleryGrid
          title={siteContent.gallery.title}
          subtitle={siteContent.gallery.subtitle}
        />

        <ContactForm
          title={siteContent.contact.title}
          subtitle={siteContent.contact.subtitle}
          info={siteContent.contact.info}
        />
      </div>
    </main>
  );
}
