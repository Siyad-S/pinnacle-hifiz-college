import type { Metadata } from "next";
import { getSiteContent } from '@/lib/getContent';
import ContactForm from '@/components/ui/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();
  return {
    title: "Contact Us | " + siteContent.metadata.name,
    description: "Get in touch with us for admissions, inquiries, and more information about our programs.",
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: "Contact Us | " + siteContent.metadata.name,
      description: "Get in touch with us for admissions, inquiries, and more information about our programs.",
      url: "/contact",
    },
  };
}

export default async function ContactPage() {
    const siteContent = await getSiteContent();
    return (
        <main className="min-h-screen pt-20">
            <ContactForm
                title={siteContent.contact.title}
                subtitle={siteContent.contact.subtitle}
                info={siteContent.contact.info}
            />
        </main>
    );
}
