/**
 * Comprehensive Case Study Data for Flagship Log Pose Projects:
 * 1. HRKita (Enterprise Human Capital Information System & Payroll)
 * 2. Seradia (All-in-One Wedding Management Platform)
 */

export const CASE_STUDIES = [
  {
    id: 'hrkita',
    slug: 'hrkita',
    num: '01',
    badge: 'Enterprise Flagship',
    title: 'HRKita Platform',
    headline: 'Enterprise Human Capital Information System & Executive Payroll Portal',
    tagline: 'Streamlining high-density enterprise workforce operations with modular tokens and human-centered ergonomics.',
    category: 'Enterprise HCIS & SaaS',
    role: 'Lead Product & UI/UX Designer',
    timeline: '8 Months • Multi-phase Enterprise Rollout',
    deliverables: [
      'Design System & 180+ Semantic Tokens',
      'High-Density HCIS Navigation Architecture',
      'Automated PPh 21 & BPJS Payroll Engine UX',
      'Multi-Level Executive Approval Flow',
      'Workforce Intelligence Analytics'
    ],
    videoUrl: '/assets/preview_hrkita.mp4',
    posterUrl: '/assets/hrkita_thumb.png',
    liveUrl: null,
    metrics: [
      {
        value: '-40%',
        label: 'Payroll Processing Time',
        detail: 'Reduced complex monthly batch payroll calculation from 4 business days to same-day verification.'
      },
      {
        value: '99.98%',
        label: 'Calculation Accuracy',
        detail: 'Eliminated formula drift across tiered tax brackets (PPh 21 TER) and health allowance deductions.'
      },
      {
        value: '3.2x',
        label: 'Approval Velocity',
        detail: 'Contextual preview cards enabled executive managers to sign off on leave and payroll without navigating deep menus.'
      },
      {
        value: '180+',
        label: 'Design Tokens',
        detail: 'Unified dark/light contrast rules, tabular typography, and responsive density presets across 12 modules.'
      }
    ],
    clientOverview: 'HRKita is an enterprise-grade Human Capital Information System (HCIS) engineered to manage distributed workforces across multi-branch corporations in Indonesia. Designed to eliminate the operational chaos of disparate spreadsheets, outdated legacy portals, and fragile payroll calculations.',
    theChallenge: {
      summary: 'High cognitive overload, compliance vulnerabilities, and data fatigue across multi-tier corporate hierarchies.',
      points: [
        {
          title: 'High-Density Cognitive Fatigue',
          description: 'HR administrators spent up to 6 hours daily parsing hundreds of dense table rows with conflicting visual hierarchies, leading to frequent operator fatigue and verification mistakes.'
        },
        {
          title: 'Complex Tax & Statutory Compliance',
          description: 'Navigating evolving Indonesian tax regulations (such as PPh 21 TER tariffs and BPJS tiers) required cumbersome manual reconciliations with zero automated validation.'
        },
        {
          title: 'Disjointed Approval Bottlenecks',
          description: 'Department heads and C-level executives were overwhelmed by buried email alerts and non-contextual approval requests, delaying payroll disbursements.'
        }
      ]
    },
    theSolution: {
      summary: 'A unified, ergonomic design system with progressive disclosure, tailored data density, and contextual approval workflows.',
      points: [
        {
          title: 'Scalable Component System & Density Modes',
          description: 'Built a modular component library offering both "Compact Mode" (for power-user data analysts) and "Comfortable Mode" (for executive reviews), supported by monospace tabular numerals for effortless column scanning.'
        },
        {
          title: 'Interactive Multi-Step Payroll Wizard',
          description: 'Re-architected the payroll engine into a guided 4-step wizard with automated discrepancy flags, real-time formula previews, and instant anomaly detection.'
        },
        {
          title: 'Mobile-Optimized Executive Sign-Off',
          description: 'Designed a lightweight executive companion view allowing managers to inspect salary rollups, overtime spikes, and variance reports directly from their mobile devices with biometric approval.'
        }
      ]
    },
    modules: [
      {
        name: 'Payroll Engine & Tax Automations',
        desc: 'Real-time calculation of gross-to-net compensations, automated PPh 21 TER tariff application, BPJS Ketenagakerjaan/Kesehatan deductions, and automated payslip distribution.',
        tag: 'Core Engine'
      },
      {
        name: 'Employee 360 & Organizational Chart',
        desc: 'Interactive visual org hierarchy with dynamic filtering, career progression timelines, compensation histories, and document vaults.',
        tag: 'Workforce Core'
      },
      {
        name: 'Attendance & Roster Synchronization',
        desc: 'Geo-fenced mobile clock-in integrations, automated shift swaps, overtime verification queues, and holiday balance tracking.',
        tag: 'Operations'
      },
      {
        name: 'Audit Trail & Compliance Guardian',
        desc: 'Immutable version histories for every salary adjustment, bonus allocation, or permission override to ensure full compliance with internal audit standards.',
        tag: 'Governance'
      }
    ],
    impact: 'HRKita replaced three legacy legacy systems with a singular unified portal. The platform was adopted across 8 regional business divisions, supporting over 4,500 active employees with a 94% user satisfaction rate.',
    nextProjectId: 'seradia'
  },
  {
    id: 'seradia',
    slug: 'seradia',
    num: '02',
    badge: 'Live Production',
    title: 'Seradia Platform',
    headline: 'Modern All-in-One Wedding Management Platform & Curated Editorial Invitations',
    tagline: 'Bridging high-end editorial aesthetics with synchronized wedding planning utilities for couples and organizers.',
    category: 'Flagship Platform & B2C/B2B SaaS',
    role: 'Lead Product & UI/UX Designer',
    timeline: '6 Months • Active Production & Continuous Updates',
    deliverables: [
      'End-to-End Product Architecture & Strategy',
      'Editorial Luxury Design System & Typography Pairing',
      'Real-Time WhatsApp & Web RSVP Synchronization',
      'Interactive Smart Budget & Vendor Collaboration Suite',
      'Responsive Web Application (Desktop & Mobile)'
    ],
    videoUrl: '/assets/preview_seradia.mp4',
    posterUrl: '/assets/thumb_seradia.png',
    liveUrl: 'https://seradia.vercel.app/',
    metrics: [
      {
        value: '5 Modules',
        label: 'All-in-One Ecosystem',
        detail: 'Seamlessly merges Smart Budgeting, Guest RSVP, Vendor Directory, Checklist, and Digital Invites in one cohesive portal.'
      },
      {
        value: '100%',
        label: 'Real-Time RSVP Sync',
        detail: 'Live attendee tallying, dietary requirements, and instant seat allocation across both web and instant messaging.'
      },
      {
        value: '65+ Hours',
        label: 'Planning Time Saved',
        detail: 'Automated countdown milestones and vendor task delegation eliminate repetitive manual spreadsheets.'
      },
      {
        value: '4.9 / 5.0',
        label: 'Aesthetic & UX Rating',
        detail: 'Praised by couples and wedding organizers for delivering warm luxury editorial typography with zero clutter.'
      }
    ],
    clientOverview: 'Seradia (seradia.vercel.app) is an integrated wedding management web platform built to solve the anxiety, fragmented communication, and budget overruns that typically haunt couples and wedding planners throughout the wedding journey.',
    theChallenge: {
      summary: 'Wedding planning involves hundreds of moving pieces, emotional stress, chaotic chat groups, and disconnected spreadsheets.',
      points: [
        {
          title: 'The "Spreadsheet Chaos" Epidemic',
          description: 'Couples juggle 6 to 10 disconnected Excel/Google Sheets files for guest names, vendor payments, seating charts, and day-of minute rundowns, resulting in version conflicts and lost data.'
        },
        {
          title: 'Clunky Legacy Wedding Websites',
          description: 'Existing invitation platforms are filled with intrusive ads, generic cookie-cutter templates, and poor mobile typography that ruin the intimate luxury experience couples desire.'
        },
        {
          title: 'Vendor Misalignment on the Big Day',
          description: 'Without a centralized rundown, catering, decorators, makeup artists, and photographers often operate on conflicting schedules, causing high stress for organizers.'
        }
      ]
    },
    theSolution: {
      summary: 'An editorial luxury sanctuary where thoughtful design meets powerful planning utilities.',
      points: [
        {
          title: 'Warm Editorial Minimalism',
          description: 'Crafted a bespoke design system pairing Cormorant Garamond serif with clean Inter typography, muted golden champagne accents, and spacious layouts that evoke the feel of high-end bridal magazines.'
        },
        {
          title: 'Smart Budget Allocation & Milestone Tracker',
          description: 'An intuitive financial dashboard that automatically breaks down total wedding ceilings into recommended industry categories, tracks down payments, and alerts before budget breaches happen.'
        },
        {
          title: 'Frictionless Guest & RSVP Management',
          description: 'Enables couples to import contacts, assign dynamic VIP badges, track dietary preferences, and send personalized RSVP links that automatically synchronize into the master table planner.'
        }
      ]
    },
    modules: [
      {
        name: 'Smart Budgeting & Expense Engine',
        desc: 'Real-time financial dashboard with category ceiling limits, payment due date calendar, down-payment tracking, and visual expense breakdown graphs.',
        tag: 'Financial'
      },
      {
        name: 'Guest List & Live RSVP Coordination',
        desc: 'Interactive attendee tracker with party size counters, dietary restriction flags, WhatsApp invitation links, and instant check-in verification.',
        tag: 'Guests'
      },
      {
        name: 'Wedding Checklist & Day-Of Timeline',
        desc: 'Categorized monthly milestones countdown transitioning into a minute-by-minute day-of rundown with designated PIC and vendor assignments.',
        tag: 'Execution'
      },
      {
        name: 'Curated Vendor Directory & Collaboration',
        desc: 'Direct vendor contact hub, contract repository, invoice archives, and aesthetic moodboard attachments for each service provider.',
        tag: 'Vendors'
      },
      {
        name: 'Luxury Digital Invitations & RSVP Portal',
        desc: 'Immersive guest-facing invitations featuring background audio scores, love story timelines, countdown clocks, virtual gift registry with QR payments, and live guestbook wishes.',
        tag: 'Public Experience'
      }
    ],
    impact: 'Seradia is live in production at seradia.vercel.app, empowering modern couples and wedding organizers with a serene, stress-free planning workflow. It serves as both a high-functioning SaaS tool and a bespoke digital keepsake.',
    nextProjectId: 'hrkita'
  }
];

export function getCaseStudyById(id) {
  if (!id) return null;
  const cleanId = id.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  return CASE_STUDIES.find(cs => cs.id === cleanId || cs.slug === cleanId) || null;
}
