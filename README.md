### MDyNes Kütüphane Yönetim Sistemi

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir kütüphane yönetim sistemidir.


# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

## Yardımcı Fonksiyonlar

### Base URL Belirleme

Proje, farklı ortamlarda (geliştirme, production) doğru API endpoint'lerini kullanabilmek için bir `getBaseUrl()` yardımcı fonksiyonu içerir:

```javascript
// utils/baseUrl.js

/**
 * Uygulama ortamına göre temel URL'yi belirleyen yardımcı fonksiyon
 * @returns {string} Temel URL
 */
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Tarayıcı ortamı
    return window.location.origin;
  }

  // Sunucu ortamı
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  // Yerel geliştirme
  return "http://localhost:3000";
}

export default getBaseUrl;




## Proje Yapısı


📦 LIBRARY-APP  
│── 📂 .next                 # Next.js tarafından oluşturulan derleme dosyaları  
│── 📂 node_modules          # Proje bağımlılıkları  
│── 📂 prisma                # Prisma ORM yapılandırmaları  
│   ├── 📄 schema.prisma     # Prisma şema dosyası  
│── 📂 public                # Genel statik dosyalar (görseller vb.)  
│── 📂 services              # API servisleri ve iş mantığı  
│   ├── 📂 fetchAPI  
│   │   ├── 📄 index.js      # API veri çekme işlemleri  
│   ├── 📂 serviceOperations  
│   │   ├── 📄 index.jsx     # İş mantığı işlemleri  
│── 📂 src                   # Ana kaynak kodları  
│   ├── 📂 app               # Sayfa bileşenleri  
│   │   ├── 📂 add-book  
│   │   │   ├── 📄 page.js   # Yeni kitap ekleme sayfası  
│   │   ├── 📂 api/books     # API için rota tanımlamaları  
│   │   │   ├── 📂 [id]  
│   │   │   │   ├── 📄 route.js  # Kitap ID’ye göre API işlemleri  
│   │   │   ├── 📂 edit-book/[id]  
│   │   │   │   ├── 📄 page.js  # Kitap düzenleme sayfası  
│   │   │   ├── 📄 route.js     # API route dosyası  
│   │   ├── 📂 books/[id]  
│   │   │   ├── 📄 page.js      # Kitap detay sayfası  
│   │   ├── 📄 favicon.ico      # Favicon dosyası  
│   │   ├── 📄 globals.css      # Genel CSS stilleri  
│   │   ├── 📄 layout.js        # Genel sayfa düzeni  
│   │   ├── 📄 page.js          # Ana giriş sayfası  
│   ├── 📂 components           # Bileşenler  
│   │   ├── 📂 book-detail  
│   │   │   ├── 📄 book-detail-header.jsx  # Kitap detay başlık bileşeni  
│   │   │   ├── 📄 book-detail-image.jsx   # Kitap detay resim bileşeni  
│   │   │   ├── 📄 book-detail-info.jsx    # Kitap detay bilgi bileşeni  
│   │   │   ├── 📄 related-books.jsx       # Benzer kitaplar bileşeni  
│   │   ├── 📂 ui  
│   │   │   ├── 📄 add-book-button.jsx  # Kitap ekleme butonu  
│   │   │   ├── 📄 book-actions.jsx     # Kitap işlemleri butonları  
│   │   │   ├── 📄 book-card.jsx        # Kitap kartı bileşeni  
│   │   │   ├── 📄 book-form.jsx        # Kitap form bileşeni  
│   │   │   ├── 📄 book-list.jsx        # Kitap listesi bileşeni  
│   │   │   ├── 📄 footer.jsx           # Sayfa alt bilgisi  
│   │   │   ├── 📄 header.jsx           # Sayfa başlık bilgisi  
│   │   │   ├── 📄 loading.jsx          # Yükleme ekranı  
│   │   │   ├── 📄 theme-provider.jsx   # Tema sağlayıcı bileşeni  
│   ├── 📂 lib                    # Yardımcı kütüphaneler  
│   │   ├── 📂 prisma  
│   │   ├── 📄 utils.js            # Yardımcı fonksiyonlar  
│── 📂 utils                       
│── 📄 .env                         
│── 📄 .gitignore                   
│── 📄 components.json               
│── 📄 eslint.config.mjs            
│── 📄 jsconfig.json                  
│── 📄 next.config.mjs               
│── 📄 package-lock.json             
│── 📄 package.json                  
│── 📄 postcss.config.mjs            
│── 📄 Readme.md 
│── 📄 tailwind.config.js
```


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
