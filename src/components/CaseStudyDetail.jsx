import React, { useState, useEffect } from 'react';
import { getCaseStudyById } from '../data/caseStudies';

export default function CaseStudyDetail({ caseStudy, onBack, onSelectCaseStudy }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPlaying(true);
  }, [caseStudy?.id]);

  if (!caseStudy) return null;

  const nextProject = caseStudy.nextProjectId 
    ? getCaseStudyById(caseStudy.nextProjectId)
    : null;

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

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
              Mission {caseStudy.num} / 02
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

      {/* 3. Cinematic Video Showcase Player */}
      <section className="case-study-media-stage">
        <div className="case-study-player-wrap">
          <video 
            ref={videoRef}
            src={caseStudy.videoUrl}
            poster={caseStudy.posterUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="case-study-video-elem"
            onClick={toggleVideoPlay}
          />
          <div className="player-overlay-bar">
            <div className="player-badge-group">
              <span className="video-live-pill">
                <span className="live-pulse" /> High Definition Walkthrough (Looping Preview)
              </span>
            </div>
            <div className="player-controls-group">
              <button 
                type="button" 
                className="player-ctrl-btn" 
                onClick={toggleVideoPlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? "❚❚ Pause" : "▶ Play"}
              </button>
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

      {/* 8. Deliverables & Technical Execution */}
      <section className="case-study-section">
        <div className="section-subtitle-tag">05 / CRAFT & EXECUTION</div>
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

      {/* 9. Next Project Companion Card */}
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

      {/* 10. Bottom Navigation Bar */}
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
    </article>
  );
}
