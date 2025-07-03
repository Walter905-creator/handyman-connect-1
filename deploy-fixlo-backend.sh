#!/bin/bash

# 🚀 Deploy Fixlo Backend to Render
# This script helps deploy the newly branded Fixlo backend

echo "🚀 Deploying Fixlo Backend to Render..."
echo ""

echo "📋 Pre-deployment checklist:"
echo "1. ✅ Backend code updated with Fixlo branding"
echo "2. ✅ CORS configured for fixloapp.com domains"
echo "3. ✅ API endpoints return Fixlo messages"
echo "4. ✅ render-fixlo-backend.yaml configuration ready"
echo ""

echo "🔧 Next steps (manual):"
echo "1. Go to https://render.com/dashboard"
echo "2. Create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use these settings:"
echo "   • Name: fixlo-backend"
echo "   • Environment: Node"
echo "   • Build Command: npm install"
echo "   • Start Command: node index.js"
echo "   • Root Directory: server"
echo ""

echo "🔗 Environment Variables to set in Render:"
echo "   • NODE_ENV=production"
echo "   • CLIENT_URL=https://fixloapp.com"
echo "   • MONGO_URI=[your MongoDB connection string]"
echo "   • JWT_SECRET=[your JWT secret]"
echo "   • STRIPE_SECRET_KEY=[your Stripe secret]"
echo "   • Plus all other environment variables from your current backend"
echo ""

echo "⚡ After deployment:"
echo "1. Your new backend will be at: https://fixlo-backend.onrender.com"
echo "2. Test: https://fixlo-backend.onrender.com/api"
echo "3. Update DNS to point api.fixloapp.com to this new backend"
echo ""

echo "🎯 This will give you a professional Fixlo-branded backend!"
echo "✅ All configs in this repo are already updated for fixlo-backend.onrender.com"
