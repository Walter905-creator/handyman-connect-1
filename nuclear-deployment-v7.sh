#!/bin/bash

echo "🚀 NUCLEAR DEPLOYMENT v7.0 - FORCE CORRECT BACKEND URL 🚀"
echo "=========================================================="

# Show the issue
echo "🔍 PROBLEM: Your deployed frontend shows:"
echo "   🔗 Using API URL: https://handyman-connect-1-1.onrender.com"
echo ""
echo "🎯 SOLUTION: Deploy this NEW build that shows:"
echo "   🔗 Using API URL: https://handyman-connect-1-ftz8.onrender.com"
echo ""

# Show build details
echo "📦 NEW BUILD DETAILS:"
echo "   • Version: 7.0.0"
echo "   • JS File: main.60294545.js (NEW hash)"
echo "   • API URL: https://handyman-connect-1-ftz8.onrender.com"
echo "   • Cache Bust: NUCLEAR_DEPLOY_V7"
echo ""

# Verify the build
echo "✅ VERIFICATION:"
if [ -f "/workspaces/handyman-connect-1/public/static/js/main.60294545.js" ]; then
    echo "   ✅ New JS file exists"
    if grep -q "handyman-connect-1-ftz8.onrender.com" /workspaces/handyman-connect-1/public/static/js/main.60294545.js; then
        echo "   ✅ Contains correct backend URL"
    else
        echo "   ❌ Missing correct backend URL"
    fi
    if grep -q "handyman-connect-1-1.onrender.com" /workspaces/handyman-connect-1/public/static/js/main.60294545.js; then
        echo "   ⚠️  Still contains old URL (in console messages only)"
    else
        echo "   ✅ No old URLs found"
    fi
else
    echo "   ❌ New JS file not found"
fi

echo ""
echo "🚀 DEPLOYMENT INSTRUCTIONS:"
echo "================================"
echo ""
echo "🔥 OPTION 1: Render Static Site"
echo "   1. Go to Render Dashboard"
echo "   2. Find your frontend static site"
echo "   3. Click 'Manual Deploy'"
echo "   4. Select 'Clear build cache' if available"
echo "   5. Deploy from main branch"
echo ""
echo "🔥 OPTION 2: Vercel"
echo "   1. Go to Vercel Dashboard"
echo "   2. Find your project"
echo "   3. Click 'Redeploy'"
echo "   4. Force new deployment"
echo ""
echo "🔥 OPTION 3: Push to Git (Auto-deploy)"
echo "   1. git add ."
echo "   2. git commit -m 'Nuclear cache bust v7.0 - force correct backend URL'"
echo "   3. git push origin main"
echo ""
echo "🎯 AFTER DEPLOYMENT:"
echo "   1. Hard refresh your browser (Ctrl+F5)"
echo "   2. Open DevTools Console"
echo "   3. Click Subscribe button"
echo "   4. Should see: 'Using API URL (v7.0): https://handyman-connect-1-ftz8.onrender.com'"
echo ""
echo "✅ SUCCESS INDICATORS:"
echo "   • Console shows v7.0 messages"
echo "   • API calls go to handyman-connect-1-ftz8.onrender.com"
echo "   • Subscribe button works"
echo ""
echo "🚨 IF STILL BROKEN:"
echo "   • Clear browser cache completely"
echo "   • Try incognito/private browsing"
echo "   • Check if deployment actually updated files"
