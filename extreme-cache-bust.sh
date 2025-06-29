#!/bin/bash

echo "🚨🚨🚨 EXTREME CACHE BUSTING DEPLOYMENT v3.0 🚨🚨🚨"
echo "=================================================="
echo "CRITICAL: Website still serving old cached files!"
echo "SOLUTION: Nuclear cache bust with force deployment"
echo ""

# Get current timestamp for unique builds
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BUILD_ID="CACHEBUST-${TIMESTAMP}"

echo "🔥 EXTREME Cache Bust ID: $BUILD_ID"
echo "🎯 Target: Force browsers to download new JavaScript"
echo ""

# Nuclear clean
echo "🧹 NUCLEAR CLEAN..."
rm -rf /workspaces/handyman-connect-1/client/build
rm -rf /workspaces/handyman-connect-1/public
rm -rf /workspaces/handyman-connect-1/static
rm -rf /workspaces/handyman-connect-1/client/node_modules/.cache

# Update package version for more cache busting
echo "📦 Bumping version for cache bust..."
cd /workspaces/handyman-connect-1/client
sed -i 's/"version": "2.0.0"/"version": "3.0.0"/' package.json

# Create .env with timestamp
echo "REACT_APP_VERSION=$BUILD_ID" > .env
echo "REACT_APP_API_URL=https://handyman-connect-backend.onrender.com" >> .env
echo "GENERATE_SOURCEMAP=false" >> .env

# Force fresh install and build
echo "📦 Fresh install and build..."
npm install --silent
REACT_APP_VERSION="$BUILD_ID" npm run build

# Verify build
if [ ! -d "build" ]; then
    echo "❌ BUILD FAILED!"
    exit 1
fi

echo "✅ New build created with hash: $(ls build/static/js/main.*.js | head -1)"

# Create public directory
cd /workspaces/handyman-connect-1
mkdir -p public
cp -r client/build/* public/

# Final verification
echo ""
echo "🔍 FINAL VERIFICATION:"
echo "====================="

if grep -q "v3.0" public/static/js/*.js; then
    echo "✅ Version 3.0 found in build"
else
    echo "❌ Version 3.0 NOT found"
fi

if grep -q "handyman-connect-backend.onrender.com" public/static/js/*.js; then
    echo "✅ Correct backend URL in build"
else
    echo "❌ Wrong URL in build"
    exit 1
fi

echo ""
echo "🚨 CRITICAL DEPLOYMENT INSTRUCTIONS:"
echo "===================================="
echo ""
echo "1. 🚀 DEPLOY IMMEDIATELY:"
echo "   A) Render Dashboard → handyman-connect-1 → Manual Deploy"
echo "   B) OR: git add . && git commit -m 'EXTREME CACHE BUST v3.0' && git push"
echo ""
echo "2. 🧹 FORCE USER CACHE CLEAR:"
echo "   After deployment, users MUST:"
echo "   - Hard refresh: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)"
echo "   - Clear ALL browser data for your site"
echo "   - Use Incognito/Private mode"
echo "   - Try different browser"
echo ""
echo "3. ✅ SUCCESS INDICATORS:"
echo "   Console should show:"
echo "   '🚀 DEPLOYMENT v3.0 - EXTREME CACHE BUST ACTIVE!'"
echo "   '🔗 Using API URL (v3.0): https://handyman-connect-backend.onrender.com'"
echo ""
echo "4. ❌ IF STILL FAILING:"
echo "   The deployment has NOT been updated yet!"
echo "   Check Render dashboard for deployment status!"
echo ""
echo "🎯 This WILL force new JavaScript download!"
echo "🔥 Build ID: $BUILD_ID"
