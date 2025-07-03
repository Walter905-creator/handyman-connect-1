# 🚀 Deployment Guide for Fixlo

## Quick Deploy to Render.com

### 1. Backend Deployment

1. **Go to [Render.com](https://render.com)** and sign in
2. **Connect your GitHub repository**
3. **Create a new Web Service**
4. **Configure the service:**
   - **Name**: `handyman-connect-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node.js`

5. **Add Environment Variables** (in Render dashboard):

**Required Variables:**
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/handyman-connect
JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long
ADMIN_EMAIL=admin@handyman-connect.com
ADMIN_PASSWORD=your-secure-admin-password
CLIENT_URL=https://www.handyman-connect.com
```

**Optional Service Variables** (add if using these services):
```
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE=+1234567890
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_FIRST_MONTH_PRICE_ID=price_your-first-month-price-id
STRIPE_MONTHLY_PRICE_ID=price_your-monthly-price-id
OPENAI_API_KEY=sk-your-openai-api-key
```

### 2. Frontend Deployment (Vercel/Netlify)

1. **Deploy the client folder** to Vercel or Netlify
2. **Set environment variable:**
   ```
   REACT_APP_API_URL=https://your-render-app.onrender.com
   ```
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`

### 3. Database Setup (MongoDB Atlas)

1. **Create a MongoDB Atlas account**
2. **Create a new cluster**
3. **Add your IP address to whitelist** (or use 0.0.0.0/0 for all IPs)
4. **Create database user**
5. **Get connection string** and add to `MONGO_URI`

## CORS Fix Applied ✅

Your CORS issues have been resolved with these changes:
- ✅ CORS middleware moved before routes
- ✅ Production URLs added to allowed origins
- ✅ Proper preflight request handling
- ✅ All necessary headers and methods enabled

## Testing Your Deployment

After deployment, test these endpoints:

1. **Health Check**: `https://your-app.onrender.com/api`
2. **CORS Test**: `https://your-app.onrender.com/api/cors-test`
3. **Admin API**: `https://your-app.onrender.com/api/admin/pros`

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | Database connection | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | JWT token encryption | `your-super-secure-secret-key-32-chars` |
| `ADMIN_EMAIL` | Admin login email | `admin@handyman-connect.com` |
| `ADMIN_PASSWORD` | Admin login password | `SecurePassword123!` |
| `CLIENT_URL` | Frontend URL for CORS | `https://www.handyman-connect.com` |
| `TWILIO_*` | SMS notifications | From Twilio dashboard |
| `STRIPE_*` | Payment processing | From Stripe dashboard |
| `OPENAI_API_KEY` | AI assistant | From OpenAI dashboard |

## Post-Deployment Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed with correct API URL
- [ ] Database connected and accessible
- [ ] CORS working (no browser errors)
- [ ] Admin login functional
- [ ] Service request form working
- [ ] SMS notifications working (if configured)
- [ ] Payment system working (if configured)
- [ ] AI assistant working (if configured)

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your frontend URL is in `CLIENT_URL` environment variable
2. **Database Connection**: Check MongoDB Atlas IP whitelist and connection string
3. **Environment Variables**: Double-check spelling and values in Render dashboard
4. **Build Failures**: Check Node.js version compatibility (requires Node 18+)

### Logs:
- Check Render service logs for server errors
- Check browser console for frontend errors
- Monitor MongoDB Atlas for connection issues

## Security Notes

- ✅ Environment variables are secure (not in code)
- ✅ CORS properly configured
- ✅ MongoDB connection uses SSL
- ✅ JWT secrets are strong
- ✅ Admin credentials are secure

## Scaling Considerations

- Render automatically scales based on traffic
- MongoDB Atlas scales automatically
- Consider upgrading to paid plans for production use
- Monitor usage and costs regularly

Your application is now ready for production deployment! 🎉
