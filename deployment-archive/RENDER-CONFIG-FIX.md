# 🎯 RENDER SERVICE CONFIGURATION - EXACT SETTINGS

## 🚨 BUILD ERROR FIX

**Error**: `cd: client: No such file or directory`
**Cause**: Build commands reference `client` folder that doesn't exist in `server` directory

---

## ✅ CORRECT RENDER SETTINGS

### Service Configuration:
```
Service Type: Web Service
Environment: Node
Plan: Free
```

### Build & Deploy:
```
Root Directory: server
Build Command: npm install
Start Command: node index.js
```

### Environment Variables:
```
NODE_ENV=production
PORT=10000
STRIPE_SECRET_KEY=[your key]
STRIPE_PRICE_ID=price_1Rf0cZPQ4Cetf7g6ekd8hPLb
MONGO_URI=[your MongoDB connection]
JWT_SECRET=[random string]
```

---

## ❌ COMMON MISTAKES TO AVOID

### Wrong Build Commands:
- ❌ `npm install && cd client && npm install && npm run build && cd ../server && npm install`
- ❌ `cd server && npm install`
- ❌ Any command with `cd client`

### Wrong Start Commands:
- ❌ `cd server && node index.js`
- ❌ `npm start && cd server`

### Wrong Root Directory:
- ❌ Empty (repository root)
- ❌ `client`
- ❌ `.`

---

## 🎯 WHY THESE SETTINGS WORK

**Root Directory = `server`**:
- Render starts build process INSIDE the `/server` folder
- All commands run from server directory context
- No need to `cd` anywhere - you're already in the right place

**Build Command = `npm install`**:
- Installs dependencies from `/server/package.json`
- No frontend build needed (Vercel handles that)
- Simple and focused on backend only

**Start Command = `node index.js`**:
- Runs the Express server directly
- Server code is in the server directory
- No path changes needed

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Service Type = Web Service
- [ ] Root Directory = `server`
- [ ] Build Command = `npm install` (no cd commands)
- [ ] Start Command = `node index.js` (no cd commands)
- [ ] Environment variables set
- [ ] Manual Deploy with clear cache
- [ ] Check logs for "Server running on port 10000"

---

## 🔍 VERIFICATION

After correct deployment:
- ✅ https://handyman-connect-1-ftz8.onrender.com/api → Returns JSON
- ✅ https://www.handyman-connect.com/api → Works via Vercel proxy
- ✅ Subscribe button redirects to Stripe checkout
