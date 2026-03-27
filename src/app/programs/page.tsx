import type { Metadata } from "next";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore our pathways to Quranic excellence with combined Hifz and CBSE education.",
};
import ProgramsGrid from "@/components/ui/ProgramsGrid";

export default function ProgramsPage() {
    return (
        <main className="pt-24 min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Reusing ProgramsGrid but possibly with more details or different layout if needed. 
           For now, reusing the component acting as the main list. 
       */}
            <div className="bg-white dark:bg-slate-900 py-16 text-center">
                <h1 className="font-heading text-5xl md:text-6xl font-bold text-secondary mb-4">{siteContent.programs.title}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">{siteContent.programs.subtitle}</p>
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
