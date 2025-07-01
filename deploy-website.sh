#!/bin/bash

echo "🌐 Deploying Fixlo Website to fixloapp.com"
echo "=========================================="

# Navigate to website directory
cd website

echo "📦 Files ready for deployment:"
ls -la

echo ""
echo "🎯 Deployment Options:"
echo ""
echo "Option 1 - Vercel (Recommended):"
echo "  1. Install Vercel CLI: npm i -g vercel"
echo "  2. Run: vercel --prod"
echo "  3. Configure custom domain: fixloapp.com"
echo ""
echo "Option 2 - Manual Upload:"
echo "  Upload these files to your hosting:"
echo "  - index.html (homepage)"
echo "  - privacy.html (privacy policy)"
echo "  - terms.html (terms of service)"
echo "  - vercel.json (configuration)"
echo ""
echo "🔗 Required URLs for App Store:"
echo "  - Privacy: https://fixloapp.com/privacy"
echo "  - Terms: https://fixloapp.com/terms"
echo ""
echo "✅ Website is ready for fixloapp.com deployment!"
