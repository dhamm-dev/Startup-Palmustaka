'use strict';

// ============================================================================
// kirim-naskah.js — Logika khusus halaman Kirim Naskah
// Mengelola tombol WhatsApp konsultasi dan accordion Syarat & Ketentuan.
// NOMOR_WA tersedia dari main.js yang diload sebelum file ini.
// ============================================================================

(function () {
  // ============================================================================
  // FUNGSI: pasangTombolKirimNaskahWa
  // Menyusun URL WhatsApp untuk tombol konsultasi pengiriman naskah
  // dan memasangnya ke elemen #tombolKirimNaskahWa.
  // ============================================================================
  function pasangTombolKirimNaskahWa() {
    const tombol = document.getElementById('tombolKirimNaskahWa');

    if (!tombol) {
      console.warn('[pasangTombolKirimNaskahWa] Elemen #tombolKirimNaskahWa tidak ditemukan.');
      return;
    }

    const pesanWa =
      'Halo Palmustaka Publisher! \uD83D\uDC4B\n\n' +
      'Saya ingin mengirimkan naskah untuk dipertimbangkan penerbitan.\n\n' +
      'Boleh saya mendapat informasi lebih lanjut mengenai:\n' +
      '\uD83D\uDCCB Prosedur lengkap pengiriman naskah\n' +
      '\uD83D\uDCC5 Estimasi waktu seleksi\n' +
      '\uD83D\uDCEC Konfirmasi alamat email pengiriman\n\n' +
      'Terima kasih \uD83D\uDE4F';

    tombol.href = 'https://wa.me/' + NOMOR_WA + '?text=' + encodeURIComponent(pesanWa);
  }

  // ============================================================================
  // FUNGSI: inisialisasiAccordionSK
  // Toggle accordion Syarat & Ketentuan — single-open behavior.
  // ============================================================================
  function inisialisasiAccordionSK() {
    const daftarTombol = document.querySelectorAll('.kirim-naskah__sk-tombol');

    if (!daftarTombol.length) {
      console.warn('[inisialisasiAccordionSK] Tombol accordion SK tidak ditemukan.');
      return;
    }

    daftarTombol.forEach(function (tombol) {
      tombol.addEventListener('click', function () {
        const idPanel = tombol.getAttribute('aria-controls');
        const panel   = document.getElementById(idPanel);

        if (!panel) return;

        const sedangTerbuka = tombol.getAttribute('aria-expanded') === 'true';

        daftarTombol.forEach(function (tombolLain) {
          const idPanelLain = tombolLain.getAttribute('aria-controls');
          const panelLain   = document.getElementById(idPanelLain);
          if (tombolLain !== tombol && panelLain) {
            tombolLain.setAttribute('aria-expanded', 'false');
            panelLain.classList.remove('kirim-naskah__sk-panel--terbuka');
          }
        });

        if (sedangTerbuka) {
          tombol.setAttribute('aria-expanded', 'false');
          panel.classList.remove('kirim-naskah__sk-panel--terbuka');
        } else {
          tombol.setAttribute('aria-expanded', 'true');
          panel.classList.add('kirim-naskah__sk-panel--terbuka');
        }
      });
    });
  }

  // Jalankan inisialisasi saat dokumen siap
  document.addEventListener('DOMContentLoaded', function () {
    pasangTombolKirimNaskahWa();
    inisialisasiAccordionSK();
  });
}());
