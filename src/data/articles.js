export const ARTICLES = [
  {
    id: 'metode-klip-shorts-antigravity-ai',
    slug: 'cara-bikin-youtube-shorts-lucu',
    title: 'Metode Membuat Klip YouTube Shorts dari Live Stream Menggunakan AI (Google Antigravity)',
    category: 'Workflow & AI',
    readTime: '5 min baca',
    date: '15 Oktober 2026',
    author: {
      name: 'Niskenadi Trisna',
      role: 'Product Designer & Content Explorer',
      avatar: '/profile.png'
    },
    excerpt: 'Panduan praktis mengubah rekaman live stream berdurasi jam-jaman menjadi puluhan klip YouTube Shorts vertikal (9:16) berkualitas tinggi secara otomatis dengan Google Antigravity—mulai dari kurasi momen lucu, penataan layout, hingga sinkronisasi subtitle.',
    tags: ['YouTube Shorts', 'Google Antigravity', 'AI Video Editing', 'Workflow Automation', 'Content Strategy'],
    hasInteractiveGuide: true,
    content: [
      {
        type: 'intro',
        text: 'Bagi seorang pembuat konten atau pemain gim yang rutin melakukan siaran langsung (live stream), rekaman video berdurasi 2 hingga 3 jam menyimpan banyak sekali momen menarik. Namun, tantangan terbesarnya hampir selalu sama: proses memilah, memotong, dan mengedit rekaman panjang tersebut menjadi video pendek (YouTube Shorts atau TikTok) membutuhkan waktu serta tenaga yang sangat besar jika dilakukan secara manual.'
      },
      {
        type: 'paragraph',
        text: 'Kendala teknis yang kerap ditemui antara lain format video yang terdistorsi (gepeng) saat dipaksakan ke rasio vertikal 9:16, penurunan ketajaman gambar akibat pembesaran (crop), hingga ketidaksesuaian waktu (desinkronisasi) antara suara ucapan dan teks subtitle. Melalui artikel ini, saya merangkum alur kerja sistematis dalam memanfaatkan kecerdasan buatan (AI) dan lingkungan Google Antigravity untuk menyelesaikan seluruh tahapan tersebut secara efisien.'
      },
      {
        type: 'heading',
        title: '1. Deteksi Momen Otomatis Melalui Analisis Gelombang Suara & Transkrip'
      },
      {
        type: 'paragraph',
        text: 'Alih-alih memutar ulang seluruh rekaman video dari awal yang memakan waktu berjam-jam, sistem AI dapat dimanfaatkan untuk memindai berkas audio dan transkrip siaran secara otomatis:'
      },
      {
        type: 'image',
        src: '/assets/article-step1-waveform.jpg',
        alt: 'Visualisasi Analisis Waveform Audio dan Deteksi Momen Puncak',
        stepNumber: '01',
        tag: 'Dokumentasi Visual 01',
        title: 'Spektrogram Lonjakan Amplitudo Audio & Deteksi The Hook',
        caption: 'Gambar 1.1: Pemindaian otomatis lonjakan gelombang suara (waveform spike > -6 dB) dan transkripsi suara untuk menentukan momen reaksi puncak (tawa/kaget), serta mengisolasi detik 0.00 – 0.03 sebagai hook pembuka.',
        specs: ['Frekuensi Audio: 48 kHz Stereo', 'Amplitudo Spike: > -6 dB', 'Engine: Whisper AI + Voice Activity Detection']
      },
      {
        type: 'list',
        items: [
          'Analisis Lonjakan Amplitudo (Waveform Spike): Titik di mana gelombang suara melonjak tajam umumnya menandakan adanya momen krusial, seperti tawa lepas bersama, reaksi terkejut, atau ketegangan permainan yang memuncak.',
          'Pencarian Kata Kunci Reaksi: AI mengidentifikasi frasa-frasa spontan penanda kelucuan atau interaksi seru antar pemain.',
          'Optimasi 3 Detik Pertama (The Hook): Menempatkan inti reaksi terlucu tepat di awal video berdurasi 1 detik pertama sebagai pembuka yang efektif sebelum konteks permainan diperlihatkan.'
        ]
      },
      {
        type: 'callout',
        title: 'Prinsip Penentuan Hook',
        text: 'Tingkat retensi penonton pada video vertikal sangat ditentukan oleh 3 detik pertama. Memulai video tepat saat terjadinya reaksi emosional yang tinggi jauh lebih efektif dibandingkan menampilkan layar pembuka yang hening.'
      },
      {
        type: 'heading',
        title: '2. Rekonstruksi Tata Letak Vertikal 9:16 (Stacked Layout)'
      },
      {
        type: 'paragraph',
        text: 'Sumber rekaman siaran langsung umumnya berorientasi horizontal (16:9). Untuk menyajikannya secara proporsional di layar ponsel pintar tanpa distorsi gambar, diterapkan metode tata letak bertingkat (stacked layout):'
      },
      {
        type: 'image',
        src: '/assets/article-step2-layout.jpg',
        alt: 'Blueprint Arsitektur Tata Letak Vertikal 9:16 (Stacked Layout)',
        stepNumber: '02',
        tag: 'Dokumentasi Visual 02',
        title: 'Komposisi Stacked Layout 9:16 (65% Gameplay + 35% Facecam)',
        caption: 'Gambar 2.1: Dekomposisi rekaman horizontal 16:9 menjadi format vertikal smartphone 9:16. Membagi porsi 65% area atas untuk gameplay aksi dan 35% area bawah untuk webcam tanpa celah hitam (zero margin) serta bebas distorsi gepeng.',
        specs: ['Kanvas Output: 1080 x 1920 px (9:16)', 'Porsi Gameplay: 65% (1248 px)', 'Porsi Facecam: 35% (672 px)']
      },
      {
        type: 'list',
        items: [
          'Area Atas (65% Layar): Didedikasikan untuk rekaman permainan (gameplay). Bidang pandang diperbesar dan difokuskan pada pergerakan karakter utama.',
          'Area Bawah (35% Layar): Didedikasikan untuk kamera wajah (webcam). Reaksi ekspresi wajah merupakan elemen krusial yang membangun kedekatan emosional dengan audiens.',
          'Peniadaan Batas Hitam (Zero Margin Split): Kedua segmen video dirapatkan secara presisi tanpa menyisakan ruang hitam kosong di tengah, sehingga tampilan terasa padat dan nyaman dipandang.'
        ]
      },
      {
        type: 'heading',
        title: '3. Optimalisasi Ketajaman Gambar Pasca-Cropping'
      },
      {
        type: 'paragraph',
        text: 'Pemotongan dan pembesaran bidang visual dari rasio horizontal ke vertikal secara alami dapat mengurangi kerapatan piksel. Untuk menjaga agar teks antarmuka gim dan detail wajah tetap jernih, digunakan rantai pemrosesan grafis:'
      },
      {
        type: 'image',
        src: '/assets/article-step3-sharpening.jpg',
        alt: 'Komparasi Kualitas Gambar: Bilinear Crop vs Lanczos + FidelityFX CAS',
        stepNumber: '03',
        tag: 'Dokumentasi Visual 03',
        title: 'Restorasi Ketajaman Gambar Pasca-Crop (Lanczos & FidelityFX CAS)',
        caption: 'Gambar 3.1: Komparasi visual pembesaran gambar. Sisi kiri memperlihatkan pembesaran standar bilinear yang buram, sedangkan sisi kanan telah direstorasi dengan filter Lanczos 8-tap dan Contrast Adaptive Sharpening (CAS) pada bitrate 15.2 Mbps.',
        specs: ['Filter Rekonstruksi: Lanczos 8-Tap', 'Filter Adaptif: AMD FidelityFX CAS', 'Bitrate Ekspor: 14 – 16 Mbps VBR']
      },
      {
        type: 'list',
        items: [
          'Algoritma Penajaman Lanczos & Adaptive Sharpening: Mengembalikan kejelasan garis tepi objek yang mengalami pembesaran skala.',
          'Penyetelan Bitrate yang Memadai: Ekspor video dilakukan pada laju bit 14–16 Mbps untuk mengantisipasi penurunan kualitas akibat kompresi otomatis platform YouTube.'
        ]
      },
      {
        type: 'heading',
        title: '4. Penyelarasan Subtitle Dinamis Berbasis Pengenalan Suara'
      },
      {
        type: 'paragraph',
        text: 'Sebagian besar pengguna mengonsumsi video pendek di tempat umum dengan tingkat volume suara rendah. Keberadaan subtitle yang akurat menjadi penentu apakah pesan video tersampaikan dengan baik:'
      },
      {
        type: 'image',
        src: '/assets/article-step4-subtitles.jpg',
        alt: 'Penyelarasan Subtitle Dinamis dan Zonasi Safe Area YouTube Shorts',
        stepNumber: '04',
        tag: 'Dokumentasi Visual 04',
        title: 'Subtitle Dinamis Milidetik & Kepatuhan Safe Area Shorts',
        caption: 'Gambar 4.1: Penempatan teks kinetik di zona aman (safe area) YouTube Shorts agar tidak tertutup tombol interaksi di sebelah kanan (Like, Komentar, Bagikan) serta judul audio di bawah. Dilengkapi diferensiasi warna pembicara (Hijau untuk Host, Kuning untuk Tamu).',
        specs: ['Presisi Sinkronisasi: ±20 ms Speech Boundary', 'Safe Margin Bawah: 140 px', 'Safe Margin Kanan: 90 px']
      },
      {
        type: 'list',
        items: [
          'Sinkronisasi Suara Presisi (Speech Boundary Detection): Menggunakan model pengenalan ucapan AI untuk mencocokkan kemunculan teks tepat pada milidetik ketika kata diucapkan.',
          'Diferensiasi Warna Pembicara: Mengalokasikan warna yang berbeda untuk setiap orang yang berbicara (misalnya teks hijau untuk pembicara utama dan kuning untuk rekan bicara) guna mempermudah pemahaman jalan cerita.',
          'Kepatuhan Safe Area: Memosisikan teks di area tengah yang aman dari tumpang tindih dengan tombol navigasi aplikasi (tombol Suka, Komentar, dan Bagikan di sisi kanan).'
        ]
      },
      {
        type: 'heading',
        title: '5. Eksekusi Skala Otomatis (Batch Processing)'
      },
      {
        type: 'paragraph',
        text: 'Keunggulan utama pemanfaatan lingkungan agen AI seperti Google Antigravity adalah kemampuannya dalam mereplikasi konfigurasi kerja secara berulang. Setelah parameter tata letak, penajaman, dan pengaturan teks pada klip pertama terverifikasi dengan baik, formula tersebut dapat langsung diinstruksikan untuk memproses 9 hingga 10 klip lainnya secara otomatis.'
      },
      {
        type: 'image',
        src: '/assets/article-step5-pipeline.jpg',
        alt: 'Alur Kerja Otomasi Batch Processing Google Antigravity Agent',
        stepNumber: '05',
        tag: 'Dokumentasi Visual 05',
        title: 'Konsol Orkestrasi Pipeline Batch Google Antigravity Agent',
        caption: 'Gambar 5.1: Pipeline otomasi mandiri Google Antigravity. Satu perintah CLI memicu pemrosesan 10 klip Shorts secara paralel dengan pipeline FFmpeg berakselerasi GPU NVENC, mereduksi waktu eksekusi manual dari 4 jam menjadi hanya 4 menit.',
        specs: ['Orkestrasi: Google Antigravity Agent', 'Throughput: 10 Shorts / ~4 Menit', 'Hardware Engine: GPU NVENC H.264/HEVC']
      },
      {
        type: 'conclusion',
        text: 'Pemanfaatan kecerdasan buatan pada alur kerja konten kreatif bukan bertujuan untuk menggantikan kreativitas manusia, melainkan untuk mengeliminasi pekerjaan repetitif yang memakan waktu. Dengan mengotomatiskan proses teknis kurasi dan pemotongan klip, kreator dapat memusatkan energi mereka pada interaksi siaran dan pengembangan ide-ide baru.'
      }
    ]
  },
  {
    id: 'merancang-dashboard-hcis-enterprise',
    slug: 'merancang-dashboard-hcis-tanpa-bikin-pusing',
    title: 'Prinsip Perancangan Dashboard Enterprise HCIS: Mengelola Kompleksitas Data Skala Besar',
    category: 'Desain Produk',
    readTime: '5 min baca',
    date: '08 Oktober 2026',
    author: {
      name: 'Niskenadi Trisna',
      role: 'Product Designer & Design Systems',
      avatar: '/profile.png'
    },
    excerpt: 'Bagaimana mereduksi beban kognitif pada antarmuka Human Capital Information System (HCIS) melalui hierarki data yang jelas, navigasi terarah, dan integrasi sistem token desain.',
    tags: ['UI/UX Design', 'Enterprise SaaS', 'Design Systems', 'HCIS', 'Information Architecture'],
    content: [
      {
        type: 'intro',
        text: 'Perancangan perangkat lunak enterprise—khususnya pada platform Human Capital Information System (HCIS) dan penggajian—memiliki tantangan fundamental yang berbeda dari aplikasi konsumen umum. Volume data yang tinggi, regulasi internal yang kompleks, serta ragam hak akses pengguna menuntut antarmuka yang mampu menyederhanakan alur kerja tanpa mengorbankan integritas data.'
      },
      {
        type: 'paragraph',
        text: 'Dalam pengalaman saya merancang sistem HCIS berskala korporat, antarmuka yang berhasil adalah yang mampu memberikan jawaban cepat terhadap kebutuhan harian pengguna dalam hitungan detik pertama saat halaman dibuka.'
      },
      {
        type: 'heading',
        title: '1. Pengelompokan Data Kritis pada Pandangan Pertama'
      },
      {
        type: 'paragraph',
        text: 'Kesalahan umum dalam penyusunan dashboard enterprise adalah menampilkan seluruh parameter database secara simultan. Pengguna operasional (seperti tim HRD atau manajer lini) pada dasarnya memprioritaskan tindakan cepat:'
      },
      {
        type: 'list',
        items: [
          'Pengajuan yang Membutuhkan Persetujuan: Menampilkan jumlah permohonan cuti atau izin yang tertunda dalam bentuk kartu metrik terfokus.',
          'Peringatan Anomali Absensi: Memunculkan indikator ketidakhadiran atau keterlambatan yang memerlukan tindak lanjut segera.',
          'Status Siklus Penggajian: Memberikan gambaran ringkas progres rekonsiliasi data bulanan.'
        ]
      },
      {
        type: 'heading',
        title: '2. Penerapan Hierarki Navigasi Terpandu (Log Pose Methodology)'
      },
      {
        type: 'paragraph',
        text: 'Mengadopsi filosofi kejelasan navigasi, struktur menu dikelompokkan berdasarkan tujuan fungsional pengguna di dunia nyata, bukan semata-mata mencerminkan struktur tabel pada basis data. Hal ini meminimalkan disorientasi pengguna dan mempercepat waktu penyelesaian tugas harian secara signifikan.'
      },
      {
        type: 'conclusion',
        text: 'Desain produk digital yang matang adalah desain yang tidak membebani kapasitas kognitif penggunanya. Dengan menghadirkan hierarki informasi yang terarah, sistem digital dapat membantu pengguna menyelesaikan tanggung jawab administratif mereka secara efisien.'
      }
    ]
  }
];

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug || a.id === slug);
}
