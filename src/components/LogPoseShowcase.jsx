import React, { useRef, useState, useEffect, useCallback } from 'react';

const LOG_POSE_ITEMS = [
  {
    id: 'hrkita',
    num: '01',
    title: 'HRKita Platform',
    desc: 'Human Capital Information System & Enterprise Payroll Dashboard.',
    thumb: '/assets/hrkita_thumb.png',
    accentColor: '#34D399'
  },
  {
    id: 'seradia',
    num: '02',
    title: 'Seradia Platform',
    desc: 'All-in-One Wedding Management Platform & Digital Invitation.',
    thumb: '/assets/thumb_seradia.png',
    accentColor: '#D4AF37'
  }
];

export default function LogPoseShowcase({ onSelectCaseStudy }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Smooth scroll progress tracking
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;

    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const rawProgress = scrolled / totalScrollable;
    const progress = Math.max(0, Math.min(1, rawProgress));

    setScrollProgress(progress);
    setActiveCardIndex(progress >= 0.5 ? 1 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Jump to specific card
  const jumpToCard = (targetIndex) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackTop = scrollTop + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = trackTop + (targetIndex === 0 ? 0 : totalScrollable);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Stacked transform computation (librani.org style)
  const card2Enter = scrollProgress; // 0 -> 1
  const card2TranslateY = `${(1 - card2Enter) * 100}%`;

  const card1Scale = 1 - 0.04 * scrollProgress;
  const card1TranslateY = `-${20 * scrollProgress}px`;
  const card1Dim = scrollProgress * 0.45;

  return (
    <div 
      className="logpose-scroll-track" 
      ref={containerRef}
      id="case-studies"
    >
      <div className="logpose-sticky-viewport">
        {/* Section Header */}
        <div className="logpose-header-row">
          <div className="logpose-header-left">
            <div className="section-label-group">
              <span className="section-tag">01 / Flagship Missions</span>
              <h2 className="logpose-heading">The Log Pose</h2>
            </div>
            <span className="section-meta-sub">Enterprise Systems & Bespoke Digital Platforms</span>
          </div>

          {/* Quick Pill Navigator */}
          <div className="logpose-nav-pills" role="tablist" aria-label="Log Pose Projects">
            {LOG_POSE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeCardIndex === idx}
                className={`logpose-nav-pill-btn ${activeCardIndex === idx ? 'active' : ''}`}
                onClick={() => jumpToCard(idx)}
              >
                <span className="pill-dot" style={{ backgroundColor: item.accentColor }} />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stacked Cards Arena */}
        <div className="logpose-cards-arena">
          {/* Card 01: HRKita */}
          <div 
            className="logpose-card card-01"
            style={{
              transform: `translateY(${card1TranslateY}) scale(${card1Scale})`,
              transformOrigin: 'center top'
            }}
            onClick={() => onSelectCaseStudy('hrkita')}
          >
            <div className="card-media-shell">
              <img
                src={LOG_POSE_ITEMS[0].thumb}
                alt={LOG_POSE_ITEMS[0].title}
                className="card-bg-img"
                loading="eager"
              />
              <div 
                className="card-dim-overlay"
                style={{ opacity: card1Dim }}
              />
              <div className="card-gradient-scrim" />
            </div>

            {/* Top Bar: Clean & Minimalist */}
            <div className="card-content-top">
              <span className="card-arrow-pill">
                Explore Case Study ↗
              </span>
            </div>

            {/* Bottom Content: Concise Title & Short Description */}
            <div className="card-content-bottom">
              <div className="card-info-main">
                <h3 className="card-title">{LOG_POSE_ITEMS[0].title}</h3>
                <p className="card-description">{LOG_POSE_ITEMS[0].desc}</p>
              </div>
            </div>
          </div>

          {/* Card 02: Seradia */}
          <div 
            className="logpose-card card-02"
            style={{
              transform: `translateY(${card2TranslateY})`,
              boxShadow: scrollProgress > 0.05 ? '0 -24px 60px rgba(0, 0, 0, 0.85)' : 'none'
            }}
            onClick={() => onSelectCaseStudy('seradia')}
          >
            <div className="card-media-shell">
              <img
                src={LOG_POSE_ITEMS[1].thumb}
                alt={LOG_POSE_ITEMS[1].title}
                className="card-bg-img"
                loading="lazy"
              />
              <div className="card-gradient-scrim scrim-gold" />
            </div>

            {/* Top Bar: Clean & Minimalist */}
            <div className="card-content-top">
              <span className="card-arrow-pill pill-gold">
                Explore Case Study ↗
              </span>
            </div>

            {/* Bottom Content: Concise Title & Short Description */}
            <div className="card-content-bottom">
              <div className="card-info-main">
                <h3 className="card-title">{LOG_POSE_ITEMS[1].title}</h3>
                <p className="card-description">{LOG_POSE_ITEMS[1].desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="logpose-progress-track">
          <div 
            className="logpose-progress-fill" 
            style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
