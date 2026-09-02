import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import './index.css';

// --- Placeholder Images ---
const PROFILE_PIC = '/profile.png'; 
const IMG_HRKITA = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
const IMG_IMAGIFY = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80';
const IMG_CLAY = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
const IMG_PACKMOCKUP = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'; // 3D box packaging
const IMG_SERADIA = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'; // Wedding aesthetic
const IMG_LUMUTIJO = 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'; // Deep green nature

// --- Components ---

const CinematicBackground = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: -10, overflow: 'hidden', pointerEvents: 'none' }}>
    <motion.div
      animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.8, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
        borderRadius: '50%', filter: 'blur(60px)'
      }}
    />
    <motion.div
      animate={{ x: [0, -150, 50, 0], y: [0, 100, -100, 0], scale: [1, 1.5, 0.9, 1] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute', bottom: '10%', right: '20%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
        borderRadius: '50%', filter: 'blur(80px)'
      }}
    />
    {/* Grid Overlay */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5 }}></div>
  </div>
);

const SectionHeader = ({ num, title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '64px' }}
  >
    <span style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: '600' }}>{num}</span>
    <h2 style={{ margin: 0 }}>{title}</h2>
    <div style={{ height: '1px', background: 'var(--border-color)', flex: 1 }}></div>
  </motion.div>
);

const CustomCursor = ({ hovering }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor ${hovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className="ambient-glow"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

const Marquee = () => {
  return (
    <div style={{ overflow: 'hidden', display: 'flex', width: '100vw', background: 'var(--accent)', color: 'var(--bg-color)', padding: '24px 0', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', transform: 'rotate(-2deg) scale(1.05)', marginTop: '60px', marginBottom: '80px', zIndex: 10 }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        style={{ display: 'flex', gap: '24px', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '1.25rem', textTransform: 'uppercase', fontFamily: "'Instrument Serif', serif", letterSpacing: '0.05em' }}
      >
        {Array(10).fill("UI/UX DESIGN ✦ PROTOTYPING ✦ FIGMA ✦ DESIGN SYSTEMS ✦ USER RESEARCH ✦").map((text, i) => (
          <span key={i} style={{ display: 'inline-block' }}>{text}</span>
        ))}
      </motion.div>
    </div>
  );
};

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
};

const Preloader = ({ setLoading }) => {
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexDirection: 'column' }}
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '0.05em' }}
      >
        Setting sail to the Grand Line...
      </motion.h1>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ height: '2px', background: 'var(--text-muted)', marginTop: '20px' }}
      />
    </motion.div>
  );
};

const CircularText = () => (
  <motion.div 
    animate={{ rotate: 360 }} 
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="circular-text"
  >
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
      <text fill="var(--accent)" style={{ fontSize: '12px', letterSpacing: '3px', fontWeight: '600', textTransform: 'uppercase' }}>
        <textPath href="#circlePath">✦ UI/UX Designer ✦ Niskenadi Trisna ✦ Portfolio</textPath>
      </text>
    </svg>
  </motion.div>
);

const Modal = ({ isOpen, onClose, title, content, image }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={image} alt={title} style={{ width: '100%', borderRadius: '12px', marginBottom: '24px', aspectRatio: '16/9', objectFit: 'cover' }} />
        <h2 style={{ marginBottom: '16px' }}>{title}</h2>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>{content}</p>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorHovering, setCursorHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <CinematicBackground />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" setLoading={setLoading} />}
      </AnimatePresence>
      <CustomCursor hovering={cursorHovering} />
      
      {/* Floating Glassmorphic Navbar */}
      <motion.nav 
        className="glass-nav" onMouseEnter={() => setCursorHovering(true)} onMouseLeave={() => setCursorHovering(false)}
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 2.2 }}
      >
        <Magnetic><a href="#home">Home</a></Magnetic>
        <Magnetic><a href="#case-studies">Log Pose</a></Magnetic>
        <Magnetic><a href="#side-projects">Bounties</a></Magnetic>
        <Magnetic><a href="#about">About</a></Magnetic>
      </motion.nav>

      {/* Top Navbar */}
      <div className="container">
        <motion.nav 
          className="top-nav"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 2 }}
        >
          <div className="nav-brand">Niskenadi Trisna</div>
          <div className="nav-links">
            <Magnetic><a href="#case-studies">Portfolio</a></Magnetic>
            <Magnetic><a href="#about">About</a></Magnetic>
          </div>
        </motion.nav>
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: '40px', borderBottom: 'none' }}>
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-left"
              initial="hidden" animate="visible" variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 2.3 } }
              }}
            >
              <motion.p className="greeting" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>Hallo, I'm Niskenadi Trisna 👋 A UI/UX Designer.</motion.p>
              
              <h1 style={{ display: 'flex', flexWrap: 'wrap', gap: '0 12px' }}>
                {"I navigate complex problems & design seamless experiences.".split(" ").map((word, i) => (
                  <motion.span key={i} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }}>
                    {word === "&" ? <span style={{ width: '100%', display: 'block', height: 0 }}></span> : null}
                    <span style={{ color: word === "design" || word === "seamless" || word === "experiences." ? 'var(--text-muted)' : 'inherit' }}>{word}</span>
                  </motion.span>
                ))}
              </h1>
              
              <motion.p className="hero-quote" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5, delay: 3 } } }}>
                "I don't want to conquer anything. I just think the designer with the most freedom in this ocean <strong>creates the best experiences.</strong>"
                <span className="author" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
                  <span style={{ width: '40px', height: '1px', background: 'var(--text-muted)' }}></span>
                  <img src="/assets/one_piece_logo.svg" alt="One Piece" style={{ height: '28px', filter: 'invert(1)', opacity: 0.9 }} />
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.8rem', letterSpacing: '0.02em', color: 'var(--accent)' }}>
                    The Grand Line Philosophy
                  </span>
                </span>
              </motion.p>
            </motion.div>

            <motion.div 
              className="hero-right"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 2.8 }}
            >
              <div className="profile-badge-container">
                <CircularText />
                <img src={PROFILE_PIC} alt="Profile" className="profile-pic" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Case Studies */}
      <section id="case-studies">
        <div className="container">
          <SectionHeader num="01" title="The Log Pose" />
          
          <motion.div 
            style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
          >
            <div className="premium-card" style={{ flex: '1 1 400px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
               <img src={IMG_HRKITA} alt="HRKita" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h3>HRKita (HCIS Platform)</h3>
              <p>Spearheaded the end-to-end design for the Human Capital Information System and a specialized executive-level payroll application. Delivered high-fidelity screens and interactive prototypes to streamline complex data visualization.</p>
              <button className="btn-link" style={{ marginTop: '24px' }} onClick={() => setModalOpen(true)}>
                View Case Study Details
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Side Projects with Hover Effect */}
      <section id="side-projects" style={{ position: 'relative' }}>
        
        {/* Dynamic Background Image for Hover */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.15 }} 
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: -50, zIndex: -1,
                backgroundImage: `url(${
                  hoveredProject === 'imagify' ? IMG_IMAGIFY : 
                  hoveredProject === 'clay' ? IMG_CLAY :
                  hoveredProject === 'packmockup' ? IMG_PACKMOCKUP :
                  hoveredProject === 'seradia' ? IMG_SERADIA :
                  hoveredProject === 'lumutijo' ? IMG_LUMUTIJO : ''
                })`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(20px)', borderRadius: '24px'
              }}
            />
          )}
        </AnimatePresence>

        <div className="container">
          <SectionHeader num="02" title="Bounties" />
        </div>
        
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          >
            ←
          </button>

          <div className="horizontal-scroll" ref={scrollRef} style={{ paddingLeft: 'max(40px, calc((100vw - 1120px) / 2))', paddingRight: '40px' }}>
          
          <motion.a 
            href="https://imagify-tools.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onMouseEnter={() => { setHoveredProject('imagify'); setCursorHovering(true); }}
            onMouseLeave={() => { setHoveredProject(null); setCursorHovering(false); }}
            className="premium-card"
            style={{ flex: '0 0 320px', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ scale: 1.02, y: -5, borderColor: 'var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <h3>Imagify Tools</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>A web-based image manipulation and optimization tool, designed for seamless user interaction.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>

          <motion.a 
            href="https://claymorphisme.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            onMouseEnter={() => { setHoveredProject('clay'); setCursorHovering(true); }}
            onMouseLeave={() => { setHoveredProject(null); setCursorHovering(false); }}
            className="premium-card"
            style={{ flex: '0 0 320px', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ scale: 1.02, y: -5, borderColor: 'var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <h3>Claymorphism UI</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>An exploration of the claymorphism design trend, featuring soft, 3D UI components.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>

          <motion.a 
            href="https://packmockup.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            onMouseEnter={() => { setHoveredProject('packmockup'); setCursorHovering(true); }}
            onMouseLeave={() => { setHoveredProject(null); setCursorHovering(false); }}
            className="premium-card"
            style={{ flex: '0 0 320px', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ scale: 1.02, y: -5, borderColor: 'var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <h3>Pack Mockup</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>A free packaging mockup generator. Rotate 3D boxes and apply beautiful designs to all sides directly in your browser.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>

          <motion.a 
            href="https://seradia.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            onMouseEnter={() => { setHoveredProject('seradia'); setCursorHovering(true); }}
            onMouseLeave={() => { setHoveredProject(null); setCursorHovering(false); }}
            className="premium-card"
            style={{ flex: '0 0 320px', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ scale: 1.02, y: -5, borderColor: 'var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <h3>Seradia</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>An elegant digital platform for wedding planning, offering bespoke organizational tools and a premium booking experience.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>

          <motion.a 
            href="https://lumutijo.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            onMouseEnter={() => { setHoveredProject('lumutijo'); setCursorHovering(true); }}
            onMouseLeave={() => { setHoveredProject(null); setCursorHovering(false); }}
            className="premium-card"
            style={{ flex: '0 0 320px', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ scale: 1.02, y: -5, borderColor: 'var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <h3>Lumut Ijo</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>Step into the living world. A nature-focused platform dedicated to restoring wild places through patient design.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          >
            →
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="container">
          <SectionHeader num="03" title="The Crewmate" />
          <div style={{ maxWidth: '800px' }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} style={{ marginBottom: '24px' }}>
              I am a UI/UX Designer with more than three years of experience developing digital products across manufacturing and technology.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} style={{ marginBottom: '24px' }}>
              Dedicated to tailoring designs to user needs while following trusted design system principles. I combine user-centered design expertise with hands-on front-end development knowledge.
            </motion.p>
            
          </div>
        </div>
      </section>

      {/* Modal for HRKita */}
      {/* Epic Footer & Contact */}
      <section id="contact" style={{ paddingTop: '150px', paddingBottom: '100px', borderTop: '1px solid var(--border-color)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.02em', margin: '0 0 24px 0', color: 'var(--text-main)', textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>LET'S SET SAIL.</h2>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 64px auto' }}>Ready to conquer the next big challenge in the Grand Line? Let's build something extraordinary together.</p>
            
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Magnetic>
                <a href="mailto:niskenaditrisnab@gmail.com" target="_blank" rel="noopener noreferrer" className="premium-card" style={{ padding: '16px 40px', borderRadius: '40px', fontSize: '1.125rem', fontWeight: '600', color: 'var(--bg-color)', background: 'var(--accent)', border: 'none', cursor: 'none' }}>
                  Send an Email
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.linkedin.com/in/niskenaditrisnabayu97/" target="_blank" rel="noopener noreferrer" className="premium-card" style={{ padding: '16px 40px', borderRadius: '40px', fontSize: '1.125rem', fontWeight: '500', color: 'var(--text-main)', background: 'var(--card-bg)', cursor: 'none' }}>
                  LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://dribbble.com/niskenadi" target="_blank" rel="noopener noreferrer" className="premium-card" style={{ padding: '16px 40px', borderRadius: '40px', fontSize: '1.125rem', fontWeight: '500', color: 'var(--text-main)', background: 'var(--card-bg)', cursor: 'none' }}>
                  Dribbble
                </a>
              </Magnetic>
            </div>
            
            <div style={{ marginTop: '120px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--grid-line)', paddingTop: '40px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <span>© {new Date().getFullYear()} Niskenadi Trisna. All rights reserved.</span>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.5rem', fontStyle: 'italic' }}>The Grand Line</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="HRKita (HCIS Platform)"
        image={IMG_HRKITA}
        content="Designed a comprehensive Human Capital Information System from the ground up. The platform includes advanced modules for payroll, performance review, and executive dashboards. Focused on reducing friction in daily HR tasks by conducting user research and iterating on wireframes before delivering a high-fidelity design system."
      />
    </>
  );
}
