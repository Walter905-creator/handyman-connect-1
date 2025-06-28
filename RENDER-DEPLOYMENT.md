# Render Deployment Instructions

## Overview
This project should be deployed as TWO separate services on Render:
1. **Backend**: Node.js Web Service (server/)
2. **Frontend**: Static Site (client/)

## Step 1: Deploy Backend (Node.js Web Service)

### In Render Dashboard:
1. Go to **New → Web Service**
2. Connect your GitHub repository: `handyman-connect-1`
3. Configure:
   - **Name**: `handyman-connect-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

### Environment Variables:
```
NODE_ENV=production
PORT=10000
STRIPE_PRICE_ID=price_1Rf0cZPQ4Cetf7g6ekd8hPLb
CLIENT_URL=https://handyman-connect-frontend.onrender.com
MONGO_URI=[your-mongodb-connection-string]
JWT_SECRET=[your-jwt-secret]
STRIPE_SECRET_KEY=[your-stripe-secret-key]
ADMIN_EMAIL=[your-admin-email]
ADMIN_PASSWORD=[your-admin-password]
OPENAI_API_KEY=[your-openai-key]
TWILIO_ACCOUNT_SID=[your-twilio-sid]
TWILIO_AUTH_TOKEN=[your-twilio-token]
TWILIO_PHONE=[your-twilio-phone]
```

## Step 2: Deploy Frontend (Static Site)

### In Render Dashboard:
1. Go to **New → Static Site**
2. Connect your GitHub repository: `handyman-connect-1`
3. Configure:
   - **Name**: `handyman-connect-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### Environment Variables:
```
REACT_APP_API_URL=https://handyman-connect-backend.onrender.com
```

## Step 3: Update URLs After Deployment

Once both services are deployed, update:

1. **Backend CLIENT_URL** environment variable to match your actual frontend URL
2. **Frontend REACT_APP_API_URL** to match your actual backend URL

## Testing

### Backend Health Check:
```bash
curl https://handyman-connect-backend.onrender.com/api
```

### Frontend:
Visit: `https://handyman-connect-frontend.onrender.com`

### Stripe Checkout:
```bash
curl -X POST https://handyman-connect-backend.onrender.com/api/stripe/create-checkout-session
```
# Updated Sat Jun 28 17:09:32 UTC 2025
