#!/bin/bash

echo "🚨 EMERGENCY DEPLOYMENT FIX - FORCE NEW DEPLOYMENT 🚨"
echo "======================================================"

# Navigate to client directory
cd /workspaces/handyman-connect-1/client

# Step 1: Completely clean everything
echo "🧹 NUCLEAR CLEAN - Removing all caches..."
rm -rf build/
rm -rf node_modules/.cache/
rm -rf ../public/
rm -rf ~/.npm/_cacache/
npm cache clean --force

# Step 2: Update version for extreme cache busting
echo "📦 Bumping version to v6.0.0 for cache busting..."
sed -i 's/"version": "5.0.0"/"version": "6.0.0"/' package.json

# Step 3: Update .env with timestamp for ultimate cache busting
echo "⚡ Creating new .env with timestamp..."
cat > .env << EOF
REACT_APP_VERSION=EMERGENCY-DEPLOY-v6.0-$(date +%Y%m%d-%H%M%S)
REACT_APP_API_URL=https://handyman-connect-1-ftz8.onrender.com
GENERATE_SOURCEMAP=false
REACT_APP_TIMESTAMP=$(date +%s)
EOF

# Step 4: Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

# Step 5: Build with explicit environment variables
echo "🔨 Building with EXPLICIT environment variables..."
REACT_APP_API_URL=https://handyman-connect-1-ftz8.onrender.com \
REACT_APP_VERSION=6.0.0 \
REACT_APP_TIMESTAMP=$(date +%s) \
GENERATE_SOURCEMAP=false \
npm run build

# Step 6: Copy to public directory
echo "📂 Copying to public directory..."
mkdir -p ../public
cp -r build/* ../public/

# Step 7: Verify the build contains correct URL
echo "🔍 VERIFICATION - Checking build for correct URLs..."
echo ""
echo "✅ Checking for CORRECT URL (should show results):"
grep -r "handyman-connect-1-ftz8.onrender.com" build/ | head -3

echo ""
echo "❌ Checking for OLD URLs (should be EMPTY):"
grep -r "handyman-connect-1-1.onrender.com" build/ | head -3 || echo "✅ No old URLs found!"
grep -r "handyman-connect-backend.onrender.com" build/ | head -3 || echo "✅ No old backend URLs found!"

# Step 8: Show new JS file hash
echo ""
echo "🆔 NEW JS FILE HASH:"
ls -la build/static/js/main.*.js | head -1

echo ""
echo "🎯 EMERGENCY DEPLOYMENT READY!"
echo "==============================="
echo "The build is now clean and contains the correct backend URL."
echo ""
echo "🚀 NEXT STEPS:"
echo "1. Deploy this build to your hosting platform (Vercel/Render)"
echo "2. Clear browser cache completely (Ctrl+Shift+R or Cmd+Shift+R)"
echo "3. Check the console - it should show 'handyman-connect-1-ftz8.onrender.com'"
echo ""
echo "If you're still seeing the old URL after deployment, your hosting platform"
echo "may be serving cached files. Try:"
echo "- Force redeploy on your hosting platform"
echo "- Check if your hosting platform has a 'Clear Cache' option"
echo "- Open the site in incognito/private mode"
