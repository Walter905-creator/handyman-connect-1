# Fixlo DNS Configuration Guide

## Overview
This guide shows you how to set up professional DNS for your Fixlo app with separate domains for frontend and API.

## Recommended Architecture

### Option 1: API Subdomain (Recommended)
```
fixloapp.com          → Vercel static site (frontend)
www.fixloapp.com      → Redirects to fixloapp.com
api.fixloapp.com      → Render backend (API)
```

### Option 2: Root Domain Backend (Alternative)
```
fixloapp.com          → Render backend (serves both frontend + API)
www.fixloapp.com      → Redirects to fixloapp.com
```

## DNS Records Setup

### For Option 1 (Recommended):

1. **Frontend (Vercel)**:
   - `fixloapp.com` → A record to Vercel's IP or CNAME to `cname.vercel-dns.com`
   - `www.fixloapp.com` → CNAME to `fixloapp.com`

2. **Backend (Render)**:
   - `api.fixloapp.com` → CNAME to `fixlo-backend.onrender.com`

### For Option 2 (Alternative):

1. **Backend serves everything (Render)**:
   - `fixloapp.com` → A record to `216.24.57.1` or ANAME/ALIAS to `fixlo-backend.onrender.com`
   - `www.fixloapp.com` → CNAME to `fixlo-backend.onrender.com`

## Steps to Configure

### Step 1: Deploy New Fixlo Backend
1. Run: `./deploy-fixlo-backend.sh`
2. Follow the manual steps to create the new Render service
3. Verify it's working at: `https://fixlo-backend.onrender.com/api`

### Step 2: Update Your DNS Provider
Go to your domain registrar (GoDaddy, Namecheap, etc.) and add these records:

**For Option 1 (API Subdomain)**:
```
Type    Name    Value
A       @       76.76.19.123 (Vercel IP - check current)
CNAME   www     fixloapp.com
CNAME   api     fixlo-backend.onrender.com
```

**For Option 2 (Root Domain Backend)**:
```
Type    Name    Value
A       @       216.24.57.1 (Render IP)
CNAME   www     fixlo-backend.onrender.com
```

### Step 3: Update Configurations

**If using Option 1 (API Subdomain)**:
- Update `vercel.json` API routes to point to `https://api.fixloapp.com`
- Or keep current setup with proxy through Vercel

**If using Option 2 (Root Domain Backend)**:
- Keep current configuration
- Backend serves static files from `docs/` folder

## Current Status

✅ **Backend Code**: Updated with Fixlo branding and CORS
✅ **Vercel Config**: Points to `fixlo-backend.onrender.com`
✅ **Mobile App**: Configured for `fixlo-backend.onrender.com`
✅ **Static Site**: Ready in `docs/` folder with Fixlo branding

## Next Steps

1. ⏳ **Deploy new Fixlo backend** using the deployment script
2. ⏳ **Update DNS records** as shown above
3. ⏳ **Test everything** works with the new domains
4. ✅ **Launch professional Fixlo app** with proper branding!

## Verification Commands

```bash
# Test backend directly
curl https://fixlo-backend.onrender.com/api

# Test frontend
curl https://fixloapp.com

# Test API through frontend (Option 1)
curl https://api.fixloapp.com/api

# Test API through frontend (Option 2)
curl https://fixloapp.com/api
```

All configurations in this repository are already updated for the new `fixlo-backend.onrender.com` URL!
