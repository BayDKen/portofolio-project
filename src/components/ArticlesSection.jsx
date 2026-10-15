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
              Stories & <span className="dim">Behind The Scenes.</span>
            </h2>
            <p className="section-subtitle">
              Kumpulan cerita santai, eksperimen bikin konten, dan catatan lapangan seputar desain produk yang gue pelajari langsung dari praktek nyata.
            </p>
          </div>

          <button 
            type="button"
            onClick={onViewAllArticles}
            className="btn-view-all-articles"
          >
            <span>Buka Logbook Lengkap</span>
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
                  <span>Baca Cerita Ini</span>
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
