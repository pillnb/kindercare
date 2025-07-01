# KinderCare PWA Setup

## 📱 Progressive Web App (PWA) Features

KinderCare sekarang mendukung PWA dengan fitur-fitur berikut:

### ✨ Fitur PWA
- **Installable**: Dapat diinstall di mobile/desktop seperti aplikasi native
- **Offline Support**: Tetap bisa diakses meski tidak ada internet
- **Fast Loading**: Caching otomatis untuk performa optimal
- **Responsive**: Tampilan mobile-first yang optimal
- **Push Notifications**: (Siap untuk implementasi masa depan)

### 🛠️ Teknologi yang Digunakan
- **next-pwa**: Plugin Next.js untuk PWA
- **Service Worker**: Untuk offline caching dan background sync
- **Web App Manifest**: Konfigurasi PWA
- **Workbox**: Runtime caching strategies

### 📋 Cara Install di Mobile

#### Android (Chrome/Edge):
1. Buka website di Chrome/Edge
2. Tap menu "⋮" di pojok kanan atas
3. Pilih "Add to Home screen" atau "Install app"
4. Konfirmasi install
5. Aplikasi akan muncul di home screen

#### iOS (Safari):
1. Buka website di Safari
2. Tap tombol Share (kotak dengan panah ke atas)
3. Scroll dan pilih "Add to Home Screen"
4. Edit nama jika perlu, lalu tap "Add"
5. Aplikasi akan muncul di home screen

#### Desktop (Chrome/Edge):
1. Buka website di browser
2. Lihat icon install di address bar atau banner popup
3. Klik "Install" atau "Add to Chrome"
4. Aplikasi akan terinstall dan bisa diakses dari Start Menu/Applications

### 🔧 Development Setup

```bash
# Install dependencies
npm install

# Start development server (PWA disabled in dev mode)
npm run dev

# Build for production (PWA enabled)
npm run build

# Start production server
npm start
```

### 📁 File PWA yang Dibuat

- `public/manifest.json` - Web App Manifest
- `public/sw.js` - Service Worker custom
- `public/icon/icon-*.png` - PWA icons berbagai ukuran
- `src/components/PWAStatus.tsx` - Status dan install prompt
- `src/components/OfflineIndicator.tsx` - Indikator offline
- `src/app/offline/page.tsx` - Halaman offline

### ⚙️ Konfigurasi

#### next.config.ts
```typescript
import withPWA from "next-pwa";

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  sw: "sw.js",
  runtimeCaching: [
    // Caching strategies untuk berbagai tipe konten
  ],
})(nextConfig);
```

#### manifest.json
- Name: KinderCare - Edukasi Perlindungan Anak
- Theme Color: #ec4899 (Pink)
- Display: standalone
- Shortcuts: Materi, Tips, Webinar

### 🎯 Fitur Offline

- **Static Assets**: HTML, CSS, JS di-cache otomatis
- **Images**: Gambar di-cache dengan strategy StaleWhileRevalidate
- **API Calls**: Network-first dengan fallback ke cache
- **Offline Page**: Halaman khusus saat koneksi terputus

### 📊 Caching Strategies

1. **CacheFirst**: Google Fonts (cache 1 tahun)
2. **StaleWhileRevalidate**: Gambar, CSS, JS (cache 30 hari)
3. **NetworkFirst**: API calls (cache 1 hari, timeout 10s)

### 🔍 Testing PWA

1. **Lighthouse**: Test PWA score di Chrome DevTools
2. **Application Tab**: Lihat service worker, manifest, storage
3. **Network Tab**: Test offline mode
4. **Mobile Emulation**: Test responsive design

### 📱 Mobile Testing

```bash
# Akses dari mobile di jaringan yang sama
npm run dev
# Lalu akses http://[your-ip]:3000 dari mobile
```

### 🚀 Production Deployment

```bash
# Build optimized version
npm run build

# Deploy ke hosting (Vercel, Netlify, etc.)
# PWA akan otomatis aktif di production
```

### 🛡️ Security

- HTTPS required untuk PWA features
- Service Worker scope limited to origin
- Secure contexts only untuk install prompts

### 📈 Performance

- **First Load**: ~500KB (dengan caching)
- **Subsequent Loads**: ~50KB (dari cache)
- **Offline**: Instant loading dari cache

### 🐛 Troubleshooting

#### PWA tidak muncul install prompt:
- Pastikan HTTPS aktif
- Cek manifest.json valid
- Cek service worker registered
- Cek requirements PWA di Lighthouse

#### Service Worker tidak update:
- Hard refresh (Ctrl+F5)
- Clear cache di DevTools
- Check "Update on reload" di Application tab

#### Offline tidak bekerja:
- Cek service worker active
- Cek network cache di DevTools
- Test dengan throttling network

### 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [next-pwa GitHub](https://github.com/shadowwalker/next-pwa)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## 🎉 Ready to Use!

KinderCare PWA sudah siap digunakan! Users bisa:
- Install seperti aplikasi native
- Akses offline untuk konten yang sudah di-cache
- Nikmati performa loading yang cepat
- Dapat notifikasi (fitur masa depan)

Selamat menggunakan! 🚀
