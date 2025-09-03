# 🏠 Web_site — Trust-centric Roommate + Pet Adoption + Furniture (TR)

**Ev arkadaşı bulma, hayvan sahiplendirme ve ikinci el mobilya alım-satımı için mobil-öncelikli, güvenli platform.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone https://github.com/Hasan127-gif/Web_site.git
cd Web_site

# Bağımlılıkları yükleyin
npm i

# Environment variables'ları ayarlayın
cp .env.example .env

# Geliştirme sunucusunu başlatın
npm run dev
```

## ⚙️ Environment Variables

Proje environment variables kullanarak konfigürasyonu yönetir. `.env.example` dosyasını kopyalayıp `.env` olarak adlandırın ve değerleri düzenleyin:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=TrustApp
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ESCROW=true
VITE_ENABLE_VERIFICATION=true

# External Services
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## ✨ Özellikler

### 🏠 **Ev Arkadaşı Sistemi**
- 🔍 Gelişmiş filtreleme (konum, bütçe, yaşam tarzı)
- 👤 Detaylı profiller ve doğrulama rozetleri
- 💬 Güvenli sohbet sistemi
- 📄 Sözleşme oluşturma sihirbazı
- 🗺️ Harita entegrasyonu

### 🐾 **Hayvan Sahiplendirme**
- 🤖 Pet Match AI eşleştirme sistemi
- 🏥 Sağlık durumu ve temperament bilgileri
- 📋 4 adımlı sahiplenme başvuru süreci
- 🏠 Barınak ve bireysel sahip desteği
- ⚡ Hızlı başvuru süreci

### 🛋️ **Mobilya Pazaryeri**
- 💳 Escrow güvenli ödeme sistemi
- 📏 3D boyut gösterimi
- 🚚 Çoklu teslimat seçenekleri
- 📸 AI destekli fotoğraf ipuçları
- 🏷️ Akıllı etiketleme

### 🤖 **AI Özellikleri**
- 🎯 Akıllı eşleştirme algoritması
- ✍️ İçerik optimizasyon önerileri
- 📷 Fotoğraf kalitesi rehberi
- 🏷️ Otomatik etiket önerileri
- 🔄 Gerçek zamanlı öneriler

### 🛡️ **Güvenlik ve Doğrulama**
- 🆔 KVKK uyumlu kimlik doğrulama
- 📱 Telefon ve e-posta doğrulama
- ⭐ Güven puanı sistemi
- 💰 Güvenli ödeme altyapısı
- 🔒 End-to-end şifreleme

## 🛠️ Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Build Tool** | Vite |
| **State Management** | React Hooks |
| **Routing** | React Router DOM |
| **Forms** | React Hook Form + Zod |
| **API Client** | Custom API Client |
| **Environment** | Vite Environment Variables |
| **Design** | Mobile-first, Responsive |

## 📱 Kullanım

### 🏠 Ana Özellikler
1. **Ana Sayfa**: 3 kategori arasında geçiş yapın
2. **Arama ve Filtreleme**: Gelişmiş filtrelerle arama yapın
3. **AI Eşleştirme**: Kişiselleştirilmiş öneriler alın
4. **Güvenli İletişim**: Uygulama içi sohbet kullanın
5. **Doğrulama**: Güven puanınızı artırın

### 📝 İlan Verme Süreci
1. İstediğiniz kategoride **"İlan Ver"** butonuna tıklayın
2. Adım adım formu doldurun
3. AI asistan ile içeriği optimize edin
4. Fotoğrafları yükleyin (AI ipuçları ile)
5. İlanınızı yayınlayın

## 🏗️ Proje Yapısı

```
src/
├── app/
│   ├── App.tsx          # Ana uygulama bileşeni
│   └── routes.tsx       # React Router konfigürasyonu
├── pages/
│   ├── Home.tsx         # Ana sayfa
│   ├── Roommates.tsx    # Ev arkadaşı sayfası
│   ├── Pets.tsx         # Hayvan sahiplendirme sayfası
│   ├── Furniture.tsx    # Mobilya sayfası
│   └── NewListing.tsx   # Yeni ilan sayfası
├── components/
│   ├── Layout.tsx       # Ana layout bileşeni
│   ├── Nav.tsx          # Navigation bileşeni
│   ├── layout/          # Header, Navigation
│   ├── pages/           # Ana sayfalar (Home, Roommate, Pets, Furniture)
│   ├── ui/              # Yeniden kullanılabilir bileşenler
│   ├── modals/          # Modal bileşenleri (Verification, Contract)
│   └── forms/           # Form bileşenleri (ListingForm)
├── config/
│   ├── env.ts           # Environment variables konfigürasyonu
│   └── api.ts           # API client ve endpoints
├── hooks/               # React hooks (useTheme)
├── types/               # TypeScript tipleri
├── locales/             # Çoklu dil desteği (tr.ts)
├── design/              # Tasarım token'ları
└── main.tsx            # Uygulama giriş noktası
```

## 🎨 UI Bileşenleri

| Bileşen | Açıklama |
|---------|----------|
| **Card** | İlan kartları (Roommate, Pet, Furniture) |
| **Button** | Çoklu variant'lı butonlar |
| **Input** | Form girişleri |
| **Modal** | Popup pencereler |
| **Badge** | Durum ve doğrulama rozetleri |
| **FilterPill** | Filtre chip'leri |
| **AIRecommendationCard** | AI öneri kartları |
| **AIAssistantSidebar** | AI asistan paneli |

## 🔧 Geliştirme

### 📋 Komutlar
```bash
npm run dev          # Geliştirme sunucusu (localhost:5173)
npm run build        # Production build
npm run preview      # Build önizlemesi
npm run lint         # ESLint kod kontrolü
```

### 🆕 Yeni Özellik Ekleme
1. `src/components/` altında bileşen oluşturun
2. TypeScript tiplerini `src/types/` ekleyin
3. Türkçe metinleri `src/locales/tr.ts` ekleyin
4. Responsive tasarım uygulayın (mobile-first)
5. AI özelliklerini entegre edin
6. Environment variables'ları `src/config/env.ts` ekleyin

### 🔌 API Entegrasyonu
```typescript
import { apiClient, endpoints } from '../config/api';

// GET request
const response = await apiClient.get(endpoints.listings.list);

// POST request
const newListing = await apiClient.post(endpoints.listings.create, data);

// File upload
const uploadResponse = await apiClient.upload(endpoints.upload.image, file);
```

### 🎛️ Feature Flags
```typescript
import { isFeatureEnabled } from '../config/env';

// Feature flag kontrolü
if (isFeatureEnabled('ai')) {
  // AI özelliklerini göster
}
```

## 🌟 Öne Çıkan Özellikler

- 📱 **Mobil-öncelikli**: Tüm özellikler mobil için optimize
- 🤖 **AI Destekli**: Akıllı eşleştirme ve içerik önerileri
- 🛡️ **Güvenlik Odaklı**: KVKK uyumlu ve güvenli
- 🇹🇷 **Türkçe**: Tam Türkçe yerelleştirme
- 🎨 **Modern UI**: Tailwind CSS ile modern tasarım
- ⚡ **Hızlı**: Vite ile hızlı geliştirme
- 🔧 **Type-safe**: TypeScript ile tip güvenliği
- 🌍 **Environment-aware**: Environment variables ile konfigürasyon
- 🔌 **API-ready**: Hazır API client ve endpoint'ler

## 📊 Proje İstatistikleri

- **Toplam Dosya**: 75+ dosya
- **Bağımlılık**: 290+ paket
- **TypeScript**: %100 tip güvenliği
- **Responsive**: Mobile-first tasarım
- **AI Özellikleri**: 5+ AI entegrasyonu
- **Environment Variables**: 20+ konfigürasyon
- **API Endpoints**: 15+ endpoint tanımı

## 🤝 Katkıda Bulunma

1. 🍴 Fork yapın
2. �� Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. 💾 Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. 📤 Branch'i push edin (`git push origin feature/amazing-feature`)
5. 🔄 Pull Request oluşturun

## 📄 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## 📞 İletişim

- **👨‍💻 Geliştirici**: Hasan Hüseyin Sevgi
- **📧 E-posta**: hasanhuseyinsevgi@example.com
- **🐙 GitHub**: [@Hasan127-gif](https://github.com/Hasan127-gif)
- **🌐 Repository**: [Web_site](https://github.com/Hasan127-gif/Web_site)

## 🙏 Teşekkürler

- [Pexels](https://pexels.com) - Ücretsiz fotoğraflar
- [Lucide](https://lucide.dev) - İkonlar
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [React](https://reactjs.org) - UI library
- [Vite](https://vitejs.dev) - Build tool

---

⭐ **Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

🚀 **Live Demo**: [GitHub Pages](https://hasan127-gif.github.io/Web_site/) (aktifleştirildikten sonra)
