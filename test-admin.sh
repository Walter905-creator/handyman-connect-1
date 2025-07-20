#!/bin/bash

# Fixlo Admin Test Script
echo "🚀 Starting Fixlo Admin Test..."

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found!"
    exit 1
fi

echo "✅ server.js found"

# Check if admin.html exists
if [ ! -f "admin.html" ]; then
    echo "❌ admin.html not found!"
    exit 1
fi

echo "✅ admin.html found"

# Check Node.js syntax
echo "🔍 Checking server.js syntax..."
node -c server.js
if [ $? -eq 0 ]; then
    echo "✅ Server syntax is valid"
else
    echo "❌ Server syntax error!"
    exit 1
fi

# Set environment variables for testing
export PORT=3000
export NODE_ENV=development
export ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@fixloapp.com"}
export ADMIN_PASSWORD=${ADMIN_PASSWORD:-"FixloAdmin2024!"}

echo "🌐 Admin credentials configured:"
echo "   Email: $ADMIN_EMAIL"
echo "   Password: [HIDDEN]"

# Start the server
echo "🚀 Starting server on port $PORT..."
echo "📱 Admin dashboard will be available at: http://localhost:$PORT/admin"
echo "🔧 Use these credentials to log in:"
echo "   Email: $ADMIN_EMAIL"
echo "   Password: $ADMIN_PASSWORD"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

node server.js
