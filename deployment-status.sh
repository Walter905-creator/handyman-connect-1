#!/bin/bash

echo "🔍 DEPLOYMENT STATUS CHECK"
echo "=========================="

echo ""
echo "✅ LOCAL CODE STATUS:"
echo "--------------------"

# Check if local Subscribe.js has the fix
if grep -q "const API_URL = 'https://handyman-connect-backend.onrender.com';" client/src/pages/Subscribe.js; then
    echo "✅ Subscribe.js - Fixed (hardcoded URL)"
else
    echo "❌ Subscribe.js - Still has env var dependency"
fi

# Check if local build has the fix
if [ -f "client/build/static/js/main.a67ee18d.js" ]; then
    if grep -q "handyman-connect-backend.onrender.com" client/build/static/js/main.a67ee18d.js; then
        echo "✅ Build files - Contain correct URL"
    else
        echo "❌ Build files - Still have wrong URL"
    fi
else
    echo "❌ Build files - Not found"
fi

echo ""
echo "🚨 DEPLOYMENT STATUS:"
echo "--------------------"
echo "❌ Frontend still deployed with OLD code"
echo "❌ Console shows: 'Using API URL: https://handyman-connect-1-ftz8.onrender.com'"
echo "❌ Subscribe button returns 400 error"

echo ""
echo "🔧 IMMEDIATE ACTION REQUIRED:"
echo "----------------------------"
echo "1. Go to Render Dashboard"
echo "2. Find 'handyman-connect-frontend' service"
echo "3. Click 'Manual Deploy' or 'Redeploy'"
echo "4. Wait for deployment to complete"
echo ""
echo "OR"
echo ""
echo "1. Commit and push these code changes"
echo "2. Trigger automatic deployment"

echo ""
echo "🎯 AFTER DEPLOYMENT:"
echo "-------------------"
echo "✅ Console will show: 'Using API URL: https://handyman-connect-backend.onrender.com'"
echo "✅ Subscribe button will work"
echo "✅ No more 400 errors"

echo ""
echo "📋 Files ready for deployment:"
echo "- render-frontend.yaml (deployment config)"
echo "- client/build/ (updated build files)"
echo "- All source files updated with correct URLs"
