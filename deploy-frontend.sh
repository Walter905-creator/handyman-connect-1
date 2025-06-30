#!/bin/bash

echo "🚀 Deploying Fixlo Frontend with Updated Backend URL"
echo "=================================================="

# Navigate to client directory
cd client

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting environment variable..."
export REACT_APP_API_URL=https://fixlo-backend.onrender.com

echo "🏗️ Building frontend with correct backend URL..."
npm run build

echo "📋 Copying build files to root..."
cp -r build/* ../

echo "✅ Fixlo Frontend build complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Deploy the frontend to fixloapp.com using render-frontend.yaml"
echo "2. The frontend will use: https://fixlo-backend.onrender.com"
echo "3. Make sure to set REACT_APP_API_URL=https://fixlo-backend.onrender.com in Render"
echo "4. Configure DNS for fixloapp.com to point to your hosting service"
echo ""
echo "Files ready for deployment:"
ls -la ../index.html ../static/js/main.*.js | head -5
