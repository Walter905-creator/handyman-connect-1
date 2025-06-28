# Frontend Static Site Configuration for Render

## Use this when creating a NEW Static Site in Render Dashboard:

**Service Type**: Static Site
**Name**: handyman-connect-frontend
**Repository**: handyman-connect-1

### Build Settings:
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

### Environment Variables:
- **REACT_APP_API_URL**: `https://handyman-connect-backend.onrender.com`

### After Creating Both Services:
1. Update the backend CLIENT_URL to match your actual frontend URL
2. Update the frontend REACT_APP_API_URL to match your actual backend URL
