# 🚀 Corporate Web Site - GüvenTüp

Modern ve responsive kurumsal web sitesi. Ev tüpü satış firması için tasarlanmış profesyonel web sitesi.

## 📋 Özellikler

- ✅ **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- ✅ **Modern UI/UX** - Tailwind CSS ile modern tasarım
- ✅ **SEO Optimized** - Arama motorları için optimize edilmiş
- ✅ **Fast Loading** - Hızlı yükleme süreleri
- ✅ **Accessibility** - Erişilebilirlik standartlarına uygun
- ✅ **Clean Code** - Temiz ve anlaşılır kod yapısı
- ✅ **Interactive Elements** - Animasyonlar ve etkileşimli öğeler

## 🛠️ Teknolojiler

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript
- **Font Awesome** - İkonlar
- **Google Fonts** - Typography

## 📁 Proje Yapısı

```
corporate-web-site/
├── index.html          # Ana HTML dosyası
├── css/
│   └── style.css       # Custom CSS stilleri
├── js/
│   └── main.js         # JavaScript fonksiyonları
├── images/             # Görseller (gelecekte eklenecek)
├── components/         # Bileşenler (gelecekte eklenecek)
├── pages/              # Sayfalar (gelecekte eklenecek)
└── README.md           # Bu dosya
```

## 🚀 Kurulum ve Kullanım

### 1. Projeyi İndirin
```bash
git clone [repository-url]
cd corporate-web-site
```

### 2. Dosyaları Açın
- `index.html` dosyasını web tarayıcınızda açın
- Veya local server kullanın

### 3. Local Server (Önerilen)
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve .

# PHP ile
php -S localhost:8000
```

## 🎨 Özelleştirme

### Renkler
Ana renk paleti `css/style.css` dosyasında tanımlanmıştır:
- **Primary Blue**: `#3b82f6`
- **Secondary Yellow**: `#f59e0b`
- **Success Green**: `#10b981`

### İçerik Değişiklikleri
1. **Firma Bilgileri**: `index.html` dosyasında arama yaparak değiştirin
2. **Telefon Numarası**: `0555 123 45 67` yerine gerçek numaranızı yazın
3. **E-posta**: `info@guventup.com` yerine gerçek e-posta adresinizi yazın
4. **Adres**: Firma adresinizi güncelleyin

### Logo ve Marka
- Logo ikonunu değiştirmek için `fas fa-fire` sınıfını değiştirin
- Firma adını "GüvenTüp" yerine kendi markanızla değiştirin

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 JavaScript Özellikleri

- **Mobile Menu Toggle** - Mobil menü açma/kapama
- **Smooth Scrolling** - Yumuşak sayfa geçişleri
- **Back to Top** - Yukarı çıkma butonu
- **Form Handling** - İletişim formu işleme
- **Animations** - Scroll-based animasyonlar
- **Counter Animation** - İstatistik sayaçları
- **Notification System** - Bildirim sistemi

## 📊 SEO Optimizasyonu

- ✅ Semantic HTML5 yapısı
- ✅ Meta tags (description, keywords)
- ✅ Open Graph tags (sosyal medya)
- ✅ Alt text'ler (görseller için)
- ✅ Structured data (gelecekte eklenecek)
- ✅ Sitemap (gelecekte eklenecek)

## 🚀 Performans

- ✅ Minified CSS/JS (production için)
- ✅ Optimized images (gelecekte)
- ✅ Lazy loading (JavaScript ile)
- ✅ CDN kullanımı (Tailwind, Font Awesome)
- ✅ Efficient animations

## 🔒 Güvenlik

- ✅ XSS koruması
- ✅ Form validation
- ✅ Secure external links
- ✅ HTTPS ready

## 📈 Analytics ve Tracking

JavaScript dosyasında telefon numarası tıklamalarını takip edebilirsiniz:
```javascript
// Phone number click tracking
phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Google Analytics veya başka tracking kodu ekleyin
        console.log('Phone number clicked:', this.getAttribute('href'));
    });
});
```

## 🎯 Gelecek Geliştirmeler

- [ ] Blog sayfası
- [ ] Ürün kataloğu
- [ ] Online sipariş sistemi
- [ ] Müşteri yorumları
- [ ] SSL sertifikası
- [ ] Google Analytics entegrasyonu
- [ ] Contact form backend
- [ ] Newsletter signup
- [ ] Social media integration
- [ ] PWA (Progressive Web App)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **E-posta**: info@guventup.com
- **Telefon**: 0555 123 45 67
- **Website**: [guventup.com](https://guventup.com)

## 🙏 Teşekkürler

- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Font Awesome](https://fontawesome.com/) - İkonlar
- [Google Fonts](https://fonts.google.com/) - Typography

---

**Not**: Bu proje demo amaçlı oluşturulmuştur. Gerçek kullanım için firma bilgilerini güncellemeyi unutmayın. 