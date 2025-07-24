const fs = require('fs');
const path = require('path');

// Define the pages that should be included in the sitemap
const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/how-it-works.html', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact.html', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact-support.html', priority: '0.7', changefreq: 'monthly' },
  { url: '/support.html', priority: '0.7', changefreq: 'monthly' },
  { url: '/login.html', priority: '0.6', changefreq: 'weekly' },
  { url: '/signup.html', priority: '0.8', changefreq: 'weekly' },
  { url: '/pro-signup.html', priority: '0.8', changefreq: 'weekly' },
  { url: '/pro-support.html', priority: '0.7', changefreq: 'monthly' },
  { url: '/dashboard.html', priority: '0.9', changefreq: 'daily' },
  { url: '/privacy.html', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms.html', priority: '0.5', changefreq: 'yearly' },
  { url: '/sms-compliance.html', priority: '0.5', changefreq: 'yearly' },
  { url: '/payment-success.html', priority: '0.3', changefreq: 'yearly' },
  { url: '/payment-cancel.html', priority: '0.3', changefreq: 'yearly' }
];

// Generate XML sitemap
function generateSitemap() {
  const baseUrl = 'https://www.fixloapp.com';
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Write sitemap to public directory
function writeSitemap() {
  const sitemap = generateSitemap();
  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Sitemap generated successfully at:', sitemapPath);
  console.log(`📍 Generated ${pages.length} URLs in sitemap`);
}

// Run the generator
if (require.main === module) {
  try {
    writeSitemap();
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

module.exports = { generateSitemap, writeSitemap };