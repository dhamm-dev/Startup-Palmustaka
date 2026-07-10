# Palmustaka Publisher - Website Company Profile dan Katalog Statis

Website resmi Palmustaka Publisher dibangun sebagai profil perusahaan (company profile) dan katalog buku statis. Tujuan utama dari platform ini adalah menampilkan informasi penerbit, panduan pengiriman naskah, serta etalase digital yang mengarahkan pemesanan buku secara manual melalui WhatsApp.

Website ini bukan platform e-commerce. Tidak ada sistem keranjang belanja (cart), checkout, atau autentikasi pengguna. Seluruh transaksi pemesanan diselesaikan secara manual melalui WhatsApp.

## Struktur Direktori Proyek

```text
/home/dhexx/Startup/
├── index.html            - Halaman utama (Company Profile)
├── katalog.html          - Halaman Katalog Buku
├── kirim-naskah.html     - Halaman Panduan & Syarat Pengiriman Naskah
├── data-buku.json        - Basis data lokal katalog buku (format JSON)
├── css/
│   └── style.css         - Kode CSS global (reset, variabel, komponen BEM, media queries)
├── js/
│   ├── main.js           - Script global (inisialisasi navbar mobile, tahun copyright)
│   ├── katalog.js        - Script halaman katalog (fetch JSON, filter kategori, render DOM)
│   └── kirim-naskah.js   - Script halaman kirim naskah (accordion S&K, tautan WA naskah)
└── assets/
    ├── icon/             - Ikon-ikon visual format SVG
    └── images/           - Gambar aset buku dan placeholder
```

## Teknologi yang Digunakan

- **HTML5 Murni**: Kerangka halaman terstruktur tanpa generator.
- **Vanilla CSS (CSS3)**: Menggunakan metodologi penamaan BEM (Block__Element--Modifier), CSS Custom Properties (variabel), serta CSS Grid dan Flexbox untuk tata letak.
- **Vanilla JavaScript (ES6+)**: Manipulasi DOM murni secara asinkronus (Fetch API) tanpa menggunakan framework atau library tambahan seperti React, Vue, jQuery, atau Tailwind CSS.
- **Basis Data Lokal**: File `data-buku.json` yang menyimpan data katalog buku.

## Fitur Utama

1. **Company Profile (Landing Page)**:
   - Informasi penerbit, visi, misi, dan data statistik.
   - Seksi Keunggulan Kami menggunakan ikon SVG.
   - Alur penerbitan ("Dari Naskah ke Rak Buku") dengan visualisasi timeline langkah.
   - Pintu masuk (CTA) ke halaman Katalog Buku dan halaman Kirim Naskah.

2. **Katalog Buku Dinamis**:
   - Memuat data buku dari berkas JSON secara asinkronus.
   - Filter kategori buku dinamis (Semua, Fiksi, Non-Fiksi, Agama, Puisi, Pendidikan).
   - Tombol "Beli via WA" yang menghasilkan tautan pesanan dinamis berisi detail judul, penulis, dan harga buku ter-encode.

3. **Panduan Kirim Naskah**:
   - Tata cara pengiriman langkah demi langkah.
   - Tabel spesifikasi teknis format naskah (file, font, margin, spasi).
   - Accordion Syarat & Ketentuan interaktif menggunakan logika single-open (hanya satu panel terbuka sekaligus).

## Cara Menjalankan Proyek di Lingkungan Lokal

Karena website ini memuat data katalog dari berkas `data-buku.json` lokal menggunakan fungsi `fetch()`, browser akan membatasi pemuatan file jika dibuka langsung menggunakan protokol `file://` (CORS restriction).

Proyek wajib dijalankan menggunakan web server lokal.

### Langkah-langkah:

1. Buka terminal pada direktori root proyek:
   ```bash
   cd /home/dhexx/Startup
   ```

2. Jalankan server lokal menggunakan Python:
   ```bash
   python3 -m http.server 8080
   ```

3. Buka browser dan akses alamat berikut:
   ```text
   http://localhost:8080
   ```

## Standar Penulisan Kode (Coding Standards)

- **BEM Class Naming**: Struktur penamaan kelas CSS harus konsisten mengikuti aturan BEM, contoh: `.kartu-buku`, `.kartu-buku__judul`, `.kartu-buku__tombol--beli`.
- **CSS Grid & Flexbox**: CSS Grid digunakan untuk layout dua dimensi (seperti grid katalog, grid keunggulan), sedangkan Flexbox digunakan untuk susunan satu dimensi (seperti navbar, footer item).
- **Mobile-First Approach**: CSS ditulis dengan mendahulukan tampilan mobile, kemudian ditingkatkan secara progresif untuk tablet dan desktop menggunakan media query `min-width` (576px, 768px, 1024px, 1280px).
- **Aksesibilitas (a11y)**: Menggunakan atribut ARIA (`aria-expanded`, `aria-controls`, `aria-live="polite"`, `sr-only`) untuk memastikan keterbacaan oleh pembaca layar (screen reader).
- **Keamanan**: Seluruh teks dinamis yang di-render ke dalam innerHTML wajib disanitasi menggunakan fungsi `sanitasiHtml()` untuk mencegah celah keamanan XSS.
