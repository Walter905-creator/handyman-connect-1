# 🚀 QUICK DEPLOYMENT FIX CHECKLIST

## ❌ Current Problem:
- Render is trying to run frontend as Node.js service
- Stripe 400 errors due to missing environment variables

## ✅ STEP-BY-STEP FIX:

### 1️⃣ **Delete Wrong Frontend Service**
- Go to Render Dashboard
- Find the service giving "Cannot find module '/opt/render/project/src/client/index.js'" error
- Go to Settings → Delete Service

### 2️⃣ **Create Backend Service (Node.js Web Service)**
- **New → Web Service**
- **Repository**: handyman-connect-1
- **Name**: handyman-connect-backend
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`

**Environment Variables** (CRITICAL):
```
NODE_ENV=production
PORT=10000
STRIPE_PRICE_ID=price_1Rf0cZPQ4Cetf7g6ekd8hPLb
CLIENT_URL=https://handyman-connect-frontend.onrender.com
STRIPE_SECRET_KEY=[your-stripe-secret-key]
MONGO_URI=[your-mongodb-uri]
JWT_SECRET=[your-jwt-secret]
ADMIN_EMAIL=[your-admin-email]
ADMIN_PASSWORD=[your-admin-password]
```

### 3️⃣ **Create Frontend Service (Static Site)**
- **New → Static Site**
- **Repository**: handyman-connect-1
- **Name**: handyman-connect-frontend
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

**Environment Variables**:
```
REACT_APP_API_URL=https://handyman-connect-backend.onrender.com
```

### 4️⃣ **Test After Deployment**
Backend health: `https://handyman-connect-backend.onrender.com/api`
Frontend: `https://handyman-connect-frontend.onrender.com`
Stripe: Should work without 400 errors

## 🎯 This Will Fix Both Issues:
✅ No more "Cannot find module" errors
✅ Stripe checkout will work properly
