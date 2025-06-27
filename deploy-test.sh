#!/bin/bash

echo "🚀 Testing Handyman Connect Server Deployment..."

# Test if server starts
cd /workspaces/handyman-connect-1/server

echo "📦 Installing dependencies..."
npm install --silent

echo "🔧 Testing server startup..."
timeout 3s node index.js &
SERVER_PID=$!

sleep 2

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server starts successfully!"
    kill $SERVER_PID
else
    echo "❌ Server failed to start"
    exit 1
fi

echo "📋 Server is ready for deployment!"
echo ""
echo "🌐 Deploy to Render.com:"
echo "1. Connect your GitHub repository"  
echo "2. Choose 'Web Service'"
echo "3. Set build command: npm install"
echo "4. Set start command: npm start"
echo "5. Add environment variables from .env.example"
echo ""
echo "🎯 Your app will be available at: https://handyman-connect-1-1.onrender.com"
