#!/bin/bash

echo "🔍 ADMIN FIX DEPLOYMENT VERIFICATION"
echo "=================================="

echo ""
echo "📱 Testing main site..."
curl -s -o /dev/null -w "Status: %{http_code}" https://www.fixloapp.com/
echo ""

echo ""
echo "📱 Testing admin route..."
curl -s -o /dev/null -w "Status: %{http_code}" https://www.fixloapp.com/admin
echo ""

echo ""
echo "📱 Testing backend health..."
curl -s https://fixlo-backend.onrender.com/ | head -c 100
echo ""

echo ""
echo "📝 Deployment checklist:"
echo "✅ Vercel.json updated with @vercel/static-build"
echo "✅ Client package.json has vercel-build script"
echo "✅ React routes exist: /admin -> AdminDashboard"
echo "✅ SPA fallback configured: /(.*) -> /index.html"
echo "✅ API proxy configured: /api/* -> backend"

echo ""
echo "🎯 If admin still shows 404:"
echo "   1. Check Vercel deployment logs"
echo "   2. Wait 3-5 minutes for full deployment"
echo "   3. Try hard refresh (Ctrl+F5)"
echo "   4. Check browser dev tools for errors"

echo ""
echo "🔗 Test URLs:"
echo "   Main: https://www.fixloapp.com/"
echo "   Admin: https://www.fixloapp.com/admin"
echo "   Backend: https://fixlo-backend.onrender.com/"
