#!/bin/bash

echo "🚨 VERCEL MANUAL FIX - CREATES PUBLIC DIRECTORY"
echo "================================================"

# Step 1: Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Step 2: Go to client and install dependencies
echo "📦 Installing client dependencies..."
cd client
npm install

# Step 3: Build with correct API URL
echo "🔨 Building React app with correct API URL..."
REACT_APP_API_URL=https://handyman-connect-1-ftz8.onrender.com \
REACT_APP_VERSION=7.0.0 \
GENERATE_SOURCEMAP=false \
npm run build

# Step 4: Go back to root and create public directory
echo "📁 Creating public directory..."
cd ..
rm -rf public build
mkdir -p public build

# Step 5: Copy build files to public (this is what Vercel needs!)
echo "📂 Copying build files to public directory..."
cp -r client/build/* public/
cp -r client/build/* build/

# Step 6: Verify the directories exist
echo "✅ Verification:"
if [ -d "public" ]; then
    echo "   ✅ public/ directory exists"
    if [ -f "public/index.html" ]; then
        echo "   ✅ public/index.html exists"
    else
        echo "   ❌ public/index.html missing"
    fi
    if [ -f "public/static/js/main.60294545.js" ]; then
        echo "   ✅ public/static/js/main.*.js exists"
    else
        echo "   ❌ public/static/js/main.*.js missing"
    fi
else
    echo "   ❌ public/ directory missing"
fi

echo ""
echo "🎯 FOR VERCEL:"
echo "1. This script creates the public/ directory"
echo "2. Copy this script content to your package.json build command"
echo "3. Or manually create the public directory in Vercel settings"
