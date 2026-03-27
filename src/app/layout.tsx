import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri } from "next/font/google";
import { siteContent } from "@/data/siteContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "./providers"; // Import the client provider
import CanvasWrapper from "@/components/3d/CanvasWrapper";
import FloatingParticles from "@/components/3d/FloatingParticles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` : "https://pinnaclehifz.com";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: siteContent.metadata.name,
    template: `%s | ${siteContent.metadata.name}`,
  },
  description: siteContent.metadata.description,
  keywords: ["Pinnacle Hifzul Quran Academy", "Quran Academy Kannanalloor", "Hifz Academy Kollam", "Best Quran Academy in Kerala", "CBSE Islamic School Kollam", "Tajweed Mastery", "Kerala Residential Quran School"],
  authors: [{ name: "Pinnacle Hifzul Quran Academy" }],
  creator: "Pinnacle Hifzul Quran Academy",
  icons: {
    icon: "/logo/pinnacle-logo.png",
    shortcut: "/logo/pinnacle-logo.png",
    apple: "/logo/pinnacle-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: siteContent.metadata.name,
    description: siteContent.metadata.description,
    siteName: siteContent.metadata.name,
    images: [
      {
        url: "/images/hero-fallback.jpg", // A generic high quality image fallback
        width: 1200,
        height: 630,
        alt: siteContent.metadata.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.metadata.name,
    description: siteContent.metadata.description,
    images: ["/images/hero-fallback.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}
      >
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "Pinnacle Hifzul Quran Academy",
                "alternateName": "Pinnacle Quran Academy Kollam",
                "url": defaultUrl,
                "description": siteContent.metadata.description,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kannanalloor, Kollam",
                  "addressRegion": "Kerala",
                  "postalCode": "691576",
                  "addressCountry": "IN"
                }
              })
            }}
          />
          {/* Global 3D Background */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
            <CanvasWrapper cameraPosition={[0, 0, 20]} fov={60}>
              <FloatingParticles count={500} />
            </CanvasWrapper>
          </div>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
