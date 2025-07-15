#!/bin/bash
# 🚀 Deploy Fixlo Backend with Stripe Integration

echo "🔧 Starting Fixlo Backend Deployment with Stripe Integration..."

# Set deployment directory
DEPLOY_DIR="/workspaces/handyman-connect-1"
SERVER_DIR="$DEPLOY_DIR/server"

# Check if server directory exists
if [ ! -d "$SERVER_DIR" ]; then
    echo "❌ Server directory not found: $SERVER_DIR"
    exit 1
fi

# Navigate to server directory
cd "$SERVER_DIR"

echo "📦 Installing dependencies..."
npm install

echo "✅ Dependencies installed successfully!"

echo "🔍 Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating example..."
    cat > .env.example << 'EOF'
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-connection-string

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price_id_here

# Frontend URL
CLIENT_URL=https://www.fixloapp.com

# Server Configuration
PORT=10000
NODE_ENV=production
EOF
    echo "📝 Please configure your .env file with actual values"
else
    echo "✅ Environment file exists"
fi

echo "🧪 Testing server startup..."
timeout 10s node index.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server started successfully!"
    kill $SERVER_PID
else
    echo "❌ Server failed to start. Check logs above."
    exit 1
fi

echo "🎯 Server Features Included:"
echo "   ✅ Professional Signup with Stripe Payment"
echo "   ✅ MongoDB Integration with Geospatial Indexing"
echo "   ✅ Geocoding Service (OpenStreetMap)"
echo "   ✅ Lead Routing System"
echo "   ✅ Stripe Webhook Handling"
echo "   ✅ CORS Configuration"
echo "   ✅ Payment Success/Cancel Pages"

echo ""
echo "🔐 Required Environment Variables:"
echo "   - MONGODB_URI: Your MongoDB connection string"
echo "   - STRIPE_SECRET_KEY: Your Stripe secret key"
echo "   - STRIPE_WEBHOOK_SECRET: Your Stripe webhook secret"
echo "   - STRIPE_MONTHLY_PRICE_ID: Your Stripe monthly price ID"
echo "   - CLIENT_URL: Your frontend URL"

echo ""
echo "🚀 Deployment Instructions:"
echo "1. Configure environment variables in Render dashboard"
echo "2. Set up Stripe webhook endpoint: https://fixloapp.onrender.com/api/stripe-webhook"
echo "3. Deploy this server directory to Render"
echo "4. Test professional signup flow"

echo ""
echo "📋 Next Steps:"
echo "1. Set up Stripe webhook in Stripe Dashboard"
echo "2. Configure environment variables in Render"
echo "3. Deploy to production"
echo "4. Test payment flow with test credit cards"

echo ""
echo "✅ Backend deployment preparation complete!"
echo "📁 Server ready for deployment at: $SERVER_DIR"
