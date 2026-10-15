import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../data/articles';

export default function ArticleDetail({ article, onBack, onSelectArticle }) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const otherArticles = ARTICLES.filter(a => a.id !== article.id);

  const handleShare = () => {
    const url = `${window.location.origin}/articles/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <article className="article-reader-container">
      {/* Top Navigation Bar */}
      <div className="article-reader-topbar">
        <button 
          type="button"
          onClick={onBack} 
          className="btn-article-back"
          aria-label="Kembali ke daftar artikel"
        >
          <span>←</span>
          <span>Kembali ke Logbook</span>
        </button>

        <button 
          type="button"
          onClick={handleShare} 
          className="btn-article-share"
          aria-label="Bagikan artikel"
        >
          <span>{copied ? '✓ Link Tersalin!' : '🔗 Bagikan'}</span>
        </button>
      </div>

      {/* Article Header */}
      <motion.header 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="article-header"
      >
        <div className="article-meta-badges">
          <span className="article-category-badge">{article.category}</span>
          <span className="article-time-badge">⏱ {article.readTime}</span>
          <span className="article-date-badge">📅 {article.date}</span>
        </div>

        <h1 className="article-title">{article.title}</h1>

        <div className="article-author-card">
          <img 
            src={article.author.avatar} 
            alt={article.author.name} 
            className="article-author-avatar" 
          />
          <div className="article-author-info">
            <span className="article-author-name">{article.author.name}</span>
            <span className="article-author-role">{article.author.role}</span>
          </div>
        </div>
      </motion.header>

      {/* Article Body */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="article-body"
      >
        {article.content.map((block, idx) => {
          if (block.type === 'intro') {
            return (
              <p key={idx} className="article-intro-text">
                {block.text}
              </p>
            );
          }
          if (block.type === 'paragraph') {
            return (
              <p key={idx} className="article-paragraph">
                {block.text}
              </p>
            );
          }
          if (block.type === 'heading') {
            return (
              <h2 key={idx} className="article-heading-2">
                {block.title}
              </h2>
            );
          }
          if (block.type === 'list') {
            return (
              <ul key={idx} className="article-list">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="article-list-item">
                    <span className="list-bullet">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === 'callout') {
            return (
              <div key={idx} className="article-callout-box">
                <h4 className="callout-title">{block.title}</h4>
                <p className="callout-text">{block.text}</p>
              </div>
            );
          }
          if (block.type === 'conclusion') {
            return (
              <div key={idx} className="article-conclusion-box">
                <span className="conclusion-badge">Ringkasan Inti</span>
                <p className="conclusion-text">{block.text}</p>
              </div>
            );
          }
          return null;
        })}

        {/* Tags Row */}
        <div className="article-tags-row">
          <span className="tags-label">Topik:</span>
          {article.tags.map(tag => (
            <span key={tag} className="article-tag-chip">#{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Bottom Footer Actions */}
      <div className="article-bottom-actions">
        <button 
          type="button"
          onClick={onBack} 
          className="btn-back-primary"
        >
          ← Kembali ke Semua Artikel
        </button>
        <button 
          type="button"
          onClick={handleShare} 
          className="btn-share-secondary"
        >
          {copied ? 'Tautan Berhasil Disalin!' : 'Bagikan Artikel Ini ↗'}
        </button>
      </div>

      {/* Recommended Next Read */}
      {otherArticles.length > 0 && (
        <div style={{ marginTop: '56px', paddingTop: '36px', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Rekomendasi Catatan Lainnya
          </span>
          <div style={{ marginTop: '16px' }}>
            {otherArticles.map(other => (
              <div 
                key={other.id}
                onClick={() => onSelectArticle(other)}
                className="article-home-card group cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                <div className="article-home-meta">
                  <span className="article-category-badge">{other.category}</span>
                  <span className="font-mono text-xs text-neutral-400">⏱ {other.readTime}</span>
                </div>
                <h3 className="article-home-title">{other.title}</h3>
                <p className="article-home-excerpt">{other.excerpt}</p>
                <div className="article-home-footer">
                  <span className="font-mono text-xs text-neutral-500">{other.date}</span>
                  <span className="btn-read-link">
                    <span>Baca Catatan Ini</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
