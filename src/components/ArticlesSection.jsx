import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../data/articles';

export default function ArticlesSection({ onSelectArticle, onViewAllArticles }) {
  const latestArticles = ARTICLES.slice(0, 2);

  return (
    <section id="articles" className="articles-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-row">
          <div>
            <div className="eyebrow-pill">
              <span className="nav-brand-dot" />
              <span>04 • THE LOGBOOK</span>
            </div>
            <h2 className="section-title">
              Articles & <span className="dim">Publications.</span>
            </h2>
            <p className="section-subtitle">
              Dokumentasi metode kerja, pemanfaatan kecerdasan buatan dalam kreasi konten, serta prinsip perancangan antarmuka produk digital.
            </p>
          </div>

          <button 
            type="button"
            onClick={onViewAllArticles}
            className="btn-view-all-articles"
          >
            <span>Buka Seluruh Artikel</span>
            <span>↗</span>
          </button>
        </div>

        {/* Featured Articles Grid */}
        <div className="articles-home-grid">
          {latestArticles.map((art, idx) => (
            <motion.div 
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => onSelectArticle(art)}
              className="article-home-card group cursor-pointer"
            >
              <div className="article-home-meta">
                <span className="article-category-badge">{art.category}</span>
                <span className="font-mono text-xs text-neutral-400">⏱ {art.readTime}</span>
              </div>

              <h3 className="article-home-title">{art.title}</h3>
              <p className="article-home-excerpt">{art.excerpt}</p>

              <div className="article-home-footer">
                <span className="font-mono text-xs text-neutral-500">{art.date}</span>
                <span className="btn-read-link">
                  <span>Baca Artikel Lengkap</span>
                  <span>↗</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
