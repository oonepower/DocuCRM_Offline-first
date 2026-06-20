# DocuCRM Offline - APK Export Guide

Everything is now set up to automatically build your APK! Here's what was done:

## ✅ What Was Created

### 1. **PWA Configuration Files**
- `capacitor.config.json` - Configures your app for Android
- `www/manifest.json` - PWA manifest with app metadata
- `www/index.html` - Main app interface
- `www/css/styles.css` - Responsive design
- `www/js/app.js` - Core app logic
- `www/sw.js` - Service Worker (offline support)
- `package.json` - Dependencies

### 2. **GitHub Actions Automation**
- `.github/workflows/build-apk.yml` - Automatic APK builder

## 📱 How to Get Your APK

### **Option 1: Automatic Build (Every Push to Main)**

1. Push any changes to the `main` branch
2. Go to your repository on GitHub
3. Click **Actions** tab
4. Wait for the **"Build Android APK"** workflow to complete (usually 10-15 minutes)
5. Click on the completed workflow
6. Scroll down to **Artifacts**
7. Download **docucrm-apk** file

### **Option 2: Manual Trigger**

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **"Build Android APK"** workflow
4. Click **"Run workflow"** button
5. Select **main** branch
6. Click **"Run workflow"**
7. Wait for completion and download

## 📲 How to Install the APK on Android

1. **Download the APK** from GitHub Actions artifacts

2. **Enable Installation from Unknown Sources:**
   - Go to Settings → Security
   - Enable "Unknown Sources" or "Install unknown apps"
   - (Location varies by Android version)

3. **Transfer to Phone:**
   - Use USB cable or
   - Download directly to your Android device

4. **Install the APK:**
   - Open file manager
   - Find the APK file (e.g., `app-release.apk`)
   - Tap to open
   - Click **Install**

5. **Grant Permissions:**
   - Review requested permissions
   - Click **Install** to confirm

6. **Launch the App:**
   - The app will appear in your app drawer
   - Tap to open and start using!

## 🔄 Automatic Updates

Every time you:
- Push code to `main` branch
- Update files in the `www/` folder
- Update `package.json`

A new APK will be **automatically built** and available for download from GitHub Actions!

## 🛠️ Customization

### Add Your Existing App Files

Replace the placeholder files in the `www/` folder with your actual app:

```
www/
├── index.html          (Your main HTML)
├── css/
│   └── styles.css      (Your CSS files)
├── js/
│   └── app.js          (Your JavaScript files)
├── assets/             (Images, icons, etc.)
├── manifest.json       (Already configured)
└── sw.js               (Service Worker - optional to modify)
```

### Update App Name & Package

Edit `capacitor.config.json`:
```json
{
  "appId": "com.docucrm.offline",
  "appName": "DocuCRM Offline",
  ...
}
```

## 📋 Troubleshooting

### Build Failed?
- Check the **Actions** tab for error logs
- Ensure all files are properly added to `www/` folder
- Make sure `package.json` is valid

### APK Won't Install?
- Check if "Unknown Sources" is enabled
- Ensure Android version 5.0+ (API 21+)
- Check device storage space

### App Crashes on Launch?
- Check browser console (in developer tools)
- Ensure all JS files have no syntax errors
- Check Service Worker logs

## 🚀 Next Steps

1. ✅ Add your app files to `www/` folder
2. ✅ Push to `main` branch
3. ✅ Wait for build completion
4. ✅ Download APK from Actions
5. ✅ Install on Android device

## 📞 Support

If you need help:
1. Check GitHub Actions logs for specific errors
2. Verify all files are in the correct location
3. Ensure JavaScript has no console errors
4. Test app in browser first

---

**Your app is now ready to be exported as an APK!** 🎉

Every push to the main branch will automatically generate a new APK for installation.
