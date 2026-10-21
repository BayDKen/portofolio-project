import React, { useState, useEffect } from 'react';
import { getCaseStudyById, CASE_STUDIES } from '../data/caseStudies';

export default function CaseStudyDetail({ caseStudy, onBack, onSelectCaseStudy }) {
  const [copied, setCopied] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [caseStudy?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeLightboxImg) {
        setActiveLightboxImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImg]);

  if (!caseStudy) return null;

  const totalMissions = CASE_STUDIES.length.toString().padStart(2, '0');
  const nextProject = caseStudy.nextProjectId 
    ? getCaseStudyById(caseStudy.nextProjectId)
    : null;

  const handleShare = () => {
    const url = `${window.location.origin}/#case-studies/${caseStudy.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <article className="case-study-reader-container">
      {/* 1. Sleek Top Navigation Bar */}
      <header className="case-study-topbar">
        <div className="case-study-topbar-inner">
          <button 
            type="button" 
            className="case-study-back-btn" 
            onClick={onBack}
            aria-label="Back to Log Pose"
          >
            <span className="back-arrow">←</span>
            <span>Back to The Log Pose</span>
          </button>

          <div className="case-study-topbar-meta">
            <span className="pill-badge">
              Mission {caseStudy.num} / {totalMissions}
            </span>
            <span className="pill-badge">
              {caseStudy.category}
            </span>
            {caseStudy.liveUrl && (
              <a 
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-live-pill"
              >
                <span className="nav-brand-dot" />
                <span>Visit Live Platform</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <div className="case-study-hero">
        <div className="case-study-hero-header">
          <div className="hero-eyebrow-row">
            <span className="pill-badge active-status">
              <span className="nav-brand-dot" /> {caseStudy.badge}
            </span>
            <span className="pill-badge">{caseStudy.timeline}</span>
          </div>

          <h1 className="case-study-main-title">{caseStudy.title}</h1>
          <p className="case-study-lead-text">{caseStudy.headline}</p>
          <p className="case-study-sub-text">{caseStudy.tagline}</p>
        </div>

        {/* Project Metadata Ribbon */}
        <div className="case-study-meta-grid">
          <div className="meta-card">
            <span className="meta-card-label">Role</span>
            <span className="meta-card-val">{caseStudy.role}</span>
          </div>
          <div className="meta-card">
            <span className="meta-card-label">Category</span>
            <span className="meta-card-val">{caseStudy.category}</span>
          </div>
          <div className="meta-card">
            <span className="meta-card-label">Timeline</span>
            <span className="meta-card-val">{caseStudy.timeline}</span>
          </div>
          <div className="meta-card">
            <span className="meta-card-label">Deliverables</span>
            <span className="meta-card-val" style={{ fontSize: '0.85rem' }}>
              {caseStudy.deliverables[0]} & {caseStudy.deliverables[1]}
            </span>
          </div>
        </div>
      </div>

      {/* 3. High-Definition System Interface Showcase */}
      <section className="case-study-media-stage">
        <div className="case-study-player-wrap">
          <img 
            src={caseStudy.posterUrl}
            alt={caseStudy.title}
            className="case-study-showcase-img"
            loading="eager"
          />
          <div className="player-overlay-bar">
            <div className="player-badge-group">
              <span className="video-live-pill">
                <span className="live-pulse" /> High Definition Interface Overview
              </span>
            </div>
            <div className="player-controls-group">
              <button 
                type="button" 
                className="player-ctrl-btn" 
                onClick={handleShare}
                aria-label="Share case study"
              >
                {copied ? "✓ Copied Link" : "Share ↗"}
              </button>
              {caseStudy.liveUrl && (
                <a 
                  href={caseStudy.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="player-ctrl-btn live-btn"
                >
                  Live Web ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. High-Impact Metrics Bento */}
      <section className="case-study-section">
        <div className="section-subtitle-tag">01 / QUANTIFIABLE IMPACT</div>
        <h2 className="section-heading-h2">Engineered for Measurable Outcomes</h2>
        <div className="metrics-bento-grid">
          {caseStudy.metrics.map((metric, idx) => (
            <div key={idx} className="metric-bento-card">
              <div className="metric-big-num">{metric.value}</div>
              <div className="metric-title">{metric.label}</div>
              <p className="metric-desc">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The Challenge & Problem Space */}
      <section className="case-study-section">
        <div className="section-subtitle-tag">02 / THE CHALLENGE</div>
        <h2 className="section-heading-h2">Unpacking the Problem Space</h2>
        <p className="section-lead-p">{caseStudy.theChallenge.summary}</p>
        
        <div className="cards-triad-grid">
          {caseStudy.theChallenge.points.map((pt, idx) => (
            <div key={idx} className="deepdive-card challenge-border">
              <div className="card-index-tag">Pain Point 0{idx + 1}</div>
              <h3>{pt.title}</h3>
              <p>{pt.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. The UX Solution & Architecture */}
      <section className="case-study-section">
        <div className="section-subtitle-tag">03 / THE DESIGN SOLUTION</div>
        <h2 className="section-heading-h2">Architecting Clarity & Efficiency</h2>
        <p className="section-lead-p">{caseStudy.theSolution.summary}</p>

        <div className="cards-triad-grid">
          {caseStudy.theSolution.points.map((pt, idx) => (
            <div key={idx} className="deepdive-card solution-border">
              <div className="card-index-tag solution-tag">Strategy 0{idx + 1}</div>
              <h3>{pt.title}</h3>
              <p>{pt.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Key Modules & Functional Capabilities */}
      <section className="case-study-section">
        <div className="section-subtitle-tag">04 / SYSTEM ARCHITECTURE</div>
        <h2 className="section-heading-h2">Core Functional Modules</h2>
        
        <div className="modules-stack">
          {caseStudy.modules.map((mod, idx) => (
            <div key={idx} className="module-item-card">
              <div className="module-header-row">
                <span className="module-num">0{idx + 1}</span>
                <span className="pill-badge">{mod.tag}</span>
              </div>
              <h3 className="module-name">{mod.name}</h3>
              <p className="module-desc">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. System Artifacts & Visual Gallery (White Mode, Hokage Roster, 3D Tap Sensor) */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="case-study-section">
          <div className="section-subtitle-tag">05 / ARTIFACTS & VISUAL GALLERY</div>
          <h2 className="section-heading-h2">Lampiran Antarmuka & Modul 3D</h2>
          <p className="section-lead-p">
            Dokumentasi visual implementasi nyata sistem: mulai dari bilik mandiri White Mode, sensor RFID 3D, profil kandidat ketua (Hokage Edition), hingga live TV scoreboard.
          </p>

          <div className="case-study-gallery-stack">
            {caseStudy.gallery.map((group, gIdx) => (
              <div key={gIdx} className="gallery-group-block">
                <div className="gallery-group-header">
                  <span className="gallery-cat-pill">{group.category}</span>
                  <h3 className="gallery-group-title">{group.title}</h3>
                  <p className="gallery-group-desc">{group.desc}</p>
                </div>

                <div className={`gallery-items-grid ${group.items.length === 3 ? 'grid-3-cols' : group.items.length === 4 ? 'grid-4-cols' : 'grid-2-cols'}`}>
                  {group.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="gallery-item-card"
                      onClick={() => setActiveLightboxImg(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setActiveLightboxImg(item); }}
                      aria-label={`Lihat ${item.title}`}
                    >
                      <div className="gallery-img-wrap">
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="gallery-thumb-img" 
                          loading="lazy" 
                        />
                        <div className="gallery-zoom-overlay">
                          <span className="gallery-zoom-pill">Perbesar ↗</span>
                        </div>
                      </div>
                      <div className="gallery-item-info">
                        <div className="gallery-item-tag-row">
                          <span className="gallery-item-tag">{item.tag}</span>
                        </div>
                        <h4 className="gallery-item-title">{item.title}</h4>
                        <p className="gallery-item-caption">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Deliverables & Technical Execution */}
      <section className="case-study-section">
        <div className="section-subtitle-tag">{caseStudy.gallery ? '06' : '05'} / CRAFT & EXECUTION</div>
        <h2 className="section-heading-h2">Deliverables & System Hand-off</h2>
        
        <div className="deliverables-box">
          <ul className="deliverables-list">
            {caseStudy.deliverables.map((deliv, idx) => (
              <li key={idx} className="deliverable-list-item">
                <span className="check-bullet">✦</span>
                <span>{deliv}</span>
              </li>
            ))}
          </ul>
          <div className="impact-quote-box">
            <span className="quote-label">System Impact Summary</span>
            <p className="impact-quote-text">"{caseStudy.impact}"</p>
          </div>
        </div>
      </section>

      {/* 10. Next Project Companion Card */}
      {nextProject && (
        <section className="case-study-next-section">
          <div className="next-project-banner">
            <div className="next-project-info">
              <span className="next-label">Next Flagship Mission ➔</span>
              <h3 className="next-title">{nextProject.title}</h3>
              <p className="next-desc">{nextProject.tagline}</p>
            </div>
            <button 
              type="button" 
              className="footer-btn-primary next-cta-btn"
              onClick={() => onSelectCaseStudy(nextProject)}
            >
              Explore {nextProject.title} ↗
            </button>
          </div>
        </section>
      )}

      {/* 11. Bottom Navigation Bar */}
      <div className="case-study-bottom-nav">
        <button 
          type="button" 
          className="footer-btn-ghost" 
          onClick={onBack}
        >
          ← Return to The Log Pose
        </button>
        {caseStudy.liveUrl && (
          <a 
            href={caseStudy.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-btn-primary"
          >
            Visit Live Platform ↗
          </a>
        )}
      </div>

      {/* Interactive Lightbox Modal */}
      {activeLightboxImg && (
        <div 
          className="case-study-lightbox"
          onClick={() => setActiveLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="lightbox-close-btn" 
              onClick={() => setActiveLightboxImg(null)}
              aria-label="Tutup pratinjau"
            >
              ✕
            </button>
            <div className="lightbox-img-stage">
              <img 
                src={activeLightboxImg.src} 
                alt={activeLightboxImg.title} 
                className="lightbox-img" 
              />
            </div>
            <div className="lightbox-meta">
              <span className="lightbox-tag">{activeLightboxImg.tag}</span>
              <h3 className="lightbox-title">{activeLightboxImg.title}</h3>
              <p className="lightbox-caption">{activeLightboxImg.caption}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
