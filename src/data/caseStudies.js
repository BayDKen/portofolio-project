/**
 * Comprehensive Case Study Data for Flagship Log Pose Projects:
 * 1. HRKita (Enterprise Human Capital Information System & Payroll)
 * 2. Seradia (All-in-One Wedding Management Platform)
 * 3. UBS E-Voting (Enterprise Cooperative E-Voting Platform & Real-Time Sync)
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
    nextProjectId: 'evoting'
  },
  {
    id: 'evoting',
    slug: 'evoting',
    num: '03',
    badge: 'Enterprise Platform',
    title: 'UBS E-Voting Platform',
    headline: 'High-Concurrency Enterprise Cooperative E-Voting System & Real-Time Tally Engine',
    tagline: 'Empowering on-premise cooperative elections with instant RFID authentication, dual-TPS offline sync, and SHA-256 cryptographic audit trails.',
    category: 'Enterprise Election & Hardware Integration',
    role: 'Lead Product & System Architect / UI/UX',
    timeline: '4 Months • On-Premise Production Deployment',
    deliverables: [
      'Touch-Optimized Kiosk Tap-to-Vote UX',
      'Dual-TPS Real-Time Sync & Conflict Resolution',
      'SHA-256 Cryptographic Ballot Seal Architecture',
      'Live Television Scoreboard & 3D Doorprize Globe',
      'Hardware Integration (USB-HID RFID Readers & Thermal Slips)'
    ],
    videoUrl: null,
    posterUrl: '/assets/thumb_evoting.png',
    liveUrl: null,
    metrics: [
      {
        value: '99.99%',
        label: 'System Uptime & Stability',
        detail: 'Zero downtime or ballot loss during peak concurrent voting periods across all polling station kiosks.'
      },
      {
        value: '< 3 Sec',
        label: 'Rapid Voter Verification',
        detail: 'Instant tap-and-verify workflow with USB-HID RFID badges, replacing slow manual paper roster lookups.'
      },
      {
        value: '100%',
        label: 'Cryptographic Auditability',
        detail: 'Every single ballot sealed with SHA-256 cryptographic hash and indexed into an immutable local audit trail.'
      },
      {
        value: '2 TPS',
        label: 'Real-Time Bidirectional Sync',
        detail: 'Dual polling stations synchronized continuously with zero single point of failure and automated offline recovery.'
      }
    ],
    clientOverview: 'The UBS E-Voting Platform is an enterprise-grade cooperative election system engineered for on-premise execution with zero dependency on external public internet. Designed to handle high-turnout corporate elections transparently, securely, and with zero voter friction.',
    theChallenge: {
      summary: 'High voter concurrency, manual roster verification bottlenecks, and the critical need for zero-trust cryptographic transparency.',
      points: [
        {
          title: 'Manual Roster Lookup Bottlenecks',
          description: 'Traditional paper rosters caused voter queue congestion, human lookup errors, and potential duplicate voting vulnerabilities.'
        },
        {
          title: 'On-Premise Network Unpredictability',
          description: 'Relying on public cloud servers risked connection drops during critical voting windows, demanding a fully self-contained offline-first local network architecture.'
        },
        {
          title: 'Electoral Integrity & Audit Transparency',
          description: 'Ballot counting needed to be 100% tamper-evident, cryptographically verifiable, and presented live to participants without delay.'
        }
      ]
    },
    theSolution: {
      summary: 'An offline-ready kiosk architecture pairing instant RFID authentication with real-time TPS replication and cryptographic ballot verification.',
      points: [
        {
          title: 'Instant RFID Tap-to-Vote Experience',
          description: 'Voters simply tap their corporate RFID badge on the kiosk reader. The system validates voting eligibility, unlocks the digital ballot, and securely consumes the one-time token immediately upon submission.'
        },
        {
          title: 'Dual-TPS Offline Sync & Resilience',
          description: 'Engineered an offline-first bidirectional replication protocol between Polling Stations (TPS-01 and TPS-02) that resolves conflicts and resumes syncing instantly if a cable or switch is disrupted.'
        },
        {
          title: 'SHA-256 Tamper-Evident Ballot Sealing',
          description: 'Each submitted vote is cryptographically sealed with a SHA-256 digital hash, generating an immutable audit ledger and live television scoreboard broadcasts.'
        }
      ]
    },
    modules: [
      {
        name: 'Kiosk Tap-to-Vote Terminal',
        desc: 'Ergonomic touch-first voting interface with instant USB-HID RFID identification, candidate comparison sheets, and confirmation safeguards.',
        tag: 'Voter Terminal'
      },
      {
        name: 'Dual-TPS Synchronization Engine',
        desc: 'High-availability bidirectional sync keeping multiple polling station databases synchronized in real time with local offline resilience.',
        tag: 'Sync Protocol'
      },
      {
        name: 'Cryptographic Ballot Guardian',
        desc: 'SHA-256 digital ballot seals, immutable audit trail generation, and tamper-detection safeguards to guarantee electoral integrity.',
        tag: 'Security & Audit'
      },
      {
        name: 'Live TV Scoreboard & 3D Doorprize Globe',
        desc: 'Dynamic real-time scoreboard for stage displays and an interactive 3D lottery sphere for post-election doorprize drawings.',
        tag: 'Broadcast Experience'
      }
    ],
    impact: 'Successfully deployed in enterprise cooperative elections, conducting rapid, tamper-evident voting with 100% data integrity, sub-3-second voter throughput, and seamless dual-station live synchronization.',
    nextProjectId: 'hrkita'
  }
];

export function getCaseStudyById(id) {
  if (!id) return null;
  const cleanId = id.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  return CASE_STUDIES.find(cs => cs.id === cleanId || cs.slug === cleanId) || null;
}
