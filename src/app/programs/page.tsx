import type { Metadata } from "next";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore our pathways to Quranic excellence with combined Hifz and CBSE education.",
};
import ProgramsGrid from "@/components/ui/ProgramsGrid";

export default function ProgramsPage() {
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
