import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  YOUTUBE_CHANNEL, 
  YOUTUBE_CATEGORIES, 
  YOUTUBE_VIDEOS, 
  getYouTubeThumbnail, 
  getYouTubeEmbedUrl 
} from '../data/youtube';

export default function YoutubePage({ onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredVideos = YOUTUBE_VIDEOS.filter(video => {
    const matchesCategory = selectedCategory === 'Semua' || video.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      video.title.toLowerCase().includes(q) ||
      video.game.toLowerCase().includes(q) ||
      video.description.toLowerCase().includes(q) ||
      video.tags.some(tag => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const featuredVideo = YOUTUBE_VIDEOS.find(v => v.featured) || YOUTUBE_VIDEOS[0];

  return (
    <div className="youtube-page-wrapper">
      <div className="container">
        
        {/* 1. Top Breadcrumb & Return to Portfolio */}
        <div className="articles-top-nav">
          <button 
            type="button" 
            onClick={onBackToHome} 
            className="btn-return-home"
            aria-label="Kembali ke Halaman Utama"
          >
            <span>←</span>
            <span>Kembali ke Halaman Utama</span>
          </button>

          <span className="domain-indicator font-mono">
            https://www.niskenadi.com/streams
          </span>
        </div>

        {/* 2. Channel Profile Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="channel-hero-card"
        >
          <div className="channel-hero-content">
            <div className="channel-avatar-box">
              <div className="channel-avatar-circle">
                <span className="channel-avatar-icon">▶</span>
              </div>
              <span className="live-status-dot" title="Channel Active" />
            </div>

            <div className="channel-info-box">
              <div className="channel-badges-row">
                <span className="pill-badge active-status">
                  <span className="nav-brand-dot" /> YouTube Channel
                </span>
                <span className="pill-badge">{YOUTUBE_CHANNEL.badge}</span>
                <span className="pill-badge font-mono">ID: {YOUTUBE_CHANNEL.handle}</span>
              </div>

              <h1 className="channel-title">
                {YOUTUBE_CHANNEL.name} <span className="channel-handle">{YOUTUBE_CHANNEL.handle}</span>
              </h1>

              <p className="channel-bio">
                {YOUTUBE_CHANNEL.bio}
              </p>

              <div className="channel-cta-row">
                <a 
                  href={YOUTUBE_CHANNEL.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="yt-primary-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Buka di YouTube</span>
                  <span className="arrow">↗</span>
                </a>

                <a 
                  href={`${YOUTUBE_CHANNEL.url}?sub_confirmation=1`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="yt-secondary-btn"
                >
                  <span>🔔 Subscribe</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Featured Broadcast Spotlight */}
        {featuredVideo && !searchQuery && selectedCategory === 'Semua' && (
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="yt-spotlight-section"
          >
            <div className="section-label-bar">
              <span className="pill-badge">Highlight Siaran</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Featured Stream Spotlight
              </span>
            </div>

            <div className="spotlight-card">
              <div 
                className="spotlight-media" 
                onClick={() => setActiveVideo(featuredVideo)}
                role="button"
                tabIndex={0}
                aria-label={`Putar ${featuredVideo.title}`}
                onKeyDown={(e) => e.key === 'Enter' && setActiveVideo(featuredVideo)}
              >
                <img 
                  src={getYouTubeThumbnail(featuredVideo.id, 'maxresdefault')}
                  alt={featuredVideo.title}
                  onError={(e) => {
                    e.currentTarget.src = getYouTubeThumbnail(featuredVideo.id, 'hqdefault');
                  }}
                  className="spotlight-img"
                  loading="eager"
                />
                <div className="spotlight-overlay">
                  <div className="yt-play-button-glow">
                    <span className="yt-play-icon">▶</span>
                  </div>
                  <span className="spotlight-hover-tip">Klik untuk Memutar Langsung</span>
                </div>
                <div className="spotlight-badge-corner">
                  <span className="live-pill">🔴 FEATURED VOD</span>
                </div>
              </div>

              <div className="spotlight-content">
                <div className="spotlight-meta-row">
                  <span className="game-badge">{featuredVideo.game}</span>
                  <span className="date-badge font-mono">{featuredVideo.date}</span>
                </div>

                <h2 className="spotlight-title">{featuredVideo.title}</h2>
                <p className="spotlight-desc">{featuredVideo.description}</p>

                <div className="spotlight-tags-row">
                  {featuredVideo.tags.map(t => (
                    <span key={t} className="card-tag-chip">#{t}</span>
                  ))}
                </div>

                <div className="spotlight-actions">
                  <button 
                    type="button" 
                    onClick={() => setActiveVideo(featuredVideo)}
                    className="btn-play-spotlight"
                  >
                    <span>▶ Putar Video di Sini</span>
                  </button>
                  <a 
                    href={`https://www.youtube.com/watch?v=${featuredVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-watch-yt"
                  >
                    <span>Tonton di YouTube</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. Filter & Search Toolbar */}
        <div className="yt-toolbar">
          <div className="category-pills-row">
            {YOUTUBE_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari game (L4D2, The Forest, Chained Together...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="article-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')} 
                className="search-clear-btn"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Count summary */}
        <div className="yt-count-row">
          <span className="font-mono text-muted" style={{ fontSize: '0.8rem' }}>
            Menampilkan {filteredVideos.length} konten {selectedCategory !== 'Semua' ? `kategori ${selectedCategory}` : ''}
          </span>
        </div>

        {/* 5. Video Grid */}
        <div className="yt-video-grid">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, idx) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="yt-video-card"
              >
                {/* Thumbnail Container */}
                <div 
                  className="yt-thumb-container"
                  onClick={() => setActiveVideo(video)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Putar ${video.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveVideo(video)}
                >
                  <img 
                    src={getYouTubeThumbnail(video.id, 'maxresdefault')}
                    alt={video.title}
                    onError={(e) => {
                      e.currentTarget.src = getYouTubeThumbnail(video.id, 'hqdefault');
                    }}
                    className="yt-thumb-img"
                    loading="lazy"
                  />
                  
                  <div className="yt-thumb-overlay">
                    <div className="yt-card-play-btn">
                      <span>▶</span>
                    </div>
                  </div>

                  <span className="yt-duration-badge font-mono">
                    {video.duration}
                  </span>

                  <span className="yt-game-badge">
                    {video.game}
                  </span>
                </div>

                {/* Card Details */}
                <div className="yt-card-body">
                  <div className="yt-card-meta">
                    <span className="yt-cat-label">{video.category}</span>
                    <span className="font-mono text-muted" style={{ fontSize: '0.75rem' }}>{video.date}</span>
                  </div>

                  <h3 className="yt-card-title" title={video.title}>
                    {video.title}
                  </h3>

                  <p className="yt-card-desc">
                    {video.description}
                  </p>

                  <div className="yt-card-footer">
                    <button 
                      type="button" 
                      onClick={() => setActiveVideo(video)}
                      className="yt-card-play-trigger"
                    >
                      <span>▶ Putar</span>
                    </button>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="yt-card-link-out"
                      title="Buka di YouTube"
                    >
                      <span>YouTube ↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="articles-empty-state">
              <p>Tidak ditemukan video untuk pencarian "{searchQuery}".</p>
              <button 
                type="button" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
                className="btn-reset-filter"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 6. In-Page Interactive YouTube Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div 
            className="video-modal-overlay" 
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div 
              className="video-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="video-modal-header">
                <div className="video-modal-title-info">
                  <span className="game-badge">{activeVideo.game}</span>
                  <span className="date-badge font-mono">{activeVideo.date}</span>
                </div>
                <button 
                  type="button"
                  className="modal-close-btn" 
                  onClick={() => setActiveVideo(null)}
                  aria-label="Tutup pemutar"
                >
                  ×
                </button>
              </div>

              {/* 16:9 Responsive iFrame Player */}
              <div className="video-iframe-container">
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.id, 1)}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="video-iframe"
                />
              </div>

              {/* Video Details in Modal */}
              <div className="video-modal-footer">
                <h2 className="video-modal-headline">{activeVideo.title}</h2>
                <p className="video-modal-description">{activeVideo.description}</p>
                
                <div className="video-modal-actions">
                  <div className="video-modal-tags">
                    {activeVideo.tags.map(tag => (
                      <span key={tag} className="card-tag-chip">#{tag}</span>
                    ))}
                  </div>

                  <a 
                    href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-primary-btn"
                    style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                  >
                    <span>Buka & Komentar di YouTube</span>
                    <span className="arrow">↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
