mdyNes-library-management/
│
├── app/                          
│   ├── api/                      # API rotaları
│   │   ├── books/                # Kitap API'leri
│   │   │   ├── [id]/            # Belirli bir kitap için API rotaları (GET, PUT, DELETE)
│   │   │   │   └── route.js
│   │   │   └── route.js         # Tüm kitaplar için API rotaları (GET, POST)
│   │   └── ...                   # Diğer API rotaları
│   │
│   ├── books/                    # Kitap sayfaları
│   │   ├── [id]/                 # Kitap detay sayfası
│   │   │   └── page.jsx
│   │   ├── edit/                 # Kitap düzenleme sayfaları
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   └── page.jsx              # Tüm kitaplar sayfası
│   │
│   ├── globals.css               # Global CSS stilleri
│   ├── layout.jsx                # Ana uygulama layout'u
│   └── page.jsx                  # Ana sayfa
│
├── components/                   # React bileşenleri
│   ├── book-detail/              # Kitap detay bileşenleri
│   │   ├── book-detail-header.jsx
│   │   ├── book-detail-image.jsx
│   │   ├── book-detail-info.jsx
│   │   └── related-books.jsx
│   │
│   ├── ui/                       # UI bileşenleri (shadcn/ui)
│   │   ├── alert-dialog.jsx
│   │   ├── button.jsx
│   │   ├── separator.jsx
│   │   └── ...
│   │
│   ├── book-actions.jsx          # Kitap işlemleri bileşeni
│   ├── book-form.jsx             # Kitap ekleme/düzenleme formu
│   ├── book-grid.jsx             # Kitap grid görünümü
│   ├── book-list.jsx             # Kitap liste görünümü
│   ├── header.jsx                # Sayfa başlığı
│   └── ...
│
├── prisma/                       # Prisma ORM yapılandırması
│   ├── schema.prisma             # Veritabanı şeması
│   └── ...
│
├── public/                       
│   ├── images/                 
│   └── ...
│
├── services/                     # Servis katmanı
│   ├── fetchAPI.js               # API istekleri için yardımcı fonksiyonlar
│   └── serviceOperations/        # Veritabanı işlemleri
│       └── index.js              # CRUD operasyonları
│
├── utils/                        # Yardımcı fonksiyonlar ve araçlar
│   ├── store.js                  # Zustand durum yönetimi
│   └── ...
│
├── .env                         
├── .gitignore                    
├── next.config.js               
├── package.json                  
├── tailwind.config.js            
└── README.md        






## Mimari Açıklaması

### 1. Frontend Mimarisi

- **App Router**: Next.js 13+ App Router kullanılarak sayfa yönlendirmeleri yapılmaktadır.
- **Bileşen Yapısı**: Modüler ve yeniden kullanılabilir bileşenler `components/` dizininde organize edilmiştir.
- **UI Kütüphanesi**: shadcn/ui bileşenleri kullanılarak tutarlı bir kullanıcı arayüzü sağlanmıştır.
- **Stil**: Tailwind CSS kullanılarak responsive ve modern bir tasarım uygulanmıştır.


### 2. Backend Mimarisi

- **API Rotaları**: Next.js API rotaları (`app/api/`) ile RESTful API sağlanmıştır.
- **Veritabanı**: MongoDB veritabanı Prisma ORM aracılığıyla kullanılmaktadır.
- **Servis Katmanı**: Veritabanı işlemleri `services/` dizininde soyutlanmıştır.


### 3. Veri Akışı

1. Kullanıcı arayüzünden gelen istekler `fetchAPI.js` yardımcı fonksiyonları aracılığıyla API rotalarına iletilir.
2. API rotaları (`app/api/`) istekleri alır ve servis katmanına yönlendirir.
3. Servis katmanı (`services/serviceOperations/`) Prisma ORM kullanarak veritabanı işlemlerini gerçekleştirir.
4. Sonuçlar API rotaları üzerinden kullanıcı arayüzüne geri döner.


### 4. Önemli Özellikler

- **Kitap Yönetimi**: Kitapların listelenmesi, detaylarının görüntülenmesi, eklenmesi, düzenlenmesi ve silinmesi.
- **İlişkili Kitaplar**: Aynı kategorideki diğer kitapların gösterilmesi.
- **Duyarlı Tasarım**: Mobil ve masaüstü cihazlarda optimum kullanıcı deneyimi.
- **Durum Yönetimi**: Zustand kullanılarak client-side durum yönetimi.


## Teknoloji Yığını

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Veritabanı**: MongoDB
- **ORM**: Prisma
- **Durum Yönetimi**: Zustand
- **Deployment**: Vercel
