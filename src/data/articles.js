export const ARTICLES = [
  {
    id: 'cerita-bikin-shorts-gaming-livestream',
    slug: 'cara-bikin-youtube-shorts-lucu',
    title: 'Dari Livestream 3 Jam Jadi Klip Shorts yang Bikin Ngakak: Cerita & Cara Gue Ngakalinnya',
    category: 'Bikin Konten',
    readTime: '4 min baca',
    date: '14 Oktober 2026',
    author: {
      name: 'Niskenadi Trisna',
      role: 'Product Designer & Content Explorer',
      avatar: '/profile.png'
    },
    excerpt: 'Kelar mabar berjam-jam, rekaman videonya numpuk puluhan giga. Gimana cara motong momen paling konyol, nata layout biar gak gepeng, dan bikin penonton betah nonton sampai habis tanpa bikin kita pusing ngeditnya?',
    tags: ['YouTube Shorts', 'TikTok', 'Video Editing', 'Gaming Workflow', 'Chained Together'],
    content: [
      {
        type: 'intro',
        text: 'Pernah gak sih kamu ngalamin ini: lagi asyik main game bareng temen (waktu itu gue lagi main Chained Together, game yang bener-bener nguji kesabaran dan bikin teriak-teriak gak jelas). Di tengah jalan, banyak banget momen konyol—temen salah lompat, rantai ketarik, panik bareng, ketawa sampai batuk.'
      },
      {
        type: 'paragraph',
        text: 'Tapi pas sesi live kelar dan gue liat folder rekaman... mendadak lemes. File-nya gede banget, durasinya 3 jam lebih. Mau di-upload mentahan, siapa yang tahan nonton dari awal? Mau dipotong jadi Shorts atau TikTok, ternyata PR-nya banyak banget.'
      },
      {
        type: 'paragraph',
        text: 'Waktu pertama kali nyoba potong-potong sendiri, hasilnya bener-bener zonk. Videonya ditarik paksa biar muat layar HP, alhasil muka gue dan gamenya jadi gepeng kayak layangan. Pas di-zoom malah buram kayak rekaman CCTV tahun 90-an. Dan yang paling nyebelin: subtitlenya malah balapan sama suara—orang belum ngomong, teksnya udah nongol duluan. Garing seketika.'
      },
      {
        type: 'paragraph',
        text: 'Dari situ gue mikir: gimana caranya bikin klip Shorts yang ringkas, visualnya enak diliat orang awam, tapi proses ngeditnya gak bikin kita gila? Ini beberapa hal yang akhirnya gue temuin dari hasil trial-error.'
      },
      {
        type: 'heading',
        title: '1. Jangan Nonton Ulang dari Menit Pertama (Bikin Cepat Burnout)'
      },
      {
        type: 'paragraph',
        text: 'Cara paling cepet buat mager ngedit adalah memutar ulang rekaman 3 jam itu dari awal. Trik yang akhirnya gue pake simpel banget:'
      },
      {
        type: 'list',
        items: [
          'Liat grafik audio (Waveform): Kalau ada gelombang suara yang tiba-tiba melonjak tinggi, 90% itu momen heboh. Entah teriakan kaget, ketawa lepas, atau orang gebrak meja. Langsung lompat ke titik itu.',
          'Inget-inget momen paling apes: Kejadian lucu di game hampir selalu terjadi pas ada harapan semu—udah mau sampai puncak, eh satu orang kepeleset terus narik semua orang ke jurang.',
          'Kunci 3 detik pertama (The Hook): Begitu video mulai, penonton harus langsung tahu situasinya. Jangan mulai dengan hening atau nunggu loading. Mulai dari satu kalimat kocak yang memicu rasa penasaran.'
        ]
      },
      {
        type: 'callout',
        title: '💡 Trik 3 Detik Pertama',
        text: 'Kalau temenmu teriak "JANGAN LOMPAT DULU, WOI!", pasang potongan teriakan itu di 1 detik pertama sebagai teaser pembuka, baru sambung ke adegan lengkap sebelum kejadian.'
      },
      {
        type: 'heading',
        title: '2. Menata "Ruang Tamu" Layar HP: Layout Stacked Atas-Bawah'
      },
      {
        type: 'paragraph',
        text: 'Video live streaming aslinya melebar (16:9), sedangkan layar HP itu berdiri tegak (9:16). Kalau kamu asal narik video lebar itu biar penuh ke atas, gambarnya bakal melar aneh dan penonton langsung skip.'
      },
      {
        type: 'paragraph',
        text: 'Susunan yang paling pas di mata penonton adalah menumpuknya jadi dua bagian:'
      },
      {
        type: 'list',
        items: [
          'Bagian Atas (sekitar 65% layar): Ini panggung utamanya. Tempatkan gameplay dan crop fokus ke karakter serta aksi yang lagi terjadi.',
          'Bagian Bawah (sekitar 35% layar): Tempatkan livecam/webcam. Orang nonton klip gaming di Shorts itu pengen liat reaksi asli muka kita—paniknya, geregetannya, atau muka pasrahnya.',
          'Rapatkan tanpa celah hitam: Hindari ngasih garis hitam tebal di tengah yang bikin video berasa dipenggal. Buat video gameplay dan webcam menempel rapi.'
        ]
      },
      {
        type: 'heading',
        title: '3. Kenapa Video Crop Gampang Buram & Cara Ngakalinnya'
      },
      {
        type: 'paragraph',
        text: 'Begitu video 16:9 di-zoom buat masuk format vertikal, pikselnya otomatis melar. Kalau dibiarin polos, pas di-upload ke YouTube bakal keliatan buram dan pecah.'
      },
      {
        type: 'list',
        items: [
          'Pastikan sumber rekamannya minimal 1080p 60fps sejak dari OBS/aplikasi rekam.',
          'Beri sedikit filter penajaman (sharpening) sekitar 10–15% pas proses render. Trik kecil ini bikin teks in-game tetap kebaca jelas dan muka di webcam gak keliatan blur di layar HP.',
          'Ekspor dengan bitrate yang cukup (minimal 12-16 Mbps) biar gak dihancurin sama kompresi otomatis YouTube atau TikTok.'
        ]
      },
      {
        type: 'heading',
        title: '4. Subtitle Itu Pemandu Tawa, Bukan Artikel Koran'
      },
      {
        type: 'paragraph',
        text: 'Faktanya, banyak orang scrolling Shorts pas lagi di tempat umum, di commuter line, atau rebahan tanpa nyalain suara kencang-kencang. Subtitle itu penyelamat retensi penonton. Tapi ada seninya:'
      },
      {
        type: 'list',
        items: [
          'Munculkan teks per beberapa kata (dinamis): Ikuti ketukan bicara, 1 sampai 3 kata saja per timing. Ini ngasih ritme yang bikin mata penonton betah ngikutin.',
          'Bedakan warna teks per orang: Pas temen gue teriak panik, teksnya gue kasih warna Kuning, sedangkan omongan gue Hijau Zamrud. Penonton langsung nangkep siapa yang lagi nyalahin siapa tanpa mikir keras.',
          'Awas Safe Area: Jangan taruh subtitle terlalu mepet ke bawah atau kanan layar, karena bakal ketutup tombol Like, Kolom Komentar, dan judul video di aplikasi HP.'
        ]
      },
      {
        type: 'heading',
        title: '5. Garis Finishnya: Bikin Template Biar Gak Capek Berulang Kali'
      },
      {
        type: 'paragraph',
        text: 'Kunci biar kita konsisten bikin konten bukan kerja keras ngedit dari nol setiap hari sampai begadang, tapi punya sistem kerja yang efisien. Begitu kamu nemu rasio posisi webcam dan gameplay yang udah pas, simpan layout itu jadi template baku.'
      },
      {
        type: 'paragraph',
        text: 'Besok-besok kalau abis streaming, kamu tinggal tarik cuplikan seru ke dalam template, cek sinkronisasi audio, dan ekspor. Dari 1 sesi main game santai 2 jam, kamu bisa dapet 5 sampai 10 klip yang siap menghibur orang sepanjang minggu.'
      },
      {
        type: 'conclusion',
        text: 'Bikin konten pada akhirnya adalah soal membagikan keseruan yang kita rasain ke orang lain. Kalau prosesnya simpel dan hasilnya rapi, kita yang bikin seneng, yang nonton juga ikut ketawa lepas.'
      }
    ]
  },
  {
    id: 'merancang-dashboard-hcis-tanpa-bikin-pusing',
    slug: 'merancang-dashboard-hcis-tanpa-bikin-pusing',
    title: 'Cerita Merancang Dashboard HR Enterprise Biar Karyawan Gak Mau Nangis Buka Absensi',
    category: 'Desain Produk',
    readTime: '5 min baca',
    date: '08 Oktober 2026',
    author: {
      name: 'Niskenadi Trisna',
      role: 'Product Designer & Design Systems',
      avatar: '/profile.png'
    },
    excerpt: 'Software HR kantor biasanya terkenal kaku, abu-abu, dan mirip file Excel tahun 2005. Ini cerita di balik layar gimana gue merapikan ribuan data payroll dan absensi jadi antarmuka yang ramah manusia.',
    tags: ['UI/UX Design', 'Enterprise SaaS', 'Design Systems', 'HCIS', 'Human Centered'],
    content: [
      {
        type: 'intro',
        text: 'Jujur deh, pernah gak kamu ngerasa mau ngajuin cuti atau ngecek slip gaji di aplikasi kantor, tapi baru buka halaman depannya aja udah pusing duluan? Tombolnya numpuk, tabelnya penuh kode aneh, dan warnanya serba abu-abu kusam mirip Excel era Windows 98.'
      },
      {
        type: 'paragraph',
        text: 'Waktu dapet tanggung jawab mendesain platform Human Capital Information System (HCIS) untuk ribuan karyawan, tantangan terbesarnya bukan cuma bikin tampilannya estetik. Tantangan aslinya adalah: gimana bikin sistem yang rumit ini gak bikin orang stres saat dipakai kerja tiap hari.'
      },
      {
        type: 'heading',
        title: '1. Jangan Suguhkan Semua Data Sekaligus'
      },
      {
        type: 'paragraph',
        text: 'Kesalahan paling sering di aplikasi enterprise adalah rakus nampilin informasi. Database punya 50 parameter, ya 50-50-nya dijejelin ke layar depan. Padahal waktu seorang manajer buka dashboard di pagi hari, dia cuma butuh tahu 3 hal mendesak: ada approval cuti gak, ada anomali absensi gak, dan status payroll bulan ini aman gak.'
      },
      {
        type: 'paragraph',
        text: 'Solusinya: taruh 3 hal kritis ini di bagian paling atas dengan kartu berangka besar yang jelas. Data detail lainnya cukup disembunyikan satu klik di dalam, bukan dihamburkan di pintu masuk.'
      },
      {
        type: 'heading',
        title: '2. Navigasi Log Pose: Selalu Tahu Sedang Berada di Mana'
      },
      {
        type: 'paragraph',
        text: 'Sama seperti metafora kompas Log Pose yang gue pakai di portofolio ini: navigasi yang baik itu gak boleh bikin orang tersesat di tengah samudra menu. Alih-alih mengelompokkan menu berdasarkan struktur departemen kantor yang birokratis, kelompokkan berdasarkan alur tugas nyata yang biasa dikerjakan manusia.'
      },
      {
        type: 'conclusion',
        text: 'Desain produk yang baik pada akhirnya bukan yang grafiknya paling ramai, tapi yang paling cepat membantu orang menyelesaikan urusan kerjanya—supaya mereka bisa menutup laptop dan pulang kumpul bareng keluarga tepat waktu.'
      }
    ]
  }
];

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug || a.id === slug);
}
