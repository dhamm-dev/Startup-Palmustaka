# Skill: Panduan Pengembangan Website Palmustaka Publisher

> Dokumen ini adalah **acuan mutlak (system prompt / project rules)** untuk setiap AI coding assistant maupun developer manusia yang mengerjakan proyek website Palmustaka Publisher. Semua keputusan teknis dan desain WAJIB tunduk pada aturan di bawah ini, kecuali ada instruksi eksplisit lain dari pemilik proyek yang menggantikan sebagian aturan ini.

---

## 1. Project Overview

Palmustaka Publisher adalah sebuah **website company profile dan katalog statis** untuk sebuah penerbit buku. Tujuan utama website ini adalah:

- Menampilkan profil, visi-misi, dan informasi umum tentang penerbit.
- Menampilkan katalog buku-buku terbitan secara statis (tanpa sistem transaksi online terintegrasi).
- Menjadi etalase digital yang mengarahkan calon pembeli untuk melakukan pemesanan **secara manual melalui WhatsApp**.

Website ini **BUKAN** platform e-commerce. Tidak ada sistem pembayaran, tidak ada akun pengguna, dan tidak ada proses checkout di dalam website. Semua transaksi terjadi di luar sistem, melalui percakapan WhatsApp antara calon pembeli dan admin penerbit.

---

## 2. Tech Stack & Architecture

### 2.1 Aturan Bahasa & Framework
- **WAJIB** menggunakan **HTML murni (HTML5)**, **CSS murni (Vanilla CSS)**, dan **Vanilla JavaScript (ES6+)**.
- **DILARANG** menggunakan framework atau library CSS/JS tambahan, termasuk namun tidak terbatas pada: React, Vue, Angular, Svelte, Tailwind CSS, Bootstrap, jQuery, atau CSS preprocessor (SASS/LESS) kecuali diminta lain secara eksplisit oleh pemilik proyek.
- Tidak ada proses build/bundler (Webpack, Vite, dll). Kode harus bisa langsung dijalankan di browser tanpa tahap kompilasi.

### 2.2 Arsitektur Data
- **Tanpa backend** (tidak ada server-side language seperti PHP, Node.js sebagai backend aplikasi, dll).
- **Tanpa database SQL** atau NoSQL apa pun.
- Seluruh data katalog buku disimpan dalam satu file lokal bernama **`data-buku.json`**.
- Data buku tersebut dimuat dan dirender ke dalam DOM menggunakan **JavaScript `fetch()`** secara asynchronous, kemudian di-render secara dinamis ke elemen HTML (misalnya kartu buku) menggunakan DOM manipulation murni (`document.createElement`, `innerHTML` terkontrol, dsb).
- Struktur `data-buku.json` harus konsisten dan terprediksi, minimal memuat field seperti: `id`, `judul`, `penulis`, `harga`, `gambar`, `deskripsi`, dan `kategori` (field boleh disesuaikan kebutuhan, tetapi konsistensi struktur wajib dijaga).

---

## 3. UI/UX & Layouting Rules

- **Wajib memaksimalkan CSS Grid dan Flexbox** untuk membangun struktur layout yang rapi, sejajar, dan multi-antarmuka (multi-section: hero, katalog, tentang kami, kontak, dll).
  - Gunakan **CSS Grid** untuk struktur layout besar/dua dimensi (misalnya grid kartu katalog buku, layout halaman utama).
  - Gunakan **Flexbox** untuk penyusunan elemen satu dimensi (misalnya navbar, tombol dalam kartu, elemen footer).
- **Dilarang** menggunakan layout berbasis `float` atau `position: absolute` sebagai metode utama penyusunan struktur halaman (posisi absolut hanya boleh untuk elemen dekoratif/overlay tertentu).
- Desain **wajib responsif** dengan pendekatan **mobile-first**:
  - Tulis style dasar untuk tampilan mobile terlebih dahulu.
  - Gunakan `min-width` media query untuk breakpoint tablet dan desktop secara progresif (contoh breakpoint acuan: `≥576px`, `≥768px`, `≥1024px`, `≥1280px`, dapat disesuaikan kebutuhan desain).
- Pastikan area sentuh (tap target) tombol dan tautan cukup besar dan nyaman digunakan di perangkat mobile.

---

## 4. Business Logic (WhatsApp Commerce)

Ini adalah aturan bisnis paling kritis dari proyek ini dan **tidak boleh dilanggar**:

- **DILARANG KERAS** membuat fitur keranjang belanja (add to cart), sistem checkout, wishlist, atau simulasi transaksi apa pun di dalam website.
- Setiap tombol **"Beli"** pada kartu buku **WAJIB** menggunakan tag `<a>` (bukan `<button>` dengan JavaScript handler kompleks) yang mengarah langsung ke **WhatsApp API (`https://wa.me/`)**.
- Tautan `wa.me` tersebut harus menyertakan **draf teks pesan pemesanan yang dinamis**, di-generate dari data buku yang sedang ditampilkan (judul buku, dan jika relevan, harga), menggunakan parameter `?text=` yang di-encode dengan `encodeURIComponent()`.

**Contoh pola implementasi (ilustratif):**

```javascript
// Membentuk pesan WhatsApp dinamis berdasarkan data buku
function buatTautanWhatsApp(buku) {
  const nomorWA = "62812xxxxxxx"; // nomor admin penerbit
  const pesan = `Halo, saya ingin memesan buku "${buku.judul}" (${buku.penulis}) seharga ${buku.harga}. Apakah masih tersedia?`;
  return `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
}
```

- Nomor tujuan WhatsApp sebaiknya disimpan sebagai satu konstanta terpusat agar mudah diubah di kemudian hari.

---

## 5. Coding Standards

- Kode harus **bersih (clean code)**, mudah dibaca, dan konsisten indentasinya.
- Penamaan class CSS **wajib mengikuti metodologi BEM** (`Block__Element--Modifier`), contoh:
  - `.kartu-buku`
  - `.kartu-buku__judul`
  - `.kartu-buku__tombol--beli`
- Hindari penamaan class generik seperti `.box1`, `.left`, `.red-text`; gunakan nama yang bersifat semantik dan mendeskripsikan fungsinya.
- Setiap bagian logika JavaScript yang memproses data dari `data-buku.json` (fetching, parsing, rendering, pembentukan tautan WhatsApp) **wajib diberi komentar penjelas** agar mudah dipahami dan dipelihara.
- Gunakan penamaan variabel dan fungsi berbahasa Indonesia atau Inggris secara **konsisten** (pilih satu, jangan campur dalam satu file) — disarankan konsisten mengikuti konvensi yang sudah ada di proyek.
- Struktur folder proyek disarankan:
  ```
  /
  ├── index.html
  ├── data-buku.json
  ├── skill.md
  ├── /css
  │   └── style.css
  ├── /js
  │   └── main.js
  └── /assets
      └── /images
  ```
- Hindari inline style (`style="..."`) pada HTML kecuali untuk kebutuhan sangat spesifik dan sementara.

---

## Catatan Penutup

Dokumen `skill.md` ini berlaku sebagai **project rules mutlak**. Setiap AI coding assistant yang membantu pengembangan lebih lanjut pada proyek Palmustaka Publisher wajib membaca dan mematuhi seluruh poin di atas sebelum menulis atau mengubah kode apa pun.
