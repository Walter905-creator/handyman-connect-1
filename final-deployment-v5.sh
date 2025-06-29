#!/bin/bash

echo "🚀 FINAL DEPLOYMENT - v5.0 - ENV VAR ONLY BUILD 🚀"
echo "================================================="

# Navigate to client directory
cd /workspaces/handyman-connect-1/client

# Show current environment variables
echo "📋 Current Environment Variables:"
echo "REACT_APP_API_URL: $(grep REACT_APP_API_URL .env | cut -d'=' -f2)"
echo "REACT_APP_VERSION: $(grep REACT_APP_VERSION .env | cut -d'=' -f2)"

# Clean everything
echo "🧹 Cleaning build cache and directories..."
rm -rf build/
rm -rf node_modules/.cache/
rm -rf ../public/
npm run build:clean 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build with production environment
echo "🔨 Building production bundle..."
REACT_APP_API_URL=https://handyman-connect-1-ftz8.onrender.com \
REACT_APP_VERSION=5.0.0 \
GENERATE_SOURCEMAP=false \
npm run build

# Copy to public directory
echo "📂 Copying build to public directory..."
mkdir -p ../public
cp -r build/* ../public/

# Show build results
echo "✅ Build Complete!"
echo "📊 Build Statistics:"
ls -la build/static/js/ | grep main
echo ""
echo "🔍 Checking for correct API URL in build:"
grep -r "handyman-connect-1-ftz8.onrender.com" build/ | head -5
echo ""
echo "❌ Checking for old URLs (should be empty):"
grep -r "handyman-connect-1-1.onrender.com" build/ | head -5 || echo "✅ No old URLs found!"
grep -r "handyman-connect-backend.onrender.com" build/ | head -5 || echo "✅ No old backend URLs found!"

echo ""
echo "🎯 DEPLOYMENT READY!"
echo "Next steps:"
echo "1. Deploy this build to your frontend hosting (Vercel/Render)"
echo "2. Update backend CLIENT_URL if needed"
echo "3. Clear browser cache / hard refresh"
echo "4. Test the Subscribe button"
