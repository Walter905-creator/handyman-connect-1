const fs = require('fs');
const path = require('path');

// Import services data
const servicesData = require('./src/data/services.json');

const generateSitemap = () => {
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

// Generate and save sitemap
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
console.log(`📊 Total URLs: ${servicesData.services.length + 12} (${servicesData.services.length} service pages + 12 static pages)`);