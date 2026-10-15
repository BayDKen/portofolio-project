export const ARTICLES = [
  {
    id: 'cara-bikin-youtube-shorts-lucu',
    slug: 'cara-bikin-youtube-shorts-lucu',
    title: 'Cara Bikin YouTube Shorts Gaming yang Lucu dari Livestream (Tanpa Ribet & Gak Gepeng)',
    category: 'Content & Workflow',
    readTime: '4 min baca',
    date: '14 Oktober 2026',
    author: {
      name: 'Niskenadi Trisna',
      role: 'Product Designer & Content Explorer',
      avatar: '/profile.png'
    },
    excerpt: 'Pernah live streaming berjam-jam tapi bingung mau dipotong dari mana? Ini trik simpel potong momen kocak, tata layout 9:16 biar pas di HP, dan bikin penonton betah nonton sampai habis.',
    tags: ['YouTube Shorts', 'TikTok', 'Video Editing', 'Gaming Workflow'],
    content: [
      {
        type: 'intro',
        text: 'Pernah gak kamu ngerasain momen ini: lagi asyik main game bareng temen (misal game rusuh kayak Chained Together atau horror game), banyak momen konyol yang bikin ngakak guling-guling, tapi pas live-nya kelar... kamu malah bingung mau diapain?'
      },
      {
        type: 'paragraph',
        text: 'Mau di-upload utuh 3 jam, jarang ada yang mau nonton dari nol. Mau dipotong jadi Shorts atau TikTok, pas di-crop malah gepeng, livecam nutupin gameplay, atau subtitlenya malah balapan sama omongan. Akhirnya video cuma ngendap di harddisk.'
      },
      {
        type: 'paragraph',
        text: 'Nah, daripada rekaman seru kamu sia-sia, berikut cara praktis dan to-the-point yang biasa gua terapin buat nyulap live berjam-jam jadi klip Shorts vertikal 9:16 yang renyah dan enak dilihat orang awam.'
      },
      {
        type: 'heading',
        title: '1. Jangan Tonton Ulang 3 Jam! Cari "Trigger Reaksi"'
      },
      {
        type: 'paragraph',
        text: 'Kesalahan paling bikin capek pemula adalah memutar ulang seluruh rekaman dari menit pertama. Cara cerdasnya:'
      },
      {
        type: 'list',
        items: [
          'Lihat gelombang audio (audio waveform): Titik di mana gelombang suaranya melonjak tinggi biasanya adalah momen teriakan, kaget, atau ketawa bareng. Langsung lompat ke titik itu.',
          'Ingat momen blunder terbesar: Biasanya terjadi pas mau menang tapi gagal, salah lompat, atau salah lempar tuduhan ke temen.',
          'Fokus ke 3 detik pertama (The Hook): Begitu video mulai, penonton harus langsung tahu situasinya. Jangan mulai dengan hening atau loading screen. Mulai dari satu kalimat kocak yang memicu penasaran.'
        ]
      },
      {
        type: 'callout',
        title: '💡 Tips 3 Detik Pertama',
        text: 'Kalau temenmu teriak "JANGAN LOMPAT DULU GOBLOK!", pasang potongan teriakan itu di 1 detik pertama sebagai teaser, baru masuk ke cuplikan lengkapnya.'
      },
      {
        type: 'heading',
        title: '2. Rahasia Layout 9:16: Gameplay di Atas, Livecam di Bawah'
      },
      {
        type: 'paragraph',
        text: 'Video live streaming umumnya berformat 16:9 (horizontal lebar). Saat mau dijadikan Shorts untuk layar HP (9:16 vertikal), jangan pernah sekadar "stretch" atau narik gambarnya jadi lonjong! Penonton bakal langsung scroll karena gambarnya aneh.'
      },
      {
        type: 'paragraph',
        text: 'Susunan paling ideal adalah stacked layout (tumpuk atas-bawah):'
      },
      {
        type: 'list',
        items: [
          'Bagian Atas (65% layar): Tempatkan gameplay utama. Crop fokus pada karakter atau aksi yang sedang terjadi.',
          'Bagian Bawah (35% layar): Tempatkan webcam/livecam wajah kamu. Penonton Shorts suka melihat reaksi ekspresi muka yang kaget atau geregetan.',
          'Hapus Space Hitam: Buat kedua video menempel rapat tanpa celah hitam tebal di tengah, biar visualnya terasa penuh dan profesional.'
        ]
      },
      {
        type: 'heading',
        title: '3. Trik Biar Video Tetap Tajam Walau Di-Zoom'
      },
      {
        type: 'paragraph',
        text: 'Waktu kita nge-crop gameplay 16:9 jadi vertikal, resolusi gambarnya otomatis membesar dan rentan pecah atau buram. Biar tetap tajem saat tayang di HP penonton:'
      },
      {
        type: 'list',
        items: [
          'Pastikan rekaman awal minimal 1080p 60fps.',
          'Gunakan filter penajaman (sharpening) sekitar 10-15%. Sedikit sentuhan sharpening bikin detail teks in-game dan wajah livecam kamu tetap renyah di layar smartphone.',
          'Ekspor dengan bitrate yang cukup (minimal 12-16 Mbps) agar pas dikompresi oleh algoritma YouTube/TikTok hasilnya gak patah-patah.'
        ]
      },
      {
        type: 'heading',
        title: '4. Subtitle Dinamis: Kunci Orang Betah Nonton Tanpa Suara'
      },
      {
        type: 'paragraph',
        text: 'Banyak orang scrolling Shorts di tempat umum tanpa menyalakan suara maksimal. Jadi, subtitle itu hukumnya wajib. Tapi jangan pasang subtitle panjang kayak koran.'
      },
      {
        type: 'list',
        items: [
          'Munculkan kata per kata (pop-up dynamic): Teks mengikuti intonasi bicara, 1 sampai 3 kata saja per ketukan.',
          'Bedakan warna per pembicara: Misalnya suara kamu warna teksnya Hijau Zamrud (#34D399), sedangkan suara temen mabar kamu Kuning atau Putih. Penonton langsung paham siapa yang lagi ngomong tanpa bingung.',
          'Perhatikan Safe Area: Jangan taruh subtitle terlalu ke bawah atau terlalu ke kanan, karena bakal tertutup tombol Like, Komen, dan judul Shorts di aplikasi YouTube.'
        ]
      },
      {
        type: 'heading',
        title: '5. Workflow Cepat: 1 Live Streaming Jadi 5-10 Klip'
      },
      {
        type: 'paragraph',
        text: 'Kunci konsistensi di YouTube Shorts bukan mengedit satu video sampai berhari-hari, tapi punya sistem yang cepat. Begitu kamu punya satu template layout (posisi webcam & gameplay yang sudah pas), kamu tinggal geser potongan video dari live streaming kamu ke template tersebut.'
      },
      {
        type: 'paragraph',
        text: 'Dari 2 jam main game, targetkan ambil 5 momen paling bikin ngakak. Jadwalkan upload 1 klip per hari, dan algoritma Shorts bakal jauh lebih gampang melirik channel kamu karena konsisten.'
      },
      {
        type: 'conclusion',
        text: 'Intinya: gak butuh software jutaan rupiah atau skill editing selevel Hollywood buat bikin konten Shorts yang disukai orang. Yang penting adalah momen aslinya kena, muka dan gamenya kelihatan jelas, serta ceritanya padat tanpa basa-basi.'
      }
    ]
  },
  {
    id: 'merancang-dashboard-hcis-tanpa-bikin-pusing',
    slug: 'merancang-dashboard-hcis-tanpa-bikin-pusing',
    title: 'Mendesain Dashboard HCIS Enterprise Biar Gak Bikin Pusing Karyawan',
    category: 'Product Design',
    readTime: '5 min baca',
    date: '08 Oktober 2026',
    author: {
      name: 'Niskenadi Trisna',
      role: 'Product Designer & Design Systems',
      avatar: '/profile.png'
    },
    excerpt: 'Catatan praktis merancang platform Human Capital & payroll: gimana menyederhanakan data tabel ribuan baris menjadi antarmuka yang intuitif dan cepat dipahami orang awam.',
    tags: ['UI/UX Design', 'Enterprise SaaS', 'Design Systems', 'HCIS'],
    content: [
      {
        type: 'intro',
        text: 'Pernahkah kamu membuka software HR atau absensi kantor dan langsung merasa ingin menutupnya lagi karena tampilannya mirip file Excel tahun 2005 yang penuh kolom rumit?'
      },
      {
        type: 'paragraph',
        text: 'Sebagai desainer produk digital, tantangan terbesar di platform enterprise (seperti HCIS, ERP, dan Payroll) bukan sekadar membuat warna tombol terlihat cantik, melainkan bagaimana membuat data ribuan karyawan terasa ringan untuk dikelola.'
      },
      {
        type: 'heading',
        title: '1. Pisahkan Data Kritis dengan Data Pendukung'
      },
      {
        type: 'paragraph',
        text: 'HRD atau manajer biasanya cuma butuh 3 jawaban cepat saat membuka dashboard: siapa yang butuh persetujuan cuti hari ini, apakah ada anomali absensi, dan status penggajian bulan ini. Taruh ketiga hal ini di level pandangan pertama (above the fold) dalam bentuk card ringkas berangka besar.'
      },
      {
        type: 'heading',
        title: '2. Hirarki Navigasi Log Pose'
      },
      {
        type: 'paragraph',
        text: 'Sama seperti filosofi navigasi Log Pose yang saya gunakan di portofolio ini: antarmuka terbaik adalah yang memandu user langkah demi langkah tanpa membebani memori otak mereka. Kelompokkan menu berdasarkan alur kerja nyata mereka, bukan berdasarkan departemen struktur database.'
      },
      {
        type: 'conclusion',
        text: 'Desain enterprise yang hebat bukanlah yang paling ramai grafiknya, melainkan yang paling cepat membantu user menyelesaikan tugas mereka lalu kembali pulang ke keluarga mereka tepat waktu.'
      }
    ]
  }
];

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug || a.id === slug);
}
