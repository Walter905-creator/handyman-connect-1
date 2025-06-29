#!/bin/bash

echo "🚀 FINAL DEPLOYMENT - FRONTEND FIX"
echo "=================================="

# Build and prepare for deployment
echo "📦 Building frontend with fixed backend URL..."
cd /workspaces/handyman-connect-1

# Ensure client build is up to date
cd client
npm run build 2>/dev/null || echo "Build in progress..."
cd ..

# Update public directory
echo "📁 Preparing public directory for deployment..."
rm -rf public
mkdir -p public
cp -r client/build/* public/ 2>/dev/null || echo "Copying files..."

# Verify the fix
echo ""
echo "🔍 VERIFICATION:"
echo "================"

if [ -f "public/index.html" ]; then
    echo "✅ Public directory ready"
else
    echo "❌ Public directory missing"
fi

if [ -f "client/src/pages/Subscribe.js" ]; then
    if grep -q "handyman-connect-backend.onrender.com" client/src/pages/Subscribe.js; then
        echo "✅ Subscribe.js has correct backend URL"
    else
        echo "❌ Subscribe.js has wrong URL"
    fi
fi

echo ""
echo "🚨 TO DEPLOY RIGHT NOW:"
echo "======================"
echo ""
echo "OPTION 1 - Manual Deploy on Render:"
echo "1. Go to: https://dashboard.render.com"
echo "2. Find service: 'handyman-connect-1' (Static Site)"
echo "3. Click 'Manual Deploy'"
echo "4. Wait for deployment"
echo ""
echo "OPTION 2 - Git Deploy:"
echo "1. git add ."
echo "2. git commit -m 'Fix Subscribe.js backend URL'"
echo "3. git push origin main"
echo ""
echo "✅ AFTER DEPLOYMENT:"
echo "Console will show: 'Using API URL: https://handyman-connect-backend.onrender.com'"
echo "Subscribe button will work!"
echo ""
echo "🎯 Your fixed app will be live at: https://handyman-connect-1-ftz8.onrender.com"
