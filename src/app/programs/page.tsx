import type { Metadata } from "next";
import { getSiteContent } from "@/lib/getContent";
import ProgramsGrid from "@/components/ui/ProgramsGrid";

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();
  return {
    title: "Programs | " + siteContent.metadata.name,
    description: "Explore our pathways to Quranic excellence with combined Hifz and CBSE education.",
    alternates: {
      canonical: "/programs",
    },
    openGraph: {
      title: "Programs | " + siteContent.metadata.name,
      description: "Explore our pathways to Quranic excellence with combined Hifz and CBSE education.",
      url: "/programs",
    },
  };
}

export default async function ProgramsPage() {
    const siteContent = await getSiteContent();
    return (
        <main className="pt-24 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">{siteContent.programs.title}</h1>
                    <p className="text-xl text-slate-200">{siteContent.programs.subtitle}</p>
                </div>
            </div>

            <ProgramsGrid
                title=""
                subtitle=""
                items={siteContent.programs.items}
                limitDescription={false}
            />
        </main>
    );
}
