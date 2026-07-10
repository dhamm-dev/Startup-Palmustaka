'use strict';

// ============================================================================
// katalog.js — Logika khusus halaman Katalog Buku
// Memuat data dari data-buku.json, menampilkan kartu buku,
// dan mengelola filter kategori.
// NOMOR_WA tersedia dari main.js yang diload sebelum file ini.
// ============================================================================

(function () {
  // Path ke file data buku (relatif dari root)
  const PATH_DATA_BUKU = 'data-buku.json';

  // Label tombol filter "tampilkan semua"
  const LABEL_SEMUA = 'Semua';

  // ============================================================================
  // FUNGSI: sanitasiHtml
  // Membersihkan string dari karakter HTML berbahaya (<, >) untuk mencegah XSS.
  // ============================================================================
  function sanitasiHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ============================================================================
  // FUNGSI: buatUrlWhatsApp
  // Membuat URL wa.me lengkap dengan pesan pemesanan buku yang terformat.
  // NOMOR_WA berasal dari main.js (scope global).
  // ============================================================================
  function buatUrlWhatsApp(buku) {
    // Format harga ke format Rupiah
    const hargaFormatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(buku.harga);

    // Susun teks pesan pemesanan yang informatif
    const pesanWa =
      'Halo Palmustaka Publisher! \uD83D\uDC4B\n\n' +
      'Saya ingin memesan buku berikut:\n\n' +
      '\uD83D\uDCD6 Judul   : ' + buku.judul + '\n' +
      '\u270D\uFE0F  Penulis : ' + buku.penulis + '\n' +
      '\uD83D\uDCB0 Harga   : ' + hargaFormatted + '\n\n' +
      'Apakah buku ini masih tersedia? Mohon informasi cara pembelian dan pengirimannya. Terima kasih \uD83D\uDE4F';

    // encodeURIComponent wajib untuk karakter spesial di URL
    return 'https://wa.me/' + NOMOR_WA + '?text=' + encodeURIComponent(pesanWa);
  }

  // ============================================================================
  // FUNGSI: buatHtmlKartuBuku
  // Menghasilkan string HTML lengkap untuk satu kartu buku.
  // ============================================================================
  function buatHtmlKartuBuku(buku) {
    const judulAman   = sanitasiHtml(buku.judul);
    const penulisAman = sanitasiHtml(buku.penulis);
    const deskAman    = sanitasiHtml(buku.deskripsi);
    const kategoriAman = sanitasiHtml(buku.kategori);

    const hargaFormatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(buku.harga);

    const urlWa = buatUrlWhatsApp(buku);

    return (
      '<article class="kartu-buku" data-id="' + buku.id + '" data-kategori="' + kategoriAman + '">' +
        '<div class="kartu-buku__gambar-wrapper">' +
          '<img' +
            ' class="kartu-buku__gambar"' +
            ' src="' + buku.gambar + '"' +
            ' alt="Sampul buku ' + judulAman + '"' +
            ' loading="lazy"' +
            ' onerror="this.src=\'assets/images/placeholder.jpg\'"' +
          '>' +
        '</div>' +
        '<div class="kartu-buku__konten">' +
          '<span class="kartu-buku__kategori">' + kategoriAman + '</span>' +
          '<h3 class="kartu-buku__judul">' + judulAman + '</h3>' +
          '<p class="kartu-buku__penulis">' + penulisAman + '</p>' +
          '<p class="kartu-buku__deskripsi">' + deskAman + '</p>' +
          '<div class="kartu-buku__footer">' +
            '<span class="kartu-buku__harga">' + hargaFormatted + '</span>' +
            '<a' +
              ' href="' + urlWa + '"' +
              ' class="kartu-buku__tombol--beli"' +
              ' target="_blank"' +
              ' rel="noopener noreferrer"' +
              ' aria-label="Beli buku ' + judulAman + ' via WhatsApp"' +
            '>' +
              '\uD83D\uDED2 Beli via WA' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  // ============================================================================
  // FUNGSI: tampilkanBuku
  // Merender array buku ke dalam elemen grid di DOM.
  // ============================================================================
  function tampilkanBuku(daftarBuku, elemenGrid) {
    elemenGrid.innerHTML = '';

    if (daftarBuku.length === 0) {
      elemenGrid.innerHTML = '<p class="katalog__status-teks">Tidak ada buku dalam kategori ini.</p>';
      return;
    }

    const fragmen = document.createDocumentFragment();

    daftarBuku.forEach(function (buku) {
      const pembungkus = document.createElement('div');
      pembungkus.innerHTML = buatHtmlKartuBuku(buku);
      fragmen.appendChild(pembungkus.firstElementChild);
    });

    elemenGrid.appendChild(fragmen);
  }

  // ============================================================================
  // FUNGSI: bangunTombolFilter
  // Mengekstrak kategori unik dari data buku, lalu merender tombol filter.
  // ============================================================================
  function bangunTombolFilter(dataBuku, elemenGrid) {
    const elemenFilter = document.getElementById('filterKategori');
    if (!elemenFilter) return;

    const kategoris = [LABEL_SEMUA].concat(
      Array.from(new Set(dataBuku.map(function (b) { return b.kategori; })))
    );

    elemenFilter.innerHTML = '';

    kategoris.forEach(function (kategori) {
      const tombol = document.createElement('button');
      tombol.type = 'button';
      tombol.className = 'katalog__tombol-filter' +
        (kategori === LABEL_SEMUA ? ' katalog__tombol-filter--aktif' : '');
      tombol.textContent = kategori;
      tombol.setAttribute('aria-pressed', kategori === LABEL_SEMUA ? 'true' : 'false');

      tombol.addEventListener('click', function () {
        elemenFilter.querySelectorAll('.katalog__tombol-filter').forEach(function (t) {
          t.classList.remove('katalog__tombol-filter--aktif');
          t.setAttribute('aria-pressed', 'false');
        });

        tombol.classList.add('katalog__tombol-filter--aktif');
        tombol.setAttribute('aria-pressed', 'true');

        const bukuTerfilter = kategori === LABEL_SEMUA
          ? dataBuku
          : dataBuku.filter(function (b) { return b.kategori === kategori; });

        tampilkanBuku(bukuTerfilter, elemenGrid);
      });

      elemenFilter.appendChild(tombol);
    });
  }

  // ============================================================================
  // FUNGSI: ambilDataBuku
  // Mengambil dan mem-parse data buku dari file JSON via fetch().
  // ============================================================================
  async function ambilDataBuku() {
    const respons = await fetch(PATH_DATA_BUKU);

    if (!respons.ok) {
      throw new Error('Gagal memuat data buku: HTTP ' + respons.status);
    }

    const dataBuku = await respons.json();

    if (!Array.isArray(dataBuku)) {
      throw new Error('Format data tidak valid: bukan array');
    }

    return dataBuku;
  }

  // ============================================================================
  // FUNGSI: muatKatalogBuku
  // Orkestrator utama: fetch data → sembunyikan loading → render filter dan buku.
  // ============================================================================
  async function muatKatalogBuku() {
    const elemenStatus = document.getElementById('statusKatalog');
    const elemenGrid   = document.getElementById('gridBuku');

    if (!elemenStatus || !elemenGrid) return;

    try {
      const dataBuku = await ambilDataBuku();
      elemenStatus.classList.add('katalog__status--tersembunyi');
      bangunTombolFilter(dataBuku, elemenGrid);
      tampilkanBuku(dataBuku, elemenGrid);
    } catch (galat) {
      console.error('[Palmustaka Katalog] Error:', galat);
      elemenStatus.innerHTML =
        '<p class="katalog__pesan-error">' +
          '&#9888;&#65039; Gagal memuat katalog buku.<br>' +
          '<small>' + galat.message + '</small>' +
        '</p>';
    }
  }

  // Jalankan inisialisasi catalog saat dokumen siap
  document.addEventListener('DOMContentLoaded', async function () {
    await muatKatalogBuku();
  });
}());
