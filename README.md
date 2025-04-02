# YouTube Otomasyon Sistemi

## Genel Bakış

YouTube Otomasyon Sistemi, YouTube kanallarının içerik üretimini, yayınlamasını, analizini ve stratejik yönetimini otomatikleştiren kapsamlı bir platformdur. Bu sistem, hem AI destekli içerik üretimini hem de insan kontrolünü birleştirerek, verimli ve etkili YouTube kanal yönetimi sağlar.

## Özellikler

- AI destekli içerik üretimi
- İçerik havuzu ve insan onay mekanizması
- Otomatik yayınlama ve promosyon
- Kapsamlı performans analizi
- Rakip analizi
- A/B testleri
- Stratejik çıkarımlar ve optimizasyon

## Teknoloji Stack

- **Backend**: Node.js ve Express.js
- **Veritabanı**: PostgreSQL
- **Frontend**: React.js
- **Job Scheduler**: Bull.js (Redis tabanlı)
- **Containerization**: Docker ve Docker Compose
- **CI/CD**: GitHub Actions
- **API Entegrasyonları**: YouTube API, Google Sheets API, OpenAI/Claude API

## Kurulum

### Ön Koşullar

- Docker ve Docker Compose
- Git
- Google Cloud hesabı (Google Sheets ve YouTube API için)
- OpenAI/Claude API erişimi

### Hızlı Başlangıç

1. Projeyi klonlayın:
```bash
git clone https://github.com/jesterx01/youtube-automation-system.git
cd youtube-automation-system
```

2. `.env.example` dosyasını `.env` olarak kopyalayın ve düzenleyin:
```bash
cp .env.example .env
```

3. Docker ile başlatın:
```bash
docker-compose up -d
```

4. Tarayıcınızda aşağıdaki adreslere gidin:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## Proje Yapısı

```
.
├── backend/           # Express API sunucusu
├── worker/            # Arkaplan işlemleri için worker servisi
├── frontend/          # React web uygulaması
├── database/          # Veritabanı migrasyonları ve tohumları
├── docs/              # Dokümantasyon
├── docker-compose.yml # Docker yapılandırması
└── .env.example       # Örnek ortam değişkenleri
```

## Kullanım

Detaylı kullanım talimatları için [kullanım kılavuzunu](./docs/USAGE.md) inceleyebilirsiniz.

## Katkıda Bulunma

Projemize katkıda bulunmak istiyorsanız, lütfen [katkıda bulunma rehberini](./docs/CONTRIBUTING.md) inceleyin.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
