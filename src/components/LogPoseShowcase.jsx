import React, { useRef, useState, useEffect, useCallback } from 'react';

const LOG_POSE_ITEMS = [
  {
    id: 'hrkita',
    num: '01',
    tag: 'Enterprise HCIS',
    title: 'HRKita Platform',
    desc: 'Human Capital Information System & Enterprise Payroll Portal.',
    thumb: '/assets/hrkita_thumb.png',
    accentColor: '#34D399',
    badges: ['Enterprise SaaS', '180+ Tokens', 'Payroll Engine']
  },
  {
    id: 'seradia',
    num: '02',
    tag: 'Wedding Ecosystem',
    title: 'Seradia Platform',
    desc: 'All-in-One Wedding Management Platform & Curated Digital Invitations.',
    thumb: '/assets/thumb_seradia.png',
    accentColor: '#D4AF37',
    badges: ['Editorial Luxury', 'Live RSVP Sync', 'Smart Budget']
  },
  {
    id: 'evoting',
    num: '03',
    tag: 'Enterprise E-Voting',
    title: 'UBS E-Voting Platform',
    desc: 'Enterprise Cooperative E-Voting System with RFID Tap & Real-Time Sync.',
    thumb: '/assets/thumb_evoting.png',
    accentColor: '#60A5FA',
    badges: ['RFID Tap-to-Vote', 'Dual-TPS Sync', 'SHA-256 Seal']
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
    if (progress < 0.35) {
      setActiveCardIndex(0);
    } else if (progress < 0.75) {
      setActiveCardIndex(1);
    } else {
      setActiveCardIndex(2);
    }
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
    const targetFraction = targetIndex === 0 ? 0 : targetIndex === 1 ? 0.5 : 1.0;
    const targetScroll = trackTop + (totalScrollable * targetFraction);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Stacked transform computation for 3 cards
  // Phase 1: progress 0.0 -> 0.5 (Card 1 scales down/dims, Card 2 enters)
  const t1 = Math.max(0, Math.min(1, scrollProgress / 0.5));
  // Phase 2: progress 0.5 -> 1.0 (Card 2 scales down/dims, Card 3 enters)
  const t2 = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.5));

  // Card 1
  const card1Scale = 1 - 0.04 * t1;
  const card1TranslateY = `-${20 * t1}px`;
  const card1Dim = t1 * 0.45;

  // Card 2
  const card2Scale = scrollProgress > 0.5 ? 1 - 0.04 * t2 : 1;
  const card2TranslateY = scrollProgress > 0.5 
    ? `-${20 * t2}px` 
    : `${(1 - t1) * 100}%`;
  const card2Dim = scrollProgress > 0.5 ? t2 * 0.45 : 0;
  const card2Shadow = t1 > 0.05 ? '0 -24px 60px rgba(0, 0, 0, 0.85)' : 'none';

  // Card 3
  const card3Scale = 1;
  const card3TranslateY = scrollProgress > 0.5 
    ? `${(1 - t2) * 100}%` 
    : '100%';
  const card3Dim = 0;
  const card3Shadow = t2 > 0.05 ? '0 -24px 60px rgba(0, 0, 0, 0.9)' : 'none';

  const cardsTransform = [
    {
      style: {
        transform: `translateY(${card1TranslateY}) scale(${card1Scale})`,
        transformOrigin: 'center top',
        zIndex: 1
      },
      dim: card1Dim,
      shadow: 'none'
    },
    {
      style: {
        transform: `translateY(${card2TranslateY}) scale(${card2Scale})`,
        transformOrigin: 'center top',
        boxShadow: card2Shadow,
        zIndex: 2
      },
      dim: card2Dim,
      shadow: card2Shadow
    },
    {
      style: {
        transform: `translateY(${card3TranslateY}) scale(${card3Scale})`,
        transformOrigin: 'center top',
        boxShadow: card3Shadow,
        zIndex: 3
      },
      dim: card3Dim,
      shadow: card3Shadow
    }
  ];

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
                <span>{item.num} {item.title.replace(' Platform', '')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stacked Cards Arena */}
        <div className="logpose-cards-arena">
          {LOG_POSE_ITEMS.map((item, idx) => {
            const cardState = cardsTransform[idx];
            return (
              <div 
                key={item.id}
                className={`logpose-card card-0${idx + 1}`}
                style={cardState.style}
                onClick={() => onSelectCaseStudy(item.id)}
              >
                {/* Background Dimming for Underneath Cards */}
                <div 
                  className="card-dim-overlay"
                  style={{ opacity: cardState.dim }}
                />

                {/* Side-by-Side Split: Picture Aside Description */}
                <div className="card-split-layout">
                  {/* Left Column: Description & Metadata */}
                  <div className="card-col-info">
                    <div className="card-info-top">
                      <div className="card-mission-eyebrow">
                        <span className="card-mission-num">MISSION {item.num}</span>
                        <span className="card-mission-divider">•</span>
                        <span className="card-mission-tag" style={{ color: item.accentColor }}>
                          {item.tag}
                        </span>
                      </div>
                      
                      <h3 className="card-split-title">{item.title}</h3>
                      <p className="card-split-desc">{item.desc}</p>
                    </div>

                    <div className="card-info-bottom">
                      <div className="card-feature-pills">
                        {item.badges.map((badge, bIdx) => (
                          <span key={bIdx} className="card-feature-pill">
                            <span 
                              className="feat-dot" 
                              style={{ backgroundColor: item.accentColor, boxShadow: `0 0 8px ${item.accentColor}80` }} 
                            />
                            {badge}
                          </span>
                        ))}
                      </div>

                      <div className="card-cta-wrapper">
                        <span 
                          className="card-split-btn"
                          style={{ '--accent-color': item.accentColor }}
                        >
                          <span>Explore Case Study</span>
                          <span className="btn-arrow">↗</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Res Interface Graphic (Aside) */}
                  <div className="card-col-visual">
                    <div className="card-visual-frame">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="card-showcase-thumb"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                      <div 
                        className="card-visual-glow" 
                        style={{
                          background: `radial-gradient(circle at 60% 40%, ${item.accentColor}20 0%, transparent 70%)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Progress Bar */}
        <div className="logpose-progress-track">
          <div 
            className="logpose-progress-fill" 
            style={{ 
              width: `${Math.max(12, scrollProgress * 100)}%`,
              background: activeCardIndex === 0 
                ? 'linear-gradient(90deg, #34D399 0%, #34D399 100%)'
                : activeCardIndex === 1
                  ? 'linear-gradient(90deg, #34D399 0%, #D4AF37 100%)'
                  : 'linear-gradient(90deg, #D4AF37 0%, #60A5FA 100%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
