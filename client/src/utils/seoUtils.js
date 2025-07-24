import servicesData from '../data/services.json';

export const generateSitemap = () => {
  const baseUrl = 'https://fixlo.app'; // Replace with your actual domain
  const staticPages = [
    '/',
    '/download',
    '/how-it-works',
    '/support',
    '/pricing',
    '/signup',
    '/pro-support',
    '/terms',
    '/terms-of-service',
    '/privacy',
    '/contact',
    '/subscribe'
  ];

  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Add service pages
  servicesData.services.forEach(service => {
    sitemap += `
  <url>
    <loc>${baseUrl}${service.url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const downloadSitemap = () => {
  const sitemapContent = generateSitemap();
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateRobotsTxt = () => {
  const baseUrl = 'https://fixlo.app'; // Replace with your actual domain
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Common crawl delays (optional)
Crawl-delay: 1

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow service pages
Allow: /services/`;
};

export const downloadRobotsTxt = () => {
  const robotsContent = generateRobotsTxt();
  const blob = new Blob([robotsContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};