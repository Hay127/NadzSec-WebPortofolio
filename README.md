# Portofolio Cyber Security Specialist

Portofolio website modern untuk Bug Hunter dan Cyber Security Specialist dengan animasi scroll yang diperbaiki.

## Perbaikan yang Dilakukan

1. **Animasi Scroll untuk Section Expertise**:
   - Cards sekarang muncul dengan animasi saat di-scroll
   - Efek fade-in dan slide-up yang smooth
   - Staggered animation untuk setiap card

2. **Animasi untuk Semua Section**:
   - Timeline items
   - Achievement cards
   - Report cards
   - Contact cards
   - Tools section

3. **Optimasi Performance**:
   - Intersection Observer untuk trigger animasi
   - Animation stop setelah triggered
   - Staggered delays untuk efek bertahap

## Cara Menggunakan

1. Download semua file ke folder `cyber-portfolio`
2. Siapkan gambar di folder `images/`
3. Edit konten di `index.html` sesuai data Anda
4. Buka `index.html` di browser

## Struktur Animasi

- `.expertise-card` - Muncul dengan delay bertahap
- `.timeline-item` - Muncul dengan delay 0.2s
- `.achievement-card` - Muncul dengan delay 0.1s
- `.contact-card` - Muncul dengan delay 0.1s

Semua animasi akan trigger saat element masuk ke viewport dengan threshold 10%.