# Mobile packaging — modern-e-commerce-storefront-2

This project ships a Capacitor starter configuration (`capacitor.config.ts`),
so you can package the same web build for the App Store and Google Play.

## 1. Install Capacitor

```
npm install @capacitor/core
npm install -D @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

## 2. Build the web app

```
npm run build
```

## 3. Add the native platforms

```
npx cap add ios
npx cap add android
```

## 4. Sync and open

```
npx cap sync
npx cap open ios      # requires Xcode (macOS)
npx cap open android  # requires Android Studio
```

Change `appId` / `appName` in `capacitor.config.ts` before submitting to the stores.
