import type { Metadata } from "next";
import { siteContent } from '@/data/siteContent';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us for admissions, inquiries, and more information about our programs.",
};
import ContactForm from '@/components/ui/ContactForm';

export default function ContactPage() {
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
