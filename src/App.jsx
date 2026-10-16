import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import TechText from './components/TechText';
import NiskenadiLogo from './components/NiskenadiLogo';
import ArticlesSection from './components/ArticlesSection';
import ArticlesPage from './components/ArticlesPage';
import ArticleDetail from './components/ArticleDetail';
import YoutubePage from './components/YoutubePage';
import LogPoseShowcase from './components/LogPoseShowcase';
import CaseStudyDetail from './components/CaseStudyDetail';
import { getArticleBySlug } from './data/articles';
import { getCaseStudyById } from './data/caseStudies';
import './index.css';

// --- Assets & Media ---
const PROFILE_PIC = '/profile.png';
const ONE_PIECE_LOGO = '/assets/one_piece_logo.svg';

const IMG_IMAGIFY = '/assets/thumb_imagify.png';
const IMG_CLAY = '/assets/thumb_clay.png';
const IMG_PACKMOCKUP = '/assets/thumb_packmockup.png';
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
    span: 'bento-col-6',
    tech: ['Three.js', 'React', 'Product Design']
  },
  {
    id: 'lumutijo',
    title: 'Lumut Ijo',
    category: 'Environmental',
    tag: 'Conservation Web',
    description: 'A serene nature-centric portal dedicated to ecosystem restoration initiatives.',
    image: IMG_LUMUTIJO,
    link: 'https://lumutijo.vercel.app/',
    span: 'bento-col-6',
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Routing & Sub-page State: 'home' | 'articles' | 'article-detail' | 'streams' | 'case-study-detail'
  const [currentView, setCurrentView] = useState('home');
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  // Hairline Scroll Progress Bar (Pure GPU via Framer Motion transforms)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync route with URL path / hash / query
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      const articleParam = params.get('article');
      const caseStudyParam = params.get('case-study') || params.get('casestudy');

      // 1. Case Study Routes: /case-studies/:id or #case-studies/:id or #/case-studies/:id
      if (path.startsWith('/case-studies/') || hash.startsWith('#/case-studies/') || hash.startsWith('#case-studies/')) {
        const slug = path.startsWith('/case-studies/')
          ? path.replace('/case-studies/', '')
          : hash.startsWith('#/case-studies/')
            ? hash.replace('#/case-studies/', '')
            : hash.replace('#case-studies/', '');
        const found = getCaseStudyById(slug);
        if (found) {
          setActiveCaseStudy(found);
          setActiveArticle(null);
          setCurrentView('case-study-detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (caseStudyParam) {
        const found = getCaseStudyById(caseStudyParam);
        if (found) {
          setActiveCaseStudy(found);
          setActiveArticle(null);
          setCurrentView('case-study-detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      // 2. Article Routes
      if (path.startsWith('/articles/') || hash.startsWith('#/articles/')) {
        const slug = path.startsWith('/articles/') 
          ? path.replace('/articles/', '') 
          : hash.replace('#/articles/', '');
        const found = getArticleBySlug(slug);
        if (found) {
          setActiveArticle(found);
          setActiveCaseStudy(null);
          setCurrentView('article-detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (articleParam) {
        const found = getArticleBySlug(articleParam);
        if (found) {
          setActiveArticle(found);
          setActiveCaseStudy(null);
          setCurrentView('article-detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (path === '/articles' || hash === '#articles-page' || hash === '#/articles') {
        setCurrentView('articles');
        setActiveArticle(null);
        setActiveCaseStudy(null);
        window.scrollTo(0, 0);
        return;
      }

      if (path === '/streams' || path === '/youtube' || hash === '#streams' || hash === '#/streams' || hash === '#youtube') {
        setCurrentView('streams');
        setActiveArticle(null);
        setActiveCaseStudy(null);
        window.scrollTo(0, 0);
        return;
      }

      setCurrentView('home');
      setActiveArticle(null);
      setActiveCaseStudy(null);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToHome = (targetAnchor = null) => {
    setCurrentView('home');
    setActiveArticle(null);
    setActiveCaseStudy(null);
    setMobileMenuOpen(false);
    window.history.pushState(null, '', targetAnchor ? targetAnchor : '/');
    if (targetAnchor) {
      setTimeout(() => {
        const el = document.querySelector(targetAnchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToArticles = () => {
    setCurrentView('articles');
    setActiveArticle(null);
    setActiveCaseStudy(null);
    setMobileMenuOpen(false);
    window.history.pushState(null, '', '/articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToStreams = () => {
    setCurrentView('streams');
    setActiveArticle(null);
    setActiveCaseStudy(null);
    setMobileMenuOpen(false);
    window.history.pushState(null, '', '/streams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticleDetail = (article) => {
    setActiveArticle(article);
    setActiveCaseStudy(null);
    setCurrentView('article-detail');
    setMobileMenuOpen(false);
    window.history.pushState(null, '', `/articles/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCaseStudy = (idOrCaseStudy) => {
    const found = typeof idOrCaseStudy === 'string'
      ? getCaseStudyById(idOrCaseStudy)
      : idOrCaseStudy;
    if (!found) return;
    setActiveCaseStudy(found);
    setActiveArticle(null);
    setCurrentView('case-study-detail');
    setMobileMenuOpen(false);
    window.history.pushState(null, '', `/#case-studies/${found.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <a 
            href="#hero" 
            className="nav-brand-badge" 
            onClick={(e) => { e.preventDefault(); navigateToHome('#hero'); }} 
            aria-label="Niskenadi Home"
          >
            <NiskenadiLogo size={22} className="nav-brand-logo" />
            <span>Niskenadi</span>
          </a>

          {/* Desktop / Tablet Wide Menu */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <span className="nav-divider" aria-hidden="true" />
            <ul className="nav-menu">
              <li>
                <a 
                  href="#case-studies" 
                  className="nav-link" 
                  onClick={(e) => { 
                    if (currentView !== 'home') { 
                      e.preventDefault(); 
                      navigateToHome('#case-studies'); 
                    } 
                  }}
                >
                  Log Pose
                </a>
              </li>
              <li>
                <a 
                  href="#bounties" 
                  className="nav-link" 
                  onClick={(e) => { 
                    if (currentView !== 'home') { 
                      e.preventDefault(); 
                      navigateToHome('#bounties'); 
                    } 
                  }}
                >
                  Bounties
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="nav-link" 
                  onClick={(e) => { 
                    if (currentView !== 'home') { 
                      e.preventDefault(); 
                      navigateToHome('#about'); 
                    } 
                  }}
                >
                  Crew
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link-btn ${currentView === 'articles' || currentView === 'article-detail' ? 'active' : ''}`}
                  onClick={navigateToArticles}
                >
                  Logbook
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link-btn ${currentView === 'streams' ? 'active' : ''}`}
                  onClick={navigateToStreams}
                >
                  Streams
                </button>
              </li>
            </ul>
            <span className="nav-divider" aria-hidden="true" />
            <a 
              href="#contact" 
              className="nav-cta-btn" 
              onClick={(e) => { 
                if (currentView !== 'home') { 
                  e.preventDefault(); 
                  navigateToHome('#contact'); 
                } 
              }}
            >
              <span>Set Sail</span>
              <span className="nav-cta-arrow">↗</span>
            </a>
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
              <a 
                href="#case-studies" 
                className="mobile-nav-item" 
                onClick={(e) => { 
                  if (currentView !== 'home') { 
                    e.preventDefault(); 
                    navigateToHome('#case-studies'); 
                  } else { 
                    setMobileMenuOpen(false); 
                  } 
                }}
              >
                <span className="item-num">01</span>
                <span>The Log Pose</span>
              </a>
              <a 
                href="#bounties" 
                className="mobile-nav-item" 
                onClick={(e) => { 
                  if (currentView !== 'home') { 
                    e.preventDefault(); 
                    navigateToHome('#bounties'); 
                  } else { 
                    setMobileMenuOpen(false); 
                  } 
                }}
              >
                <span className="item-num">02</span>
                <span>Digital Bounties</span>
              </a>
              <a 
                href="#about" 
                className="mobile-nav-item" 
                onClick={(e) => { 
                  if (currentView !== 'home') { 
                    e.preventDefault(); 
                    navigateToHome('#about'); 
                  } else { 
                    setMobileMenuOpen(false); 
                  } 
                }}
              >
                <span className="item-num">03</span>
                <span>The Crewmate</span>
              </a>
              <button 
                type="button" 
                className="mobile-nav-item" 
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                onClick={navigateToArticles}
              >
                <span className="item-num">04</span>
                <span>The Logbook (Articles)</span>
              </button>
              <button 
                type="button" 
                className="mobile-nav-item" 
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                onClick={navigateToStreams}
              >
                <span className="item-num">05</span>
                <span>The Den Den Mushi (Streams)</span>
              </button>
              <a 
                href="#contact" 
                className="mobile-nav-cta" 
                onClick={(e) => { 
                  if (currentView !== 'home') { 
                    e.preventDefault(); 
                    navigateToHome('#contact'); 
                  } else { 
                    setMobileMenuOpen(false); 
                  } 
                }}
              >
                <span>Set Sail (Contact)</span>
                <span>↗</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main>
        {currentView === 'case-study-detail' ? (
          <CaseStudyDetail 
            caseStudy={activeCaseStudy} 
            onBack={() => navigateToHome('#case-studies')} 
            onSelectCaseStudy={navigateToCaseStudy} 
          />
        ) : currentView === 'article-detail' ? (
          <ArticleDetail 
            article={activeArticle} 
            onBack={navigateToArticles} 
            onSelectArticle={navigateToArticleDetail} 
          />
        ) : currentView === 'articles' ? (
          <ArticlesPage 
            onSelectArticle={navigateToArticleDetail} 
            onBackToHome={() => navigateToHome()} 
          />
        ) : currentView === 'streams' ? (
          <YoutubePage 
            onBackToHome={() => navigateToHome()} 
          />
        ) : (
          <>
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

                {/* Minimalist Micro-Data Chips */}
                <motion.div variants={fadeInUp} className="hero-pills-row">
                  <span className="pill-badge">✦ 3+ Years Experience</span>
                  <span className="pill-badge">✦ Enterprise HCIS & SaaS</span>
                  <span className="pill-badge">✦ Design Systems & Tokens</span>
                  <span className="pill-badge">✦ Interactive 3D Web</span>
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
                    <text fill="#A1A1AA" style={{ fontSize: '9.5px', fontFamily: "'Space Mono', monospace", letterSpacing: '2.5px', fontWeight: '700', textTransform: 'uppercase' }}>
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

        {/* 4. Flagship Case Studies (The Log Pose) with Video Scroll Showcase */}
        <LogPoseShowcase onSelectCaseStudy={navigateToCaseStudy} />

        {/* 5. Bounties (Bento Grid) */}
        <section id="bounties">
          <div className="container">
            <div className="section-header-bar">
              <div className="section-label-group">
                <span className="section-tag">02 / Digital Bounties</span>
                <h2>Crafted Experiments & Live Tools</h2>
              </div>
              <span className="section-meta-sub">4 Live Web Applications & Systems</span>
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
                <div className="hero-quote-card" style={{ marginTop: 'auto', background: 'rgba(255, 255, 255, 0.02)', padding: '16px' }}>
                  <p className="hero-quote-text" style={{ fontSize: '1.15rem', lineHeight: '1.4' }}>
                    "I don't seek to conquer anything. The designer with the most freedom in this ocean creates the greatest experiences."
                  </p>
                  <div className="hero-quote-author" style={{ marginTop: '8px' }}>
                    <img src={ONE_PIECE_LOGO} alt="Grand Line insignia" style={{ height: '16px', filter: 'invert(1)', opacity: 0.8 }} />
                    <span>The Grand Line Philosophy</span>
                  </div>
                </div>
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

        {/* 4. The Logbook (Articles Section) */}
        <ArticlesSection 
          onSelectArticle={navigateToArticleDetail}
          onViewAllArticles={navigateToArticles}
        />

        {/* 5. Final Port / Outro */}
        <section id="contact" className="footer-section">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInUp}
            >
              {/* Interactive TechText Finale */}
              <div className="footer-techtext-wrapper">
                <TechText
                  text="LET'S SET SAIL"
                  fontFamily="Syne"
                  fontWeight={800}
                  fontSize={160}
                  letterSpacing={-0.03}
                  color="#F5F5F7"
                  accentColor="#34D399"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  draggable={true}
                  sweep={true}
                />
              </div>
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
                <a 
                  href="https://www.youtube.com/@1kikend" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-btn-ghost"
                >
                  YouTube ↗
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
        </>
      )}
      </main>

    </>
  );
}
