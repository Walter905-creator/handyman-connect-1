# 🔧 Troubleshooting Guide - 500 Errors

## Current Issues and Solutions

### 1. AI Assistant 500 Error
**Problem**: `/api/ai/ask` returning 500 Internal Server Error
**Cause**: Missing or invalid OpenAI API key

**Solution**:
1. Add `OPENAI_API_KEY` to your Render environment variables
2. Get your API key from https://platform.openai.com/api-keys
3. Format: `OPENAI_API_KEY=sk-...your-key-here`

**Test**: Visit `https://your-app.onrender.com/api/ai/health` to check AI status

### 2. Admin Dashboard 500 Error
**Problem**: `/api/admin/pros` returning 500 Internal Server Error
**Cause**: Database connection issues

**Solution**:
1. Verify `MONGO_URI` is set correctly in Render
2. Ensure MongoDB Atlas allows connections from 0.0.0.0/0
3. Check database user has read/write permissions

**Test**: Visit `https://your-app.onrender.com/api/health` to check database status

## Required Environment Variables

Add these to your Render service environment variables:

### Essential (Required for basic functionality):
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/handyman-connect
JWT_SECRET=your-super-secure-jwt-secret-32-characters-minimum
ADMIN_EMAIL=admin@handyman-connect.com
ADMIN_PASSWORD=your-secure-admin-password
CLIENT_URL=https://www.handyman-connect.com
```

### Optional Services (Add only if using these features):
```
# OpenAI (for AI Assistant)
OPENAI_API_KEY=sk-your-openai-api-key

# Twilio (for SMS notifications)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE=+1234567890

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_FIRST_MONTH_PRICE_ID=price_your-first-month-price-id
STRIPE_MONTHLY_PRICE_ID=price_your-monthly-price-id
```

## Testing Endpoints

After adding environment variables and redeploying, test these URLs:

1. **Server Health**: `https://your-app.onrender.com/api`
2. **Database Health**: `https://your-app.onrender.com/api/health`
3. **CORS Test**: `https://your-app.onrender.com/api/cors-test`
4. **AI Status**: `https://your-app.onrender.com/api/ai/health`
5. **Admin Test**: `https://your-app.onrender.com/api/admin/test`

## MongoDB Atlas Setup

1. **Create Cluster** at https://mongodb.com/atlas
2. **Create Database User**:
   - Username: `handyman-user`
   - Password: Generate strong password
   - Permissions: Read and write to any database
3. **Network Access**:
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - Or add Render's IP ranges
4. **Get Connection String**:
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/handyman-connect`

## OpenAI API Setup

1. **Create Account** at https://platform.openai.com
2. **Add Payment Method** (required for API access)
3. **Generate API Key**:
   - Go to API Keys section
   - Create new secret key
   - Copy the key (starts with `sk-`)
4. **Set Usage Limits** to control costs

## Common Issues

### Database Connection Fails
- ✅ Check MONGO_URI format
- ✅ Verify username/password in connection string
- ✅ Ensure IP whitelist includes 0.0.0.0/0
- ✅ Confirm database user has proper permissions

### AI Assistant Not Working
- ✅ Verify OPENAI_API_KEY is set
- ✅ Check OpenAI account has credits/payment method
- ✅ Ensure API key has proper permissions
- ✅ Test with `/api/ai/health` endpoint

### 500 Errors Persist
- ✅ Check Render service logs for detailed errors
- ✅ Restart Render service after adding environment variables
- ✅ Verify all environment variables are spelled correctly
- ✅ Test each endpoint individually

## Service Status Pages

Monitor these services for outages:
- **Render**: https://status.render.com
- **MongoDB Atlas**: https://status.mongodb.com
- **OpenAI**: https://status.openai.com

## Getting Help

If issues persist:
1. Check Render service logs for detailed error messages
2. Test individual API endpoints to isolate the problem
3. Verify all environment variables are set correctly
4. Ensure all external services (MongoDB, OpenAI) are properly configured

## Success Indicators

✅ **All Working**: All endpoints return 200 status
✅ **Database**: Can create/read pros and job requests
✅ **AI**: Can ask questions and get responses
✅ **CORS**: Frontend can communicate with backend
✅ **Admin**: Can login and manage professionals
