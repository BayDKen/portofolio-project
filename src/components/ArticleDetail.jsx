import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARTICLES } from '../data/articles';
import InteractiveStepGuide, { STEP_DATA } from './InteractiveStepGuide';

export default function ArticleDetail({ article, onBack, onSelectArticle }) {
  const [copied, setCopied] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const handleShare = () => {
    if (!article) return;
    const url = `${window.location.origin}/articles/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleOpenLightbox = (src, title, caption, stepNumber) => {
    setLightboxImg({ src, title, caption, stepNumber });
  };

  const handleLightboxNav = React.useCallback((direction) => {
    if (!lightboxImg) return;
    const currentIdx = STEP_DATA.findIndex(
      s => s.image === lightboxImg.src || s.step === lightboxImg.stepNumber
    );
    if (currentIdx === -1) return;
    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = STEP_DATA.length - 1;
    if (nextIdx >= STEP_DATA.length) nextIdx = 0;
    const nextStep = STEP_DATA[nextIdx];
    setLightboxImg({
      src: nextStep.image,
      title: nextStep.title,
      caption: nextStep.summary,
      stepNumber: nextStep.step
    });
  }, [lightboxImg]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxImg) return;
      if (e.key === 'Escape') setLightboxImg(null);
      if (e.key === 'ArrowRight') handleLightboxNav(1);
      if (e.key === 'ArrowLeft') handleLightboxNav(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, handleLightboxNav]);

  if (!article) return null;

  const otherArticles = ARTICLES.filter(a => a.id !== article.id);

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
          <span>Kembali ke Daftar Artikel</span>
        </button>

        <button 
          type="button"
          onClick={handleShare} 
          className="btn-article-share"
          aria-label="Salin tautan artikel"
        >
          <span>{copied ? '✓ Tautan Berhasil Disalin!' : '🔗 Salin Tautan'}</span>
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
        {/* Intro text */}
        {article.content
          .filter(b => b.type === 'intro' || b.type === 'paragraph')
          .slice(0, 2)
          .map((b, i) => (
            <p key={i} className={b.type === 'intro' ? 'article-intro-text' : 'article-paragraph'}>
              {b.text}
            </p>
          ))}

        {/* Interactive Step Guide Component (if available) */}
        {article.hasInteractiveGuide && (
          <InteractiveStepGuide onOpenLightbox={handleOpenLightbox} />
        )}

        {/* Detailed Section Content */}
        {article.content
          .filter((b, i) => {
            // Skip the first 2 intro/paragraph blocks because they were rendered above the interactive guide
            if (article.hasInteractiveGuide && (b.type === 'intro' || (b.type === 'paragraph' && i === 1))) {
              return false;
            }
            return true;
          })
          .map((block, idx) => {
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
            if (block.type === 'image') {
              return (
                <figure key={idx} className="article-doc-figure">
                  <div 
                    className="article-doc-image-wrapper"
                    onClick={() => handleOpenLightbox(block.src, block.title, block.caption, parseInt(block.stepNumber, 10))}
                  >
                    <img 
                      src={block.src} 
                      alt={block.alt} 
                      className="article-doc-img"
                      loading="lazy" 
                    />
                    <div className="doc-image-zoom-overlay">
                      <span className="doc-zoom-pill">🔍 Perbesar Tampilan Resolusi Tinggi</span>
                    </div>
                    {block.tag && (
                      <span className="doc-tag-badge">{block.tag}</span>
                    )}
                  </div>
                  <figcaption className="article-doc-caption">
                    <div className="doc-caption-title">{block.title}</div>
                    <p className="doc-caption-desc">{block.caption}</p>
                    {block.specs && block.specs.length > 0 && (
                      <div className="doc-specs-list">
                        {block.specs.map((sp, sIdx) => (
                          <span key={sIdx} className="doc-spec-item">{sp}</span>
                        ))}
                      </div>
                    )}
                  </figcaption>
                </figure>
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
                  <span className="conclusion-badge">Poin Kunci</span>
                  <p className="conclusion-text">{block.text}</p>
                </div>
              );
            }
            return null;
          })}

        {/* Tags Row */}
        <div className="article-tags-row">
          <span className="tags-label">Topik Terkait:</span>
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
          {copied ? '✓ Tautan Berhasil Disalin!' : 'Bagikan Artikel Ini ↗'}
        </button>
      </div>

      {/* Recommended Next Read */}
      {otherArticles.length > 0 && (
        <div style={{ marginTop: '56px', paddingTop: '36px', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Publikasi Terkait Lainnya
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
                    <span>Baca Artikel Ini</span>
                    <span>↗</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="article-lightbox-backdrop"
            onClick={() => setLightboxImg(null)}
          >
            <div 
              className="article-lightbox-modal"
              onClick={e => e.stopPropagation()}
            >
              {/* Lightbox Topbar */}
              <div className="lightbox-topbar">
                <div className="lightbox-title-box">
                  <span className="lightbox-step-badge">
                    Dokumentasi Visual {lightboxImg.stepNumber ? `0${lightboxImg.stepNumber}` : ''}
                  </span>
                  <h3 className="lightbox-title">{lightboxImg.title}</h3>
                </div>

                <div className="lightbox-controls">
                  <span className="lightbox-key-hint">Tekan ESC untuk tutup</span>
                  <button 
                    type="button"
                    onClick={() => setLightboxImg(null)}
                    className="lightbox-btn-close"
                    aria-label="Tutup pratinjau gambar"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Lightbox Image Preview with Nav Arrows */}
              <div className="lightbox-image-stage">
                <button
                  type="button"
                  onClick={() => handleLightboxNav(-1)}
                  className="lightbox-nav-arrow left"
                  aria-label="Dokumentasi sebelumnya"
                >
                  ‹
                </button>

                <img 
                  src={lightboxImg.src} 
                  alt={lightboxImg.title} 
                  className="lightbox-main-img" 
                />

                <button
                  type="button"
                  onClick={() => handleLightboxNav(1)}
                  className="lightbox-nav-arrow right"
                  aria-label="Dokumentasi berikutnya"
                >
                  ›
                </button>
              </div>

              {/* Lightbox Footer Caption */}
              <div className="lightbox-footer">
                <p className="lightbox-caption-text">{lightboxImg.caption}</p>
                <div className="lightbox-counter">
                  Langkah {lightboxImg.stepNumber} dari 5
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
