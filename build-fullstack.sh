#!/bin/bash
set -e

echo "🚀 Starting Handyman Connect Full Build..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install --production

# Build frontend
echo "🎨 Building React frontend..."
cd client
npm install --production
npm run build
echo "✅ Frontend build complete"

# Install backend dependencies
echo "🖥️ Installing backend dependencies..."
cd ../server
npm install --production
echo "✅ Backend dependencies installed"

# Verify build structure
echo "📂 Verifying build structure..."
ls -la ../client/build/ || echo "❌ Frontend build not found"
ls -la . || echo "❌ Backend directory issue"

echo "🎉 Full build complete! Ready to start server."
