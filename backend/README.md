# Backend API

YouTube Otomasyon Sistemi için backend API.

## Teknolojiler

- Node.js
- Express.js
- PostgreSQL (Sequelize ORM)
- Bull.js (Redis tabanlı iş kuyruğu)
- JWT Kimlik Doğrulama

## Dizin Yapısı

```
.
├── config/             # Yapılandırma dosyaları
├── controllers/        # API kontrolcüleri
├── middlewares/        # Express middleware'leri
├── models/             # Veritabanı modelleri
├── routes/             # API rotaları
├── services/           # İş mantığı servisleri
├── utils/              # Yardımcı fonksiyonlar
├── validations/        # Giriş doğrulama şemaları
├── app.js              # Express uygulaması
├── server.js           # HTTP sunucusu
└── package.json        # Paket yapılandırması
```

## Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme modunda başlat
npm run dev

# Testleri çalıştır
npm test
```
