'use strict';

// ============================================================================
// main.js — Shared/Global JavaScript untuk Palmustaka Publisher
// Berisi: konstanta global NOMOR_WA, inisialisasi navbar mobile, dan tahun footer.
// ============================================================================

// Nomor WhatsApp admin terpusat (Tambun, Bekasi)
const NOMOR_WA = '6285872043811';

// ============================================================================
// FUNGSI: muatTahunSekarang
// Mengisi elemen #tahunSekarang dengan tahun berjalan secara otomatis.
// ============================================================================
function muatTahunSekarang() {
  const elemenTahun = document.getElementById('tahunSekarang');
  if (elemenTahun) {
    elemenTahun.textContent = new Date().getFullYear();
  }
}

// ============================================================================
// FUNGSI: inisialisasiNavbar
// Mengaktifkan tombol hamburger untuk toggle navigasi mobile.
// ============================================================================
function inisialisasiNavbar() {
  const tombolMenu = document.getElementById('tombolMenu');
  const navigasi   = document.getElementById('navigasiUtama');

  if (!tombolMenu || !navigasi) return;

  tombolMenu.addEventListener('click', function () {
    const sedangTerbuka = navigasi.classList.toggle('navbar__navigasi--terbuka');
    tombolMenu.setAttribute('aria-expanded', String(sedangTerbuka));
  });

  // Tutup menu otomatis saat tautan navigasi diklik
  navigasi.querySelectorAll('.navbar__tautan').forEach(function (tautan) {
    tautan.addEventListener('click', function () {
      navigasi.classList.remove('navbar__navigasi--terbuka');
      tombolMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

// Inisialisasi shared logic saat dokumen siap
document.addEventListener('DOMContentLoaded', function () {
  muatTahunSekarang();
  inisialisasiNavbar();
});
