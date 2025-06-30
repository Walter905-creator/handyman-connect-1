# 🎯 VERCEL PROJECT CONFIGURATION GUIDE

## 🚨 CORRECT VERCEL PROJECT SETUP

**Your Live Project**: `handyman-connect-1` (walters-projects-b292b340)
**URL**: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/build-and-deployment

---

## ✅ REQUIRED VERCEL SETTINGS

### 1. **Build & Output Settings**
Go to: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/build-and-deployment

**Build Command**:
```bash
cd client && npm install && npm run build
```

**Output Directory**:
```
client/build
```

**Install Command**:
```bash
cd client && npm install
```

**Root Directory**: `.` (leave empty/default)

### 2. **Environment Variables** (if any)
Go to: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/environment-variables

**Add if needed**:
- `REACT_APP_API_URL` = `https://handyman-connect-backend.onrender.com`

### 3. **Domains**
Go to: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/domains

**Should have**:
- ✅ `www.handyman-connect.com` (primary)
- ✅ `handyman-connect.com` (redirect to www)

---

## 🔧 VERCEL.JSON CONFIGURATION

**Root vercel.json** (already correct):
```json
{
  "version": 2,
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/build",
  "installCommand": "cd client && npm install",
  "framework": null,
  "functions": {},
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://handyman-connect-backend.onrender.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Client vercel.json** (just updated):
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://handyman-connect-backend.onrender.com/api/$1"
    }
  ]
}
```

---

## 🎯 STEPS TO VERIFY/FIX

### Step 1: Check Current Deployment
1. Go to: https://vercel.com/walters-projects-b292b340/handyman-connect-1
2. Check **Latest Deployment** status
3. If it's not "Ready", click **Redeploy**

### Step 2: Verify Build Settings
1. Go to: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/build-and-deployment
2. Ensure settings match the above configuration
3. If wrong, update and **Save**

### Step 3: Trigger Fresh Deploy
1. Go to: https://vercel.com/walters-projects-b292b340/handyman-connect-1
2. Click **Deployments** tab
3. Click **Redeploy** on latest deployment
4. Select **Use existing Build Cache** (unless you want to clear cache)
5. Wait for deployment to complete

### Step 4: Test the Live Site
1. Visit: https://www.handyman-connect.com
2. Check: https://www.handyman-connect.com/api (should proxy to backend)
3. Test: https://www.handyman-connect.com/subscribe (Stripe checkout)

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: "Build Failed"
**Problem**: Build command or output directory is wrong
**Fix**: Update build settings to match the configuration above

### Issue 2: "API calls fail with 404"
**Problem**: `vercel.json` rewrites are not working
**Fix**: Ensure both vercel.json files point to `handyman-connect-backend.onrender.com`

### Issue 3: "Old backend URL still being called"
**Problem**: Frontend build is cached with old URL
**Fix**: 
1. Clear Vercel build cache
2. Redeploy
3. Hard refresh browser (Ctrl+Shift+R)

### Issue 4: "Domain not connected"
**Problem**: `www.handyman-connect.com` is not pointing to this project
**Fix**: 
1. Go to Domains settings
2. Add `www.handyman-connect.com` if missing
3. Verify DNS settings

---

## 🎉 SUCCESS CHECKLIST

After fixing the settings and redeploying:

- ✅ **Build succeeds**: No errors in deployment logs
- ✅ **Frontend loads**: https://www.handyman-connect.com works
- ✅ **API proxy works**: https://www.handyman-connect.com/api returns backend response
- ✅ **Stripe works**: Subscribe button redirects to Stripe checkout
- ✅ **No CORS errors**: Console shows no CORS-related errors
- ✅ **Correct backend**: Console shows `🔗 Using API URL: https://handyman-connect-backend.onrender.com`

---

## 🔗 QUICK LINKS

- **Vercel Project**: https://vercel.com/walters-projects-b292b340/handyman-connect-1
- **Build Settings**: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/build-and-deployment
- **Domains**: https://vercel.com/walters-projects-b292b340/handyman-connect-1/settings/domains
- **Deployments**: https://vercel.com/walters-projects-b292b340/handyman-connect-1
- **Live Site**: https://www.handyman-connect.com

---

**Status**: ✅ Configurations updated and ready for deployment
**Next**: Go to Vercel dashboard and redeploy the project
