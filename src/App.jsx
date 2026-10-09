import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import './index.css';

// --- Assets & Media ---
const PROFILE_PIC = '/profile.png';
const IMG_HRKITA = '/assets/hrkita_thumb.png';
const ONE_PIECE_LOGO = '/assets/one_piece_logo.svg';

const IMG_IMAGIFY = '/assets/thumb_imagify.png';
const IMG_CLAY = '/assets/thumb_clay.png';
const IMG_PACKMOCKUP = '/assets/thumb_packmockup.png';
const IMG_SERADIA = '/assets/thumb_seradia.png';
const IMG_LUMUTIJO = '/assets/thumb_lumutijo.png';

const PROJECTS = [
  {
    id: 'imagify',
    title: 'Imagify Tools',
    category: 'Web Application',
    tag: 'Image Engine',
    description: 'Client-side image manipulation and format optimization built for instant workflows.',
    image: IMG_IMAGIFY,
    link: 'https://imagify-tools.vercel.app/',
    span: 'bento-col-7',
    tech: ['Next.js', 'Canvas API', 'UI System']
  },
  {
    id: 'clay',
    title: 'Claymorphism UI',
    category: 'Design System',
    tag: '3D Aesthetic',
    description: 'A study in tactile dimensional design, featuring soft shadows and playful depth.',
    image: IMG_CLAY,
    link: 'https://claymorphisme.vercel.app/',
    span: 'bento-col-5',
    tech: ['Figma Tokens', 'CSS 3D', 'Micro-interactions']
  },
  {
    id: 'packmockup',
    title: 'Pack Mockup',
    category: 'Interactive 3D',
    tag: 'Packaging Studio',
    description: 'In-browser 3D box visualizer enabling real-time packaging texture application.',
    image: IMG_PACKMOCKUP,
    link: 'https://packmockup.vercel.app/',
    span: 'bento-col-4',
    tech: ['Three.js', 'React', 'Product Design']
  },
  {
    id: 'seradia',
    title: 'Seradia',
    category: 'Luxury Digital',
    tag: 'Event Platform',
    description: 'Bespoke digital coordination platform crafted with editorial wedding aesthetics.',
    image: IMG_SERADIA,
    link: 'https://seradia.vercel.app/',
    span: 'bento-col-4',
    tech: ['Editorial UI', 'UX Research', 'Booking Flow']
  },
  {
    id: 'lumutijo',
    title: 'Lumut Ijo',
    category: 'Environmental',
    tag: 'Conservation Web',
    description: 'A serene nature-centric portal dedicated to ecosystem restoration initiatives.',
    image: IMG_LUMUTIJO,
    link: 'https://lumutijo.vercel.app/',
    span: 'bento-col-4',
    tech: ['Visual Storytelling', 'Accessibility', 'Interaction']
  }
];

// GPU-friendly scroll reveal configuration
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hairline Scroll Progress Bar (Pure GPU via Framer Motion transforms)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle ESC key for modal and mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Fluid Splash Cursor Simulation */}
      <SplashCursor />

      {/* 1. Hairline Scroll Indicator */}
      <motion.div className="scroll-progress-line" style={{ scaleX }} />

      {/* 2. Responsive Floating Pill Navigation */}
      <div className="header-wrapper">
        <header className="floating-nav">
          <a href="#hero" className="nav-brand-badge" onClick={() => setMobileMenuOpen(false)}>
            <span className="nav-brand-dot" aria-hidden="true" />
            <span>Niskenadi</span>
          </a>

          {/* Desktop / Tablet Wide Menu */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              <li><a href="#case-studies" className="nav-link">Log Pose</a></li>
              <li><a href="#bounties" className="nav-link">Bounties</a></li>
              <li><a href="#about" className="nav-link">Crew</a></li>
              <li><a href="#contact" className="nav-cta-btn">Set Sail ↗</a></li>
            </ul>
          </nav>

          {/* Mobile Menu Hamburger / Close Toggle */}
          <button 
            type="button"
            className="mobile-nav-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span>{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </header>

        {/* Mobile Dropdown Overlay Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-nav-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#case-studies" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span className="item-num">01</span>
                <span>The Log Pose</span>
              </a>
              <a href="#bounties" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span className="item-num">02</span>
                <span>Digital Bounties</span>
              </a>
              <a href="#about" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span className="item-num">03</span>
                <span>The Crewmate</span>
              </a>
              <a href="#contact" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)}>
                <span>Set Sail (Contact)</span>
                <span>↗</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main>
        {/* 3. Hero Section */}
        <section id="hero">
          <div className="container">
            <div className="hero-layout">
              <motion.div 
                className="hero-main"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <div className="hero-title-box">
                  <motion.div variants={fadeInUp} className="hero-eyebrow">
                    <span className="pill-badge active-status">
                      <span className="nav-brand-dot" /> Available for Design Projects
                    </span>
                    <span className="pill-badge">Surabaya, ID • WIB</span>
                  </motion.div>

                  <motion.h1 variants={fadeInUp} className="hero-statement">
                    Designing intuitive digital tools with <span className="dim">navigational clarity.</span>
                  </motion.h1>
                </div>

                {/* Minimalist Micro-Data Chips (Replaces wordy paragraphs) */}
                <motion.div variants={fadeInUp} className="hero-pills-row">
                  <span className="pill-badge">✦ 3+ Years Experience</span>
                  <span className="pill-badge">✦ Enterprise HCIS & SaaS</span>
                  <span className="pill-badge">✦ Design Systems & Tokens</span>
                  <span className="pill-badge">✦ Interactive 3D Web</span>
                </motion.div>

                {/* The Grand Line Philosophy Card */}
                <motion.div variants={fadeInUp} className="hero-quote-card">
                  <p className="hero-quote-text">
                    "I don't seek to conquer anything. The designer with the most freedom in this ocean creates the greatest experiences."
                  </p>
                  <div className="hero-quote-author">
                    <img src={ONE_PIECE_LOGO} alt="Grand Line insignia" style={{ height: '18px', filter: 'invert(1)', opacity: 0.8 }} />
                    <span>The Grand Line Philosophy</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Profile Orb with Rotating Compass Orbit */}
              <motion.div 
                className="hero-avatar-pane"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="avatar-badge-wrap">
                  <svg className="circular-orbit-text" viewBox="0 0 100 100">
                    <path id="orbitCircle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text fill="#A1A1AA" style={{ fontSize: '10.5px', letterSpacing: '3px', fontWeight: '600', textTransform: 'uppercase' }}>
                      <textPath href="#orbitCircle">✦ UI/UX DESIGNER ✦ NISKENADI TRISNA ✦</textPath>
                    </text>
                  </svg>
                  <img 
                    src={PROFILE_PIC} 
                    alt="Niskenadi Trisna portrait" 
                    className="avatar-core-img"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Flagship Case Study (The Log Pose) */}
        <section id="case-studies">
          <div className="container">
            <div className="section-header-bar">
              <div className="section-label-group">
                <span className="section-tag">01 / Flagship Mission</span>
                <h2>The Log Pose</h2>
              </div>
              <span className="section-meta-sub">Enterprise Platform & Payroll Architecture</span>
            </div>

            <motion.div 
              className="flagship-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInUp}
            >
              <div className="flagship-visual">
                <img 
                  src={IMG_HRKITA} 
                  alt="HRKita HCIS Platform interface" 
                  className="flagship-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flagship-details">
                <div className="flagship-meta-top">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="pill-badge">Case Study</span>
                    <span className="pill-badge">Enterprise HCIS</span>
                  </div>
                  <h3>HRKita Platform</h3>
                  <p>
                    End-to-end design for an enterprise Human Capital Information System and executive payroll dashboard. Engineered scalable design tokens to reduce data fatigue across high-density workflows.
                  </p>

                  <div className="flagship-chip-grid">
                    <div className="meta-metric-item">
                      <span className="meta-metric-label">Role</span>
                      <span className="meta-metric-val">Lead Product Designer</span>
                    </div>
                    <div className="meta-metric-item">
                      <span className="meta-metric-label">Core Deliverable</span>
                      <span className="meta-metric-val">Design System & Tokens</span>
                    </div>
                    <div className="meta-metric-item">
                      <span className="meta-metric-label">Module Scope</span>
                      <span className="meta-metric-val">Payroll, HCIS, Analytics</span>
                    </div>
                    <div className="meta-metric-item">
                      <span className="meta-metric-label">UX Metric</span>
                      <span className="meta-metric-val">-40% Approval Time</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button 
                    type="button"
                    className="footer-btn-primary" 
                    style={{ width: '100%', padding: '12px 24px', cursor: 'pointer' }}
                    onClick={() => setModalOpen(true)}
                  >
                    View System Case Study Details ↗
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. Bounties (Bento Grid) */}
        <section id="bounties">
          <div className="container">
            <div className="section-header-bar">
              <div className="section-label-group">
                <span className="section-tag">02 / Digital Bounties</span>
                <h2>Crafted Experiments & Live Tools</h2>
              </div>
              <span className="section-meta-sub">5 Live Web Applications & Systems</span>
            </div>

            <motion.div 
              className="bento-grid-container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {PROJECTS.map((project) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bento-card ${project.span}`}
                  variants={fadeInUp}
                >
                  <div className="bento-card-media">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </div>

                  <div className="bento-card-header">
                    <div className="bento-card-title-group">
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <span className="pill-badge">{project.tag}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p style={{ marginTop: '4px' }}>{project.description}</p>
                    </div>
                  </div>

                  <div className="bento-card-footer">
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {project.tech.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.725rem', color: 'var(--text-faint)' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="arrow-icon-btn" aria-label="Visit website">↗</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. The Crewmate (About) - Minimalist 3-Pillar Matrix */}
        <section id="about">
          <div className="container">
            <div className="section-header-bar">
              <div className="section-label-group">
                <span className="section-tag">03 / The Crewmate</span>
                <h2>Background & Capabilities</h2>
              </div>
              <span className="section-meta-sub">Crafting products since 2021</span>
            </div>

            <motion.div 
              className="crewmate-matrix"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.div className="crewmate-pillar" variants={fadeInUp}>
                <span className="pillar-index">[ 01 / PHILOSOPHY ]</span>
                <h3>Navigation & Freedom</h3>
                <p>
                  Believing that the cleanest interfaces disappear when in use. Inspired by the Grand Line mindset: navigating complex problem spaces with agile curiosity rather than rigid dogma.
                </p>
              </motion.div>

              <motion.div className="crewmate-pillar" variants={fadeInUp}>
                <span className="pillar-index">[ 02 / ARSENAL ]</span>
                <h3>Design & Front-End Stack</h3>
                <p>Bridging design vision with code reality for zero communication gap.</p>
                <div className="pillar-skills-wrap">
                  <span className="pill-badge">Figma</span>
                  <span className="pill-badge">Design Systems</span>
                  <span className="pill-badge">User Research</span>
                  <span className="pill-badge">Prototyping</span>
                  <span className="pill-badge">React & Next.js</span>
                  <span className="pill-badge">CSS Animations</span>
                  <span className="pill-badge">Three.js Basics</span>
                </div>
              </motion.div>

              <motion.div className="crewmate-pillar" variants={fadeInUp}>
                <span className="pillar-index">[ 03 / TRAJECTORY ]</span>
                <h3>Proven Track Record</h3>
                <p>
                  3+ years delivering digital applications across enterprise human resources, manufacturing systems, and creator-oriented web tooling.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <span className="pill-badge active-status">🟢 Open to Full-time & Select Contracts</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 7. Final Port / Outro */}
        <section id="contact" className="footer-section">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInUp}
            >
              <h2 className="footer-hero-text">LET'S SET SAIL.</h2>
              <p className="footer-sub">
                Ready to conquer the next design challenge together? Reach out for collaboration, product design roles, or inquiries.
              </p>

              <div className="footer-actions">
                <a 
                  href="mailto:niskenaditrisnab@gmail.com" 
                  className="footer-btn-primary"
                >
                  Send an Email ↗
                </a>
                <a 
                  href="https://www.linkedin.com/in/niskenaditrisnabayu97/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-btn-ghost"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://dribbble.com/niskenadi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-btn-ghost"
                >
                  Dribbble
                </a>
              </div>

              <div className="footer-bottom-bar">
                <span>© {new Date().getFullYear()} Niskenadi Trisna. All rights reserved.</span>
                <span className="serif-font" style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--text-main)' }}>
                  Grand Line Edition
                </span>
                <span>Crafted with React & Modern Web Standards</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 8. Accessible Clean Modal for HRKita Case Study */}
      <AnimatePresence>
        {modalOpen && (
          <div 
            className="modal-overlay" 
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div 
              className="modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>

              <img 
                src={IMG_HRKITA} 
                alt="HRKita Full Overview" 
                style={{ width: '100%', borderRadius: '14px', aspectRatio: '16/9', objectFit: 'cover', marginBottom: '24px', border: '1px solid var(--border-subtle)' }} 
              />

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span className="pill-badge">Enterprise Case Study</span>
                <span className="pill-badge">HCIS & Payroll</span>
              </div>

              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>HRKita (Human Capital System)</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <p>
                  <strong style={{ color: 'var(--text-main)' }}>The Challenge:</strong> Enterprise payroll and human capital information workflows suffered from fragmented spreadsheets, repetitive data entry, and slow approval cycles.
                </p>
                <p>
                  <strong style={{ color: 'var(--text-main)' }}>The Solution:</strong> Built a unified high-fidelity component system and responsive executive portal. Streamlined complex tax calculations and employee status changes into step-by-step modular workflows.
                </p>
                <p>
                  <strong style={{ color: 'var(--text-main)' }}>Impact:</strong> Reduced time-to-completion for monthly payroll runs by approximately 40% while standardizing UI tokens for engineering handoff.
                </p>
              </div>

              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="footer-btn-primary" 
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '10px 24px', fontSize: '0.875rem' }}
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
