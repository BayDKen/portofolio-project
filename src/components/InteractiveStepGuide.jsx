import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const STEP_DATA = [
  {
    step: 1,
    id: 'waveform',
    tabTitle: '01. Waveform AI',
    title: 'Deteksi Momen Otomatis Melalui Lonjakan Waveform & Transkrip',
    category: 'Audio Intelligence & Hook Discovery',
    badge: 'Step 01 / 05',
    image: '/assets/article-step1-waveform.jpg',
    alt: 'Visualisasi Analisis Waveform Audio dan Deteksi Momen Puncak',
    summary: 'Memindai rekaman siaran langsung berdurasi 2–3 jam dalam waktu di bawah satu menit. AI mendeteksi lonjakan amplitudo suara (teriakan, tawa lepas) dan memadukannya dengan transkripsi teks untuk memotong video tepat pada "The Hook" (3 detik pertama).',
    specs: [
      { label: 'Deteksi Lonjakan', val: 'Amplitudo > -6 dB' },
      { label: 'Model Transkripsi', val: 'Whisper AI Speech-to-Text' },
      { label: 'Target Hook', val: 'Detik 0.00 – 0.03' }
    ],
    samples: [
      {
        id: 'sample1',
        time: '00:14:22',
        label: 'Reaksi Kaget Creeper',
        db: '95 dB',
        confidence: '99%',
        hookQuote: '"EH KAGET BANGET, CREEPER MUNCUL DARI MANA COBA?!"',
        soundWaveColor: '#34D399'
      },
      {
        id: 'sample2',
        time: '00:42:15',
        label: 'Momen Clutch Fail',
        db: '98 dB',
        confidence: '97%',
        hookQuote: '"SATU HIT LAGI BRO, TIDAK MUNGKIN KALAH DI SINI!"',
        soundWaveColor: '#F59E0B'
      },
      {
        id: 'sample3',
        time: '01:18:05',
        label: 'Tawa Lepas Bareng Teman',
        db: '92 dB',
        confidence: '95%',
        hookQuote: '"HAHAHAHA KENAPA LO MALAH LOMPAT KE LAHAR?!"',
        soundWaveColor: '#C084FC'
      }
    ]
  },
  {
    step: 2,
    id: 'stacked-layout',
    tabTitle: '02. Stacked 9:16',
    title: 'Rekonstruksi Tata Letak Vertikal 9:16 (Stacked Architecture)',
    category: 'Mobile Canvas Composition',
    badge: 'Step 02 / 05',
    image: '/assets/article-step2-layout.jpg',
    alt: 'Blueprint Arsitektur Tata Letak Vertikal 9:16 (Stacked Layout)',
    summary: 'Mengubah format rekaman 16:9 horizontal menjadi video vertikal 9:16 tanpa mendistorsi rasio aspek. Membagi bidang layar secara matematis: 65% atas untuk aksi gameplay dan 35% bawah untuk ekspresi wajah streamer.',
    specs: [
      { label: 'Rasio Kanvas', val: '9:16 (1080 x 1920 px)' },
      { label: 'Porsi Gameplay', val: '65% (1248 px atas)' },
      { label: 'Porsi Facecam', val: '35% (672 px bawah)' }
    ],
    layoutModes: [
      {
        id: 'stacked',
        name: 'Stacked 65/35 (Rekomendasi AI)',
        desc: 'Gameplay & webcam tampil utuh, proporsional, tanpa bagian penting yang terpotong.',
        isOptimal: true
      },
      {
        id: 'stretch',
        name: 'Peregangan 16:9 (Distorsi Gepeng)',
        desc: 'Gambar dipaksa memanjang vertikal, membuat karakter dan wajah gepeng tidak natural.',
        isOptimal: false
      },
      {
        id: 'centercrop',
        name: 'Center Crop Biasa (Hilang Wajah)',
        desc: 'Hanya mengambil bagian tengah gameplay; webcam di sudut kanan/kiri hilang total.',
        isOptimal: false
      }
    ]
  },
  {
    step: 3,
    id: 'sharpening',
    tabTitle: '03. Penajaman CAS',
    title: 'Optimalisasi Ketajaman Gambar Pasca-Cropping (Lanczos & CAS)',
    category: 'Visual Fidelity & Resolution Recovery',
    badge: 'Step 03 / 05',
    image: '/assets/article-step3-sharpening.jpg',
    alt: 'Komparasi Kualitas Gambar: Bilinear Crop vs Lanczos + FidelityFX CAS',
    summary: 'Proses pembesaran crop ke vertikal biasanya mengorbankan ketajaman piksel. Dengan mengombinasikan filter Lanczos 8-tap, Contrast Adaptive Sharpening (CAS), dan bitrate 14–16 Mbps, teks HUD serta tekstur wajah tetap tajam saat diunggah ke YouTube.',
    specs: [
      { label: 'Algoritma Scaling', val: 'Lanczos 8-Tap Filtering' },
      { label: 'Filter Adaptif', val: 'AMD FidelityFX CAS' },
      { label: 'Target Bitrate', val: '14 – 16 Mbps VBR' }
    ],
    qualityModes: [
      {
        id: 'enhanced',
        name: 'AI Lanczos + CAS Enhanced',
        badge: '16.0 Mbps Ultra-Crisp',
        details: 'Garis tepi teks jernih, tekstur kulit alami, tanpa artefak blur kompresi.',
        clarity: '100% (Crisp 4K-Feel)'
      },
      {
        id: 'standard',
        name: 'Standar Bilinear Crop',
        badge: '6.0 Mbps Default',
        details: 'Garis tepi buram, teks HUD gim sulit dibaca, detail wajah kabur.',
        clarity: '52% (Blurry)'
      }
    ]
  },
  {
    step: 4,
    id: 'subtitles',
    tabTitle: '04. Subtitle & Safe Zone',
    title: 'Penyelarasan Subtitle Dinamis & Kepatuhan Safe Area Shorts',
    category: 'Kinetic Typography & Mobile UI Constraints',
    badge: 'Step 04 / 05',
    image: '/assets/article-step4-subtitles.jpg',
    alt: 'Penyelarasan Subtitle Dinamis dan Zonasi Safe Area YouTube Shorts',
    summary: 'Penempatan subtitle kinetik yang disinkronkan pada level milidetik. Pembedaan warna teks per pembicara memastikan penonton memahami dialog, sementara penempatan di zona aman (safe area) mencegah teks tertutup tombol antarmuka YouTube Shorts.',
    specs: [
      { label: 'Presisi Audio Sync', val: '±20 Milidetik' },
      { label: 'Warna Pembicara', val: 'Host: Emerald | Tamu: Emas' },
      { label: 'Margin Safe Area', val: 'Bawah: 140px | Kanan: 90px' }
    ],
    speakerColors: [
      { role: 'Host Utama', color: '#34D399', text: '"Lihat trik ini, kita lompat langsung ke tebing!"' },
      { role: 'Rekan Tamu', color: '#FBBF24', text: '"Awas jangan salah injak, nanti jatuh ke air!"' },
      { role: 'Sound Effect / Highlight', color: '#C084FC', text: '*[Suara Ledakan & Teriakan Kaget]*' }
    ]
  },
  {
    step: 5,
    id: 'batch',
    tabTitle: '05. Otomasi Batch',
    title: 'Eksekusi Skala Otomatis Google Antigravity Agent (Batch Processing)',
    category: 'Autonomous Multi-Agent Pipeline',
    badge: 'Step 05 / 05',
    image: '/assets/article-step5-pipeline.jpg',
    alt: 'Alur Kerja Otomasi Batch Processing Google Antigravity Agent',
    summary: 'Setelah konfigurasi satu klip diverifikasi, Google Antigravity menjalankan pemrosesan paralel otomatis. Dari 1 file rekaman panjang, sistem mengekspor 10 klip siap tayang lengkap dengan thumbnail, caption, dan tag dalam hitungan menit.',
    specs: [
      { label: 'Kecepatan Proses', val: '10 Shorts / ~4 Menit' },
      { label: 'Akselerasi GPU', val: 'FFmpeg NVENC Hardware' },
      { label: 'Orkestrasi', val: 'Antigravity Autonomous Pipeline' }
    ]
  }
];

export default function InteractiveStepGuide({ onOpenLightbox }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEP_DATA[activeStepIndex];

  // Step 1 State: Active Audio Sample
  const [selectedSample, setSelectedSample] = useState(activeStep.samples ? activeStep.samples[0] : null);

  // Step 2 State: Layout Mode
  const [selectedLayout, setSelectedLayout] = useState('stacked');

  // Step 3 State: Quality Mode
  const [selectedQuality, setSelectedQuality] = useState('enhanced');

  // Step 4 State: Safe Area overlay toggle
  const [showSafeArea, setShowSafeArea] = useState(true);

  // Step 5 State: Batch simulation state
  const [simRunning, setSimRunning] = useState(false);
  const [simProgress, setSimProgress] = useState(100);
  const [simCompletedCount, setSimCompletedCount] = useState(10);

  // Keep selectedSample in sync when tab changes to step 1
  useEffect(() => {
    if (activeStep.step === 1 && !selectedSample) {
      setSelectedSample(activeStep.samples[0]);
    }
  }, [activeStep, selectedSample]);

  const runBatchSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimProgress(0);
    setSimCompletedCount(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSimProgress(progress);
      setSimCompletedCount(Math.min(10, Math.floor(progress / 10)));
      if (progress >= 100) {
        clearInterval(interval);
        setSimRunning(false);
      }
    }, 280);
  };

  return (
    <div className="interactive-guide-wrapper">
      {/* Header Widget */}
      <div className="guide-header">
        <div className="guide-header-badge">
          <span className="pulse-indicator"></span>
          <span>Interactive Visual Documentation</span>
        </div>
        <h3 className="guide-main-title">
          Panduan Interaktif Alur Kerja Pembuatan Klip dengan AI
        </h3>
        <p className="guide-main-desc">
          Jelajahi setiap tahapan metodologi secara visual. Klik setiap langkah di bawah untuk memeriksa dokumentasi arsitektur, parameter teknis, dan simulasi interaktifnya.
        </p>
      </div>

      {/* Step Tabs Navigation */}
      <div className="guide-tabs-bar" role="tablist">
        {STEP_DATA.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveStepIndex(idx)}
              className={`guide-tab-btn ${isActive ? 'active' : ''}`}
            >
              <span className="guide-tab-step-num">{`0${step.step}`}</span>
              <span className="guide-tab-label">{step.tabTitle.replace(/^[0-9]+\.\s*/, '')}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator" 
                  className="guide-tab-active-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Display Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="guide-content-panel"
        >
          {/* Step Meta Banner */}
          <div className="guide-meta-banner">
            <div>
              <div className="guide-step-tag">
                <span className="step-badge-text">{activeStep.badge}</span>
                <span className="step-category-text">{activeStep.category}</span>
              </div>
              <h4 className="guide-step-title">{activeStep.title}</h4>
            </div>

            {/* Quick Action: Open Full Lightbox */}
            <button
              type="button"
              onClick={() => onOpenLightbox(activeStep.image, activeStep.title, activeStep.summary, activeStep.step)}
              className="btn-open-lightbox"
              title="Perbesar gambar dokumentasi ke ukuran penuh"
            >
              <span className="btn-icon">🔍</span>
              <span>Perbesar Dokumentasi</span>
            </button>
          </div>

          <p className="guide-step-summary">{activeStep.summary}</p>

          {/* Technical Specifications Pills */}
          <div className="guide-specs-row">
            {activeStep.specs.map((spec, i) => (
              <div key={i} className="spec-pill">
                <span className="spec-label">{spec.label}:</span>
                <span className="spec-val">{spec.val}</span>
              </div>
            ))}
          </div>

          {/* Two-Column Grid: Visual Documentation (Left) & Interactive Playground (Right) */}
          <div className="guide-showcase-grid">
            {/* Left: High-Resolution Visual Documentation */}
            <div className="guide-visual-container">
              <div 
                className="guide-image-frame"
                onClick={() => onOpenLightbox(activeStep.image, activeStep.title, activeStep.summary, activeStep.step)}
              >
                <img
                  src={activeStep.image}
                  alt={activeStep.alt}
                  className="guide-showcase-image"
                  loading="lazy"
                />
                <div className="image-hover-overlay">
                  <span className="overlay-pill">🔍 Klik untuk Tampilan Layar Penuh</span>
                </div>
              </div>
              <div className="guide-image-footer">
                <span className="footer-doc-label">Dokumentasi Arsitektur {activeStep.badge}</span>
                <span className="footer-status-pill">● Verified by Antigravity AI</span>
              </div>
            </div>

            {/* Right: Step-Specific Interactive Simulation */}
            <div className="guide-interactive-container">
              {/* STEP 1: Interactive Waveform & Hook Picker */}
              {activeStep.step === 1 && (
                <div className="interactive-submodule">
                  <div className="submodule-header">
                    <span className="submodule-badge">Simulator Deteksi Audio</span>
                    <h5 className="submodule-title">Pilih Sampel Deteksi Momen AI:</h5>
                  </div>

                  <div className="sample-list">
                    {activeStep.samples.map(sample => {
                      const isSampleActive = selectedSample?.id === sample.id;
                      return (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => setSelectedSample(sample)}
                          className={`sample-item-btn ${isSampleActive ? 'active' : ''}`}
                        >
                          <div className="sample-time-badge">{sample.time}</div>
                          <div className="sample-info">
                            <span className="sample-label">{sample.label}</span>
                            <span className="sample-stats">Spike: {sample.db} • Confidence: {sample.confidence}</span>
                          </div>
                          {isSampleActive && <span className="sample-check">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {selectedSample && (
                    <div className="sample-preview-card">
                      <div className="preview-sound-bars">
                        {[40, 75, 55, 95, 100, 85, 90, 60, 45, 80, 95, 70, 50, 90, 100, 85, 60].map((h, idx) => (
                          <div
                            key={idx}
                            className="wave-bar"
                            style={{
                              height: `${h}%`,
                              backgroundColor: idx >= 3 && idx <= 7 ? selectedSample.soundWaveColor : 'rgba(255,255,255,0.2)'
                            }}
                          />
                        ))}
                      </div>
                      <div className="hook-quote-box">
                        <span className="hook-tag">3-Second Hook Terdeteksi:</span>
                        <p className="hook-text">{selectedSample.hookQuote}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Interactive Stacked Layout Selector */}
              {activeStep.step === 2 && (
                <div className="interactive-submodule">
                  <div className="submodule-header">
                    <span className="submodule-badge">Simulator Komposisi Kanvas</span>
                    <h5 className="submodule-title">Bandingkan Format Rasio Tampilan:</h5>
                  </div>

                  <div className="layout-modes-list">
                    {activeStep.layoutModes.map(mode => {
                      const isModeActive = selectedLayout === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedLayout(mode.id)}
                          className={`layout-mode-btn ${isModeActive ? 'active' : ''} ${mode.isOptimal ? 'optimal' : ''}`}
                        >
                          <div className="mode-btn-header">
                            <span className="mode-title">{mode.name}</span>
                            {mode.isOptimal && <span className="optimal-badge">Recommended</span>}
                          </div>
                          <p className="mode-desc">{mode.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Simulated Mobile Mockup Wireframe */}
                  <div className="mobile-mockup-wireframe">
                    <div className="mockup-screen-ratio">
                      {selectedLayout === 'stacked' && (
                        <div className="wireframe-stacked">
                          <div className="stacked-top-area">
                            <span>🎮 Gameplay Area (65% Layar)</span>
                          </div>
                          <div className="stacked-divider-line">
                            <span>0px Zero-Margin Seamless Split</span>
                          </div>
                          <div className="stacked-bottom-area">
                            <span>🎙️ Facecam & Ekspresi (35% Layar)</span>
                          </div>
                        </div>
                      )}

                      {selectedLayout === 'stretch' && (
                        <div className="wireframe-stretched">
                          <div className="stretched-warning">
                            ⚠️ Distorsi Rasio Aspek (Gambar Gepeng & Terkompresi Vertikal)
                          </div>
                        </div>
                      )}

                      {selectedLayout === 'centercrop' && (
                        <div className="wireframe-centercrop">
                          <div className="crop-top">Gameplay Tengah Saja</div>
                          <div className="crop-warning">
                            ❌ Kamera Wajah Streamer Terpotong & Hilang
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Interactive Quality & CAS Comparison */}
              {activeStep.step === 3 && (
                <div className="interactive-submodule">
                  <div className="submodule-header">
                    <span className="submodule-badge">Komparasi Ketajaman Gambar</span>
                    <h5 className="submodule-title">Pilih Mode Pemrosesan Grafis:</h5>
                  </div>

                  <div className="quality-toggle-row">
                    {activeStep.qualityModes.map(mode => {
                      const isQActive = selectedQuality === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedQuality(mode.id)}
                          className={`quality-btn ${isQActive ? 'active' : ''}`}
                        >
                          <span className="quality-name">{mode.name}</span>
                          <span className="quality-badge">{mode.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="quality-display-box">
                    <div className="quality-metric-row">
                      <div className="metric-cell">
                        <span className="metric-label">Tingkat Kejelasan:</span>
                        <span className="metric-value emerald">
                          {selectedQuality === 'enhanced' ? '100% (Ultra-Crisp 4K)' : '52% (Pixel Blurry)'}
                        </span>
                      </div>
                      <div className="metric-cell">
                        <span className="metric-label">Target Bitrate:</span>
                        <span className="metric-value">
                          {selectedQuality === 'enhanced' ? '15.2 Mbps VBR' : '6.0 Mbps Default'}
                        </span>
                      </div>
                      <div className="metric-cell">
                        <span className="metric-label">PSNR Score:</span>
                        <span className="metric-value">
                          {selectedQuality === 'enhanced' ? '43.2 dB (High Fidelity)' : '29.4 dB (Degraded)'}
                        </span>
                      </div>
                    </div>

                    <div className="quality-annotation">
                      <p>
                        {selectedQuality === 'enhanced'
                          ? '✦ Hasil Lanczos 8-Tap + CAS: Detail teks inventaris game, indikator HP, dan garis ekspresi wajah streamer tetap tajam tanpa artefak artefak pembesaran.'
                          : '✦ Hasil Bilinear Biasa: Menghasilkan gambar kabur dengan tepian buram akibat pemotongan resolusi tinggi tanpa penajaman adaptif.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Interactive Safe Area & Speaker Colors */}
              {activeStep.step === 4 && (
                <div className="interactive-submodule">
                  <div className="submodule-header">
                    <span className="submodule-badge">Simulator Safe Area Shorts</span>
                    <h5 className="submodule-title">Uji Penempatan Subtitle Dinamis:</h5>
                  </div>

                  <div className="safe-area-controls">
                    <label className="safe-toggle-label">
                      <input
                        type="checkbox"
                        checked={showSafeArea}
                        onChange={e => setShowSafeArea(e.target.checked)}
                        className="safe-checkbox"
                      />
                      <span>Tampilkan Panduan Safe Area UI YouTube Shorts</span>
                    </label>
                  </div>

                  {/* Phone Simulator Frame with Overlay */}
                  <div className="phone-screen-simulator">
                    <div className="simulator-canvas">
                      {/* Video Content Background */}
                      <div className="sim-video-bg">
                        <span>Video Klip 9:16</span>
                      </div>

                      {/* Right-Side UI Buttons Overlay */}
                      <div className={`shorts-ui-right ${showSafeArea ? 'highlight-danger' : ''}`}>
                        <div className="ui-icon-btn">❤️</div>
                        <div className="ui-icon-btn">💬</div>
                        <div className="ui-icon-btn">↗️</div>
                        <div className="ui-icon-btn">🎵</div>
                      </div>

                      {/* Bottom Audio Title Overlay */}
                      <div className={`shorts-ui-bottom ${showSafeArea ? 'highlight-danger' : ''}`}>
                        <span>🎵 Original Audio - Live Stream #42</span>
                      </div>

                      {/* Dynamic Subtitle Box in Safe Center */}
                      <div className="sim-subtitle-container">
                        <span className="subtitle-speaker-badge" style={{ backgroundColor: '#34D399', color: '#000' }}>
                          Host
                        </span>
                        <p className="sim-subtitle-text" style={{ color: '#34D399' }}>
                          "Lihat trik ini, kita lompat langsung ke tebing!"
                        </p>
                      </div>

                      {/* Safe Area Warning Overlay */}
                      {showSafeArea && (
                        <div className="safe-area-box-guideline">
                          <span className="guideline-badge">✓ Clean Safe Area (Bebas Halangan Tombol)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Speaker Color Coding Legend */}
                  <div className="speaker-legend-row">
                    <div className="legend-chip">
                      <span className="legend-dot" style={{ backgroundColor: '#34D399' }}></span>
                      <span>Host: Hijau Emerald</span>
                    </div>
                    <div className="legend-chip">
                      <span className="legend-dot" style={{ backgroundColor: '#FBBF24' }}></span>
                      <span>Tamu: Kuning Gold</span>
                    </div>
                    <div className="legend-chip">
                      <span className="legend-dot" style={{ backgroundColor: '#C084FC' }}></span>
                      <span>SFX: Ungu Aksentuasi</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Interactive Antigravity Batch Console */}
              {activeStep.step === 5 && (
                <div className="interactive-submodule">
                  <div className="submodule-header">
                    <span className="submodule-badge">Konsol Orkestrasi AI</span>
                    <h5 className="submodule-title">Google Antigravity Batch Runner:</h5>
                  </div>

                  {/* Simulated Terminal Console */}
                  <div className="batch-terminal-box">
                    <div className="terminal-topbar">
                      <span className="terminal-dot red"></span>
                      <span className="terminal-dot yellow"></span>
                      <span className="terminal-dot green"></span>
                      <span className="terminal-title">antigravity-pipeline --batch-shorts</span>
                    </div>

                    <div className="terminal-body">
                      <p className="term-line prompt">$ agy process-stream --source=stream_01.mp4 --preset=stacked-9x16</p>
                      <p className="term-line success">✓ 10 Highlight spikes terdeteksi (Waktu rata-rata 35s per klip)</p>
                      <p className="term-line success">✓ Subtitle whisper multi-speaker tersinkronisasi</p>
                      <p className="term-line info">
                        {simRunning 
                          ? `> Rendering Klip [${simCompletedCount}/10] dengan akselerasi NVENC GPU...`
                          : `✓ Seluruh 10 klip YouTube Shorts selesai diekspor (Total waktu: 3m 48s)`
                        }
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="terminal-progress-wrapper">
                      <div className="progress-info-row">
                        <span>Status Batch Pipeline:</span>
                        <span className="progress-percentage">{simProgress}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${simProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="batch-action-row">
                    <button
                      type="button"
                      onClick={runBatchSimulation}
                      disabled={simRunning}
                      className="btn-run-simulation"
                    >
                      {simRunning ? 'Sedang Memproses 10 Klip...' : '⚡ Jalankan Ulang Simulasi Batch Pipeline'}
                    </button>
                    <span className="batch-time-info">
                      Penghematan waktu manual: <strong>~4 jam kerja</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
