import React from 'react';

export default function NiskenadiLogo({ size = 24, className = '', style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Niskenadi Logo"
      role="img"
    >
      <defs>
        <linearGradient id="meridian-diag-grad" x1="28" y1="28" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#34D399" />
        </linearGradient>
      </defs>
      
      {/* Celestial Compass Track / Log Pose Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="rgba(255, 255, 255, 0.22)" 
        strokeWidth="2.5" 
        strokeDasharray="4 4" 
      />
      
      {/* Cardinal Orientation Ticks */}
      <circle cx="50" cy="10" r="3" fill="#34D399" />
      <circle cx="90" cy="50" r="2.2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="50" cy="90" r="2.2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="10" cy="50" r="2.2" fill="#FFFFFF" opacity="0.6" />

      {/* Modernist N Monogram */}
      <path d="M34 28 V72" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
      <path d="M34 30 L66 70" stroke="url(#meridian-diag-grad)" strokeWidth="7" strokeLinecap="round" />
      <path d="M66 28 V72" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />

      {/* Meridian Focus Node */}
      <circle cx="50" cy="50" r="4" fill="#C084FC" />
      <circle cx="50" cy="50" r="7.5" stroke="#34D399" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.8" />
    </svg>
  );
}
