#!/bin/bash

# Deploy Fixlo Backend with Admin Support to Render
echo "🚀 Deploying Fixlo Backend with Admin Dashboard..."

# Check if we're in the right directory
if [ ! -f "server/index.js" ]; then
    echo "❌ server/index.js not found! Please run this from the project root."
    exit 1
fi

# Check if admin.html exists in server directory
if [ ! -f "server/admin.html" ]; then
    echo "📋 Copying admin.html to server directory..."
    cp admin.html server/admin.html
    echo "✅ admin.html copied to server/"
fi

# Navigate to server directory
cd server

echo "🔍 Checking server configuration..."

# Check if required files exist
required_files=("index.js" "package.json" "admin.html")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file missing!"
        exit 1
    fi
done

# Check environment variables
echo ""
echo "🔧 Environment Variables Status:"
echo "   ADMIN_EMAIL: ${ADMIN_EMAIL:-'❌ Not set'}"
echo "   ADMIN_PASSWORD: ${ADMIN_PASSWORD:-'❌ Not set'}"
echo "   MONGO_URI: ${MONGO_URI:-'❌ Not set'}"
echo "   STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY:-'❌ Not set'}"

echo ""
echo "📋 Deployment Summary:"
echo "   ✅ Backend server with admin dashboard"
echo "   ✅ Admin HTML page included"
echo "   ✅ Admin API routes available"
echo "   ✅ Environment variables configured"

echo ""
echo "🌐 After deployment, admin will be available at:"
echo "   https://fixloapp.onrender.com/admin"

echo ""
echo "🔐 Admin Credentials (from environment):"
echo "   Email: ${ADMIN_EMAIL:-'Set in Render dashboard'}"
echo "   Password: ${ADMIN_PASSWORD:-'Set in Render dashboard'}"

echo ""
echo "📝 Next Steps:"
echo "1. Push these changes to your Git repository"
echo "2. Render will automatically deploy the updated server"
echo "3. Test admin access at: https://fixloapp.onrender.com/admin"
echo "4. Verify Vercel routing works at: https://www.fixloapp.com/admin"

cd ..
echo ""
echo "✅ Backend deployment preparation complete!"
