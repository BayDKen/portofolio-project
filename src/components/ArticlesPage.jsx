import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../data/articles';

export default function ArticlesPage({ onSelectArticle, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Bikin Konten', 'Desain Produk'];

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="articles-page-wrapper">
      <div className="container">
        
        {/* Top Breadcrumb & Return to Portfolio */}
        <div className="articles-top-nav">
          <button 
            type="button" 
            onClick={onBackToHome} 
            className="btn-return-home"
            aria-label="Kembali ke Portofolio Utama"
          >
            <span>←</span>
            <span>Kembali ke Beranda Portofolio</span>
          </button>

          <span className="domain-indicator font-mono">
            https://www.niskenadi.com/articles
          </span>
        </div>

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="articles-hero-box"
        >
          <div className="eyebrow-pill">
            <span className="nav-brand-dot" />
            <span>THE LOGBOOK • STORIES & FIELD NOTES</span>
          </div>

          <h1 className="articles-main-title">
            Cerita, Eksperimen & <span className="dim">Catatan Lapangan.</span>
          </h1>
          <p className="articles-main-sub">
            Tempat gue mendokumentasikan proses kreatif—mulai dari lika-liku bikin klip Shorts gaming, bedah UI/UX, sampai trik workflow yang bikin hidup lebih gampang. Ditulis dengan bahasa santai dan apa adanya.
          </p>

          {/* Search & Filter Toolbar */}
          <div className="articles-toolbar">
            <div className="category-pills-row">
              {categories.map(cat => (
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
                placeholder="Cari topik cerita (misal: shorts, layout, figma)..."
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
        </motion.div>

        {/* Articles Grid */}
        <div className="articles-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art, idx) => (
              <motion.article 
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => onSelectArticle(art)}
                className="article-card group"
              >
                <div className="article-card-header">
                  <span className="card-cat-badge">{art.category}</span>
                  <span className="card-time-badge font-mono">{art.readTime}</span>
                </div>

                <h2 className="article-card-title">{art.title}</h2>
                <p className="article-card-excerpt">{art.excerpt}</p>

                <div className="article-card-tags">
                  {art.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="card-tag-chip">#{tag}</span>
                  ))}
                </div>

                <div className="article-card-footer">
                  <span className="card-date font-mono">{art.date}</span>
                  <span className="card-read-btn">
                    <span>Baca Cerita</span>
                    <span className="arrow">↗</span>
                  </span>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="articles-empty-state">
              <p>Belum nemu cerita dengan kata kunci "{searchQuery}". Coba cari topik lain yuk.</p>
              <button 
                type="button" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
                className="btn-reset-filter"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
