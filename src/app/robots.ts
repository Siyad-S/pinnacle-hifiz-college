import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
