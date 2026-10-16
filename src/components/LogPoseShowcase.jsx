import React, { useRef, useState, useEffect, useCallback } from 'react';

const LOG_POSE_ITEMS = [
  {
    id: 'hrkita',
    num: '01',
    badge: 'Enterprise Flagship',
    tag: 'Enterprise HCIS & Payroll',
    title: 'HRKita Platform',
    desc: 'End-to-end design for an enterprise Human Capital Information System and executive payroll dashboard. Engineered scalable design tokens to reduce data fatigue across high-density workflows.',
    metrics: [
      { label: 'Payroll Velocity', val: '-40% Time' },
      { label: 'Calculation Accuracy', val: '99.98%' },
      { label: 'Executive Sign-off', val: '3.2x Faster' }
    ],
    videoUrl: '/assets/preview_hrkita.mp4',
    posterUrl: '/assets/hrkita_thumb.png',
    liveUrl: null,
    accentColor: '#34D399'
  },
  {
    id: 'seradia',
    num: '02',
    badge: 'Live Production',
    tag: 'Wedding Management Platform',
    title: 'Seradia Platform',
    desc: 'Modern all-in-one wedding management platform and curated editorial digital invitations with real-time WhatsApp RSVP sync, smart budgeting, and collaborative vendor timelines.',
    metrics: [
      { label: 'Integrated Modules', val: '5 Modules' },
      { label: 'Real-Time RSVP', val: '100% Automated' },
      { label: 'Planning Time Saved', val: '65+ Hours' }
    ],
    videoUrl: '/assets/preview_seradia.mp4',
    posterUrl: '/assets/thumb_seradia.png',
    liveUrl: 'https://seradia.vercel.app/',
    accentColor: '#D4AF37'
  }
];

export default function LogPoseShowcase({ onSelectCaseStudy }) {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Smooth scroll progress tracking
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;

    if (totalScrollable <= 0) return;

    // How far container top is from 0
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

  // Handle active video playback
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;
      if (idx === activeCardIndex) {
        videoEl.play().catch(() => {});
      } else {
        // Keep playing muted or pause off-screen card
        // Pausing improves GPU/CPU efficiency
        if (scrollProgress === 0 && idx === 1) {
          videoEl.pause();
        } else if (scrollProgress === 1 && idx === 0) {
          videoEl.pause();
        } else {
          videoEl.play().catch(() => {});
        }
      }
    });
  }, [activeCardIndex, scrollProgress]);

  // Jump to specific card by scrolling track
  const jumpToCard = (targetIndex) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackTop = scrollTop + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = trackTop + (targetIndex === 0 ? 0 : totalScrollable);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Card 2 transform computation
  // enter = progress from 0 to 1
  const card2Enter = scrollProgress; // 0 (hidden below) -> 1 (fully covering Card 1)
  const card2TranslateY = `${(1 - card2Enter) * 100}%`;

  // Card 1 subtle scale and translate
  const card1Scale = 1 - 0.04 * scrollProgress;
  const card1TranslateY = `-${20 * scrollProgress}px`;
  const card1Dim = scrollProgress * 0.4;

  return (
    <div 
      className="logpose-scroll-track" 
      ref={containerRef}
      id="case-studies"
    >
      <div className="logpose-sticky-viewport">
        {/* Section Header Bar */}
        <div className="logpose-header-row">
          <div className="logpose-header-left">
            <div className="section-label-group">
              <span className="section-tag">01 / Flagship Missions</span>
              <h2 className="logpose-heading">The Log Pose</h2>
            </div>
            <span className="section-meta-sub">Enterprise Systems & Bespoke Digital Platforms</span>
          </div>

          {/* Interactive Card Navigator Controls */}
          <div className="logpose-nav-pills" role="tablist" aria-label="Log Pose Projects">
            <span className="logpose-nav-label">Scroll or Select Project:</span>
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
                <span>{item.num} {item.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stacked Cards Arena (inspired by librani.org) */}
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
            {/* Background Looping Video */}
            <div className="card-media-shell">
              <video
                ref={(el) => (videoRefs.current[0] = el)}
                src={LOG_POSE_ITEMS[0].videoUrl}
                poster={LOG_POSE_ITEMS[0].posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="card-bg-video"
              />
              <div 
                className="card-dim-overlay"
                style={{ opacity: card1Dim }}
              />
              <div className="card-gradient-scrim" />
            </div>

            {/* Top Header Badge Row */}
            <div className="card-content-top">
              <div className="card-badge-row">
                <span className="card-pill primary-pill">
                  <span className="nav-brand-dot" /> {LOG_POSE_ITEMS[0].badge}
                </span>
                <span className="card-pill secondary-pill">
                  {LOG_POSE_ITEMS[0].tag}
                </span>
              </div>
              <div className="card-live-indicator">
                <span className="pulse-indicator-dot" />
                <span>Interactive Preview Video</span>
              </div>
            </div>

            {/* Bottom Content Bar */}
            <div className="card-content-bottom">
              <div className="card-info-main">
                <span className="card-eyebrow">Mission 01 • Case Study</span>
                <h3 className="card-title">{LOG_POSE_ITEMS[0].title}</h3>
                <p className="card-description">{LOG_POSE_ITEMS[0].desc}</p>

                <div className="card-kpi-chips">
                  {LOG_POSE_ITEMS[0].metrics.map((m, idx) => (
                    <div key={idx} className="kpi-chip">
                      <span className="kpi-val">{m.val}</span>
                      <span className="kpi-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-cta-col">
                <button
                  type="button"
                  className="card-explore-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCaseStudy('hrkita');
                  }}
                >
                  <span>Explore Case Study</span>
                  <span className="cta-arrow">↗</span>
                </button>
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
            {/* Background Looping Video */}
            <div className="card-media-shell">
              <video
                ref={(el) => (videoRefs.current[1] = el)}
                src={LOG_POSE_ITEMS[1].videoUrl}
                poster={LOG_POSE_ITEMS[1].posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="card-bg-video"
              />
              <div className="card-gradient-scrim scrim-gold" />
            </div>

            {/* Top Header Badge Row */}
            <div className="card-content-top">
              <div className="card-badge-row">
                <span className="card-pill primary-pill pill-gold">
                  <span className="nav-brand-dot dot-gold" /> {LOG_POSE_ITEMS[1].badge}
                </span>
                <span className="card-pill secondary-pill">
                  {LOG_POSE_ITEMS[1].tag}
                </span>
                <span className="card-pill link-pill">
                  seradia.vercel.app ↗
                </span>
              </div>
              <div className="card-live-indicator">
                <span className="pulse-indicator-dot dot-gold" />
                <span>Interactive Preview Video</span>
              </div>
            </div>

            {/* Bottom Content Bar */}
            <div className="card-content-bottom">
              <div className="card-info-main">
                <span className="card-eyebrow">Mission 02 • Flagship Platform</span>
                <h3 className="card-title">{LOG_POSE_ITEMS[1].title}</h3>
                <p className="card-description">{LOG_POSE_ITEMS[1].desc}</p>

                <div className="card-kpi-chips">
                  {LOG_POSE_ITEMS[1].metrics.map((m, idx) => (
                    <div key={idx} className="kpi-chip chip-gold">
                      <span className="kpi-val val-gold">{m.val}</span>
                      <span className="kpi-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-cta-col">
                <button
                  type="button"
                  className="card-explore-btn btn-gold"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCaseStudy('seradia');
                  }}
                >
                  <span>Explore Case Study</span>
                  <span className="cta-arrow">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar at Bottom of Sticky Pin */}
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
