import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// --- Placeholder Images ---
const IMG_HRKITA = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";
const IMG_IMAGIFY = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000";
const IMG_CLAY = "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000";
const OP_ZORO = "/logpose.jpg"; // Generated 3D Log Pose

// --- Components ---

const SectionHeader = ({ num, title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px' }}
  >
    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em' }}>{num}</span>
    <h2>{title}</h2>
  </motion.div>
);

const Modal = ({ isOpen, onClose, title, content, image }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            <h2 style={{ marginBottom: '16px' }}>{title}</h2>
            {image && <img src={image} alt={title} style={{ width: '100%', borderRadius: '8px', marginBottom: '24px' }} />}
            <p>{content}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: 0, position: 'relative' }}>
        <div className="glow-orb"></div>
        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', color: 'var(--accent)' }} className="glow-text">
              Hi, I'm Niskenadi Trisna Bayu
            </div>
            <h1>I navigate complex problems & <br/><span style={{ color: 'var(--text-muted)' }}>design seamless experiences.</span></h1>
            
            <div style={{ marginTop: '48px', paddingLeft: '24px', borderLeft: '3px solid var(--accent)', fontStyle: 'italic', color: 'var(--text-muted)', maxWidth: '600px' }}>
              "I don't want to conquer anything. I just think the designer with the most freedom in this ocean creates the best experiences."
              <span style={{ display: 'block', marginTop: '8px', fontSize: '0.875rem', fontWeight: 600, fontStyle: 'normal' }}>— The Grand Line Philosophy</span>
            </div>
          </motion.div>
        </div>
        
        {/* 3D Asset Character/Effect */}
        <motion.div 
          initial={{ opacity: 0, x: 50, y: 0 }} 
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [-10, 10, -10]
          }} 
          transition={{ 
            opacity: { duration: 1, delay: 0.2 },
            x: { duration: 1, delay: 0.2 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="desktop-only-image"
          style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'relative', width: '350px', height: '350px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 60px rgba(245,158,11,0.3)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <img src={OP_ZORO} alt="3D Log Pose" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, var(--bg-color) 100%)' }}></div>
          </div>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section id="case-studies">
        <SectionHeader num="01" title="The Log Pose" />
        
        <motion.div 
          style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div style={{ flex: '1 1 400px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
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
                backgroundImage: `url(${hoveredProject === 'imagify' ? IMG_IMAGIFY : IMG_CLAY})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(20px)', borderRadius: '24px'
              }}
            />
          )}
        </AnimatePresence>

        <SectionHeader num="02" title="Bounties" />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          
          <motion.a 
            href="https://imagify-tools.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onMouseEnter={() => setHoveredProject('imagify')}
            onMouseLeave={() => setHoveredProject(null)}
            style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -5, borderColor: 'var(--accent)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            <h3>Imagify Tools</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>A web-based image manipulation and optimization tool, designed for seamless user interaction.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>

          <motion.a 
            href="https://claymorphisme.vercel.app/" target="_blank"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            onMouseEnter={() => setHoveredProject('clay')}
            onMouseLeave={() => setHoveredProject(null)}
            style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -5, borderColor: 'var(--accent)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            <h3>Claymorphism UI</h3>
            <p style={{ flexGrow: 1, margin: '16px 0' }}>An exploration of the claymorphism design trend, featuring soft, 3D UI components.</p>
            <span className="btn-link">Visit Website</span>
          </motion.a>

        </div>
      </section>

      {/* About */}
      <section id="about">
        <SectionHeader num="03" title="The Crewmate" />
        <div style={{ maxWidth: '800px' }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '24px' }}>
            I am a UI/UX Designer with more than three years of experience developing digital products across manufacturing and technology.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '24px' }}>
            Dedicated to tailoring designs to user needs while following trusted design system principles. I combine user-centered design expertise with hands-on front-end development knowledge.
          </motion.p>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 style={{ marginBottom: '16px', marginTop: '48px' }}>Ready to set sail?</h3>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <a href="mailto:niskenaditrisnab@gmail.com" className="btn-link">niskenaditrisnab@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '48px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>© 2026 Niskenadi Trisna Bayu. Navigating the digital sea.</p>
      </footer>

      {/* Modal for HRKita */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="HRKita - HCIS Platform"
        image={IMG_HRKITA}
        content="This project involved deep research into human resources workflows. I designed an intuitive dashboard that simplified complex payroll operations and employee management. The design system was built from scratch to ensure scalability across the entire platform, reducing task completion time by 25%."
      />
    </div>
  );
}
