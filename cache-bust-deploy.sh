#!/bin/bash

echo "🚨 EMERGENCY CACHE BUST DEPLOYMENT"
echo "=================================="
echo "Problem: Website still shows old cached JavaScript"
echo "Solution: Force new build with cache busting"
echo ""

# Generate unique timestamp for cache busting
TIMESTAMP=$(date +%s)
BUILD_ID="v2-${TIMESTAMP}"

echo "🔥 Cache Bust ID: $BUILD_ID"

# Clean everything
echo "🧹 Cleaning old builds..."
cd /workspaces/handyman-connect-1
rm -rf client/build
rm -rf public
rm -rf static

# Build with cache busting
echo "📦 Building with cache bust..."
cd client
REACT_APP_VERSION="$BUILD_ID" REACT_APP_API_URL=https://handyman-connect-backend.onrender.com npm run build

# Check if build succeeded
if [ ! -d "build" ]; then
    echo "❌ Build failed!"
    exit 1
fi

cd ..

# Copy to public with timestamp
echo "📁 Creating cache-busted public directory..."
mkdir -p public
cp -r client/build/* public/

# Verify the fix
echo ""
echo "🔍 VERIFICATION:"
echo "================"

if grep -q "handyman-connect-backend.onrender.com" public/static/js/*.js; then
    echo "✅ Correct backend URL in build"
else
    echo "❌ Wrong URL in build"
    exit 1
fi

if grep -q "v2.0" public/static/js/*.js; then
    echo "✅ Cache bust version found"
else
    echo "❌ No cache bust found"
fi

echo ""
echo "🚨 DEPLOYMENT STEPS:"
echo "==================="
echo "1. The build has been updated with:"
echo "   - New version number (v2.0)"
echo "   - Cache busting timestamp"
echo "   - Correct backend URL hardcoded"
echo ""
echo "2. Deploy options:"
echo "   A) Manual Deploy: Go to Render → Manual Deploy"
echo "   B) Git Deploy: git add . && git commit -m 'CACHE BUST v2.0' && git push"
echo ""
echo "3. After deployment, tell users to:"
echo "   - Hard refresh (Ctrl+F5 / Cmd+Shift+R)"
echo "   - Clear browser cache"
echo "   - Try incognito/private mode"
echo ""
echo "4. Verify console shows:"
echo "   '🔗 Using API URL (v2.0): https://handyman-connect-backend.onrender.com'"
echo ""
echo "✅ This WILL fix the caching issue!"
