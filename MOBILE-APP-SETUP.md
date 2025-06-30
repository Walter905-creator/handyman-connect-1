# 📱 MOBILE APP DEVELOPMENT SETUP

## 🎯 **PROJECT: Fixlo Mobile App (iOS & Android)**

**Goal**: Build a mobile app with React Native/Expo
**Platform**: iOS and Android  
**Framework**: Expo (React Native)
**UI**: High-end 4K design

---

## ✅ **STEP-BY-STEP SETUP GUIDE**

### Step 1: Check Node.js and npm ✅
First, let's verify Node.js is installed:

```bash
node -v
npm -v
```

If not installed, download from: https://nodejs.org/en/download (LTS version)

### Step 2: Install Expo CLI ✅
```bash
npm install -g expo-cli
```

### Step 3: Create New Expo Project ✅
```bash
expo init fixlo-app
```

**Project Template Options:**
- ✅ **Recommended**: `Blank (TypeScript)` - for better code quality
- ⚡ **Alternative**: `Blank (JavaScript)` - simpler if you prefer JS

**Project Name**: `Fixlo`

### Step 4: Navigate to Project ✅
```bash
cd fixlo-app
```

### Step 5: Start Development Server ✅
```bash
expo start
```

This opens:
- QR code in terminal
- Web interface in browser
- Development server

### Step 6: Test on Your Phone ✅

**Download Expo Go:**
- **iOS**: App Store → "Expo Go"
- **Android**: Google Play → "Expo Go"

**View Your App:**
1. Open Expo Go on phone
2. Scan QR code from terminal/browser
3. Your app appears on phone! 🎉

### Step 7: Git Setup (Recommended) ✅
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/fixlo-app.git
git add .
git commit -m "Initial Fixlo app setup"
git push -u origin main
```

---

## 🚀 **NEXT PHASE: UI DEVELOPMENT**

Once you confirm "I have Fixlo running", we'll build:

### Landing Screen Features:
- 🏠 **Homeowner Button** - Beautiful 4K design
- 🔧 **Pros Button** - Professional styling
- 🎨 **High-end UI** - Modern, clean interface
- 📱 **Responsive** - Works on all screen sizes

### Tech Stack:
- **Framework**: Expo + React Native
- **Styling**: Styled Components / NativeWind
- **Navigation**: React Navigation
- **State**: Context API / Redux
- **Backend**: Can connect to your existing Render backend

---

## 🛠️ **TROUBLESHOOTING**

### If npm/node not found:
1. Restart terminal after installing Node.js
2. Check PATH environment variable
3. Reinstall Node.js if needed

### If Expo CLI install fails:
```bash
npm install -g @expo/cli
```
(New Expo CLI command)

### If QR code doesn't work:
- Try connecting to same WiFi network
- Use tunnel mode: `expo start --tunnel`
- Use local network: `expo start --lan`

---

**Ready to start? Let me know when you need help with any step!** 🚀
