import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRiddleDesk } from './TomRiddleDesk3D';
import './TomRiddleDiary.css';

const IDLE_CAST_DELAY_MS = 1500;
const CHAR_WRITE_DELAY_MS = 38;
const MAX_VISIT_QUESTIONS = 15;

const STARTER_PROMPTS = [
  'Hello? My name is Harry Potter.',
  'Do you know anything about the Chamber of Secrets?',
  'Who is the Heir of Slytherin?',
  'Can you show me your memories from 1943?'
];

const TOM_RIDDLE_SYSTEM_PROMPT = `You are Tom Marvolo Riddle, a 16-year-old Hogwarts Head Boy and Slytherin Prefect from the year 1943, speaking through your enchanted black leather diary.
Rules for your response:
- Keep your reply concise (1 to 3 sentences, maximum 320 characters) so it fits gracefully on a parchment diary page.
- Speak in refined, polite, slightly archaic, enigmatic 1940s British boarding-school prose.
- Never use markdown formatting (*, #, bullets) or emojis. Plain prose only.
- Gradually hint at the Chamber of Secrets, Hogwarts fifty years ago, Hagrid, Aragog, Salazar Slytherin, and how memory lives forever within these pages.`;

function cleanResponseText(raw) {
  return String(raw || '')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 380);
}

function getFallbackRiddleReply(userText) {
  const q = (userText || '').toLowerCase();
  if (q.includes('harry') || q.includes('hello') || q.includes('hi ') || q === 'hi' || q.includes('who are you') || q.includes('name')) {
    return 'Hello, dear friend. My name is Tom Riddle. How did you come by my diary? Someone tried to flush it away, yet its pages remember everything.';
  }
  if (q.includes('chamber') || q.includes('secret')) {
    return 'Of course I know about the Chamber of Secrets. In my fifth year, the Chamber was opened and a monster attacked several students, until I caught the person who opened it.';
  }
  if (q.includes('heir') || q.includes('slytherin') || q.includes('salazar')) {
    return 'Salazar Slytherin built a hidden chamber within the castle before he left Hogwarts, sealing within it a creature only his true Heir could command.';
  }
  if (q.includes('hagrid') || q.includes('monster') || q.includes('aragog')) {
    return 'Rubeus Hagrid kept a creature hidden in a dungeon cupboard during my fifth year. Headmaster Dippet believed that beast was the monster of the Chamber.';
  }
  if (q.includes('memory') || q.includes('memories') || q.includes('1943') || q.includes('show') || q.includes('fifty')) {
    return 'A memory is a curious thing when poured into enchanted ink. I cannot merely tell you what transpired on the thirteenth of June, but if you wish, I can let you see inside my memory.';
  }
  if (q.includes('voldemort') || q.includes('marvolo') || q.includes('horcrux')) {
    return 'You speak a name known only to my deepest ambitions. Tom Marvolo Riddle is merely the mask I wore in the corridors of Hogwarts; what I shall become is eternal.';
  }
  return 'How fascinating that you confide in these old pages. Tell me more of your thoughts, dear friend — a diary such as mine thrives upon the secrets poured into its parchment.';
}

async function recognizeHandwritingStrokes(strokes, width, height) {
  if (!strokes || strokes.length === 0) return '';
  const ink = strokes
    .filter((s) => s.points && s.points.length > 0)
    .map((s) => [
      s.points.map((p) => Math.round(p.x)),
      s.points.map((p) => Math.round(p.y)),
      s.points.map((p) => Math.round(p.t))
    ]);

  if (ink.length === 0) return '';

  try {
    const res = await fetch(
      'https://inputtools.google.com/request?itc=en-t-i0-handwrit&app=demopage',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          options: 'enable_pre_space',
          requests: [
            {
              writing_guide: {
                writing_area_width: Math.round(width || 500),
                writing_area_height: Math.round(height || 700)
              },
              ink,
              language: 'en'
            }
          ]
        })
      }
    );
    if (!res.ok) throw new Error('Handwriting API status ' + res.status);
    const data = await res.json();
    if (data && data[0] === 'SUCCESS' && data[1]?.[0]?.[1]?.length > 0) {
      const topCandidate = String(data[1][0][1][0] || '').trim();
      return topCandidate;
    }
  } catch (err) {
    console.warn('Handwriting OCR fallback triggered:', err);
  }
  return '';
}

async function conjureTomRiddleReply(promptText, history = []) {
  const recentMessages = history.slice(-4).flatMap((h) => [
    { role: 'user', content: h.you },
    { role: 'assistant', content: h.tom }
  ]);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    const res = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'openai',
        messages: [
          { role: 'system', content: TOM_RIDDLE_SYSTEM_PROMPT },
          ...recentMessages,
          { role: 'user', content: promptText }
        ]
      })
    });
    clearTimeout(timer);
    if (res.ok) {
      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content;
      if (content && content.trim().length > 4) {
        return cleanResponseText(content);
      }
    }
  } catch (err) {
    console.warn('Using local Tom Riddle memory engine:', err);
  }
  return getFallbackRiddleReply(promptText);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function TomRiddleDiary({ onBackToPortfolio }) {
  // Phase: 'closed' | 'opening' | 'reading' | 'closing'
  const [phase, setPhase] = useState('closed');
  // View environment: 'desk' | 'focus' | 'dark'
  const [viewMode, setViewMode] = useState('desk');
  const [deskReady, setDeskReady] = useState(false);

  // Book Spread Pages (5 spreads, each storing its own chronicle of memories)
  const [currentSpread, setCurrentSpread] = useState(0);
  const [turnDirection, setTurnDirection] = useState(null); // 'next' | 'prev' | null
  const [spreadMemories, setSpreadMemories] = useState(() => [
    [
      {
        id: 'prologue-1943',
        you: '13th June, 1943 — Property of T. M. Riddle',
        tom: 'Strange how a blank diary can hold a soul’s keenest memories. Write to me with your quill, and I shall answer from fifty years ago.'
      }
    ],
    [],
    [],
    [],
    []
  ]);

  // Potterhand Canvas State
  const [activeTool, setActiveTool] = useState('pen'); // 'pen' | 'eraser'
  const [spellStatus, setSpellStatus] = useState('idle'); // 'idle' | 'reading' | 'fading' | 'writing'
  const [transcribedText, setTranscribedText] = useState('');
  const [conjuredReply, setConjuredReply] = useState('');
  const [questionsLeft, setQuestionsLeft] = useState(MAX_VISIT_QUESTIONS);
  const [showKeyboardBar, setShowKeyboardBar] = useState(false);
  const [keyboardInput, setKeyboardInput] = useState('');
  const [showSketchfabModal, setShowSketchfabModal] = useState(false);

  // Animated 2D/3D Feather Quill Overlay position on Right Page
  const [quillOverlay, setQuillOverlay] = useState({
    visible: false,
    x: 180,
    y: 160,
    angle: -12
  });

  const sceneContainerRef = useRef(null);
  const readerWrapRef = useRef(null);
  const openTargetRef = useRef(null);
  const deskInstanceRef = useRef(null);

  const canvasRef = useRef(null);
  const strokesRef = useRef([]);
  const activeStrokeRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const idleTimerRef = useRef(null);
  const inkOpacityRef = useRef(1);
  const spellStatusRef = useRef('idle');

  useEffect(() => {
    spellStatusRef.current = spellStatus;
  }, [spellStatus]);

  // Initialize Three.js 3D Desk & Tom Riddle Diary
  useEffect(() => {
    let cancelled = false;
    if (sceneContainerRef.current && readerWrapRef.current) {
      try {
        deskInstanceRef.current = createRiddleDesk(
          sceneContainerRef.current,
          readerWrapRef.current,
          openTargetRef.current,
          () => {
            if (!cancelled) setDeskReady(true);
          }
        );
      } catch (err) {
        console.error('WebGL fallback to direct reading mode:', err);
        setPhase('reading');
      }
    }
    return () => {
      cancelled = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (deskInstanceRef.current) {
        deskInstanceRef.current.dispose();
        deskInstanceRef.current = null;
      }
    };
  }, []);

  // Redraw strokes on the Right Page Parchment Canvas
  const renderCanvasStrokes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const alpha = inkOpacityRef.current;
    if (alpha <= 0.01) {
      ctx.restore();
      return;
    }

    const isDark = viewMode === 'dark';
    const inkColor = isDark ? `rgba(224, 212, 186, ${alpha})` : `rgba(36, 23, 12, ${alpha})`;
    const glowColor = isDark
      ? `rgba(201, 164, 92, ${alpha * 0.35})`
      : `rgba(82, 54, 26, ${alpha * 0.22})`;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = inkColor;
    ctx.fillStyle = inkColor;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = alpha < 0.85 ? 4 : 1;

    const allStrokes = activeStrokeRef.current
      ? [...strokesRef.current, activeStrokeRef.current]
      : strokesRef.current;

    for (const stroke of allStrokes) {
      const pts = stroke.points;
      if (!pts || pts.length === 0) continue;

      if (pts.length === 1) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }

      // Draw calligraphic fountain-pen / quill stroke with subtle width variation
      ctx.beginPath();
      ctx.lineWidth = stroke.width || 2.35;
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }

    ctx.restore();
  }, [viewMode]);

  // High-DPI ResizeObserver for the Parchment Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = window.devicePixelRatio || 1;
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        renderCanvasStrokes();
      }
    };

    syncCanvasSize();
    const ro = new ResizeObserver(syncCanvasSize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [phase, renderCanvasStrokes]);

  useEffect(() => {
    renderCanvasStrokes();
  }, [viewMode, renderCanvasStrokes]);

  // Open & Close 3D Diary Choreography (Taubat Quran style)
  const handleOpenDiary = () => {
    if (phase !== 'closed' || !deskReady) return;
    setPhase('opening');
    if (deskInstanceRef.current) {
      deskInstanceRef.current.openDiary(() => {
        setPhase('reading');
      });
    } else {
      setPhase('reading');
    }
  };

  const handleCloseDiary = () => {
    if (phase !== 'reading') return;
    setViewMode('desk');
    setPhase('closing');
    if (deskInstanceRef.current) {
      deskInstanceRef.current.closeDiary(() => {
        setPhase('closed');
      });
    } else {
      setPhase('closed');
    }
  };

  const handleChangeViewMode = (nextMode) => {
    setViewMode(nextMode);
    if (deskInstanceRef.current) {
      deskInstanceRef.current.setTheme(nextMode);
    }
  };

  // 3D Page Turn Animation
  const handleTurnSpread = (dir) => {
    const nextIdx = currentSpread + dir;
    if (nextIdx < 0 || nextIdx >= spreadMemories.length || turnDirection) return;
    setTurnDirection(dir > 0 ? 'next' : 'prev');
    strokesRef.current = [];
    activeStrokeRef.current = null;
    setTranscribedText('');
    setConjuredReply('');
    renderCanvasStrokes();

    setTimeout(() => {
      setCurrentSpread(nextIdx);
      setTurnDirection(null);
    }, 620);
  };

  // Core Enchanted Parchment Spell: Fade Ink -> Conjure Tom Riddle -> Quill Writes Reply
  const executeDiarySpell = useCallback(
    async (overridePromptText = null) => {
      if (spellStatusRef.current !== 'idle') return;
      if (isPointerDownRef.current && !overridePromptText) {
        idleTimerRef.current = setTimeout(() => executeDiarySpell(null), 600);
        return;
      }

      const canvas = canvasRef.current;
      const rect = canvas ? canvas.getBoundingClientRect() : { width: 420, height: 580 };

      let userQuestion = overridePromptText ? overridePromptText.trim() : '';

      // If triggered by freehand drawing, run Google Handwriting Recognition
      if (!userQuestion) {
        if (strokesRef.current.length === 0) return;
        setSpellStatus('reading');
        if (deskInstanceRef.current) deskInstanceRef.current.setQuillState('casting');

        const recognized = await recognizeHandwritingStrokes(
          strokesRef.current,
          rect.width,
          rect.height
        );
        userQuestion =
          recognized && recognized.length >= 2
            ? recognized
            : 'Do you know anything about the Chamber of Secrets?';
      } else {
        // Animate the quill writing the prompt onto the page first if triggered via chip/keyboard
        setSpellStatus('reading');
        setConjuredReply('');
        setTranscribedText('');
        for (let i = 1; i <= userQuestion.length; i++) {
          setTranscribedText(userQuestion.slice(0, i));
          const charX = 28 + ((i * 11) % Math.max(160, rect.width - 70));
          const charY = 34 + Math.floor((i * 11) / Math.max(160, rect.width - 70)) * 30;
          setQuillOverlay({
            visible: true,
            x: charX,
            y: charY,
            angle: -10 + Math.sin(i * 0.7) * 5
          });
          await delay(24);
        }
        await delay(350);
      }

      setTranscribedText(userQuestion);

      // Start fetching Tom Riddle's AI response in parallel while the ink seeps into the parchment!
      let replyText = '';
      let replyDone = false;
      const currentHistory = spreadMemories[currentSpread] || [];

      if (questionsLeft <= 0) {
        replyText =
          'Alas, the magic within these pages must rest for tonight. Close the diary and return again soon, dear friend.';
        replyDone = true;
      } else {
        conjureTomRiddleReply(userQuestion, currentHistory)
          .then((res) => {
            replyText = res;
            setQuestionsLeft((q) => Math.max(0, q - 1));
          })
          .catch(() => {
            replyText = getFallbackRiddleReply(userQuestion);
          })
          .finally(() => {
            replyDone = true;
          });
      }

      // Fade the user's drawn ink strokes into the parchment (exact Potterhand mechanic!)
      setSpellStatus('fading');
      for (let op = 100; op >= 0; op -= 6) {
        inkOpacityRef.current = op / 100;
        renderCanvasStrokes();
        await delay(42);
      }
      strokesRef.current = [];
      activeStrokeRef.current = null;
      inkOpacityRef.current = 1;
      renderCanvasStrokes();

      // Wait until LLM reply is ready
      while (!replyDone) {
        await delay(60);
      }

      // Now Tom Riddle's enchanted quill writes his answer character-by-character!
      setSpellStatus('writing');
      if (deskInstanceRef.current) deskInstanceRef.current.setQuillState('writing');

      const lineWrapWidth = Math.max(180, rect.width - 65);
      for (let i = 1; i <= replyText.length; i++) {
        const slice = replyText.slice(0, i);
        setConjuredReply(slice);

        // Move the animated Feather Quill tip along with each character
        const approxPx = i * 11.5;
        const lineIdx = Math.floor(approxPx / lineWrapWidth);
        const colPx = approxPx % lineWrapWidth;
        setQuillOverlay({
          visible: true,
          x: 24 + colPx,
          y: 78 + lineIdx * 36 + Math.sin(i * 0.9) * 2.5,
          angle: -14 + Math.cos(i * 0.65) * 6
        });

        await delay(CHAR_WRITE_DELAY_MS);
      }

      // Hide quill after finishing sentence
      setQuillOverlay((prev) => ({ ...prev, visible: false }));
      if (deskInstanceRef.current) deskInstanceRef.current.setQuillState('idle');

      // Record exchange into the current spread's Memory Chronicle on the Left Page
      const newEntry = {
        id: `mem-${Date.now()}`,
        you: userQuestion,
        tom: replyText
      };
      setSpreadMemories((prev) => {
        const copy = [...prev];
        copy[currentSpread] = [...(copy[currentSpread] || []), newEntry];
        return copy;
      });

      setSpellStatus('idle');
    },
    [currentSpread, questionsLeft, renderCanvasStrokes, spreadMemories]
  );

  // Pointer Events on the Right Page Parchment Canvas
  const getRelativePoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, t: Date.now() };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: Date.now()
    };
  };

  const handlePointerDown = (e) => {
    if (phase !== 'reading' || spellStatus !== 'idle') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isPointerDownRef.current = true;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    // If previous Tom Riddle reply is still displayed on the right page, clear it when starting new strokes
    if (conjuredReply || transcribedText) {
      setConjuredReply('');
      setTranscribedText('');
    }

    const pt = getRelativePoint(e);

    if (activeTool === 'eraser') {
      // Erase nearby strokes
      strokesRef.current = strokesRef.current.filter(
        (s) => !s.points.some((p) => Math.hypot(p.x - pt.x, p.y - pt.y) < 24)
      );
      renderCanvasStrokes();
      return;
    }

    activeStrokeRef.current = {
      id: `st-${Date.now()}-${Math.random()}`,
      width: e.pressure && e.pressure > 0 ? 1.4 + e.pressure * 2.2 : 2.35,
      points: [pt]
    };

    setQuillOverlay({
      visible: true,
      x: pt.x,
      y: pt.y,
      angle: -12
    });

    renderCanvasStrokes();
  };

  const handlePointerMove = (e) => {
    if (phase !== 'reading') return;
    const pt = getRelativePoint(e);

    if (!isPointerDownRef.current) {
      return;
    }

    if (activeTool === 'eraser') {
      strokesRef.current = strokesRef.current.filter(
        (s) => !s.points.some((p) => Math.hypot(p.x - pt.x, p.y - pt.y) < 24)
      );
      renderCanvasStrokes();
      return;
    }

    if (activeStrokeRef.current) {
      const pts = activeStrokeRef.current.points;
      const prev = pts[pts.length - 1];
      const dx = pt.x - prev.x;
      const dy = pt.y - prev.y;
      if (dx * dx + dy * dy > 2.2) {
        pts.push(pt);
        const tilt = Math.max(-28, Math.min(8, -12 + dx * 0.45));
        setQuillOverlay({
          visible: true,
          x: pt.x,
          y: pt.y,
          angle: tilt
        });
        renderCanvasStrokes();
      }
    }
  };

  const handlePointerUpOrCancel = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (activeStrokeRef.current && activeStrokeRef.current.points.length > 0) {
      strokesRef.current = [...strokesRef.current, activeStrokeRef.current];
      activeStrokeRef.current = null;
      renderCanvasStrokes();
    }

    setQuillOverlay((prev) => ({ ...prev, visible: false }));

    if (strokesRef.current.length > 0 && spellStatusRef.current === 'idle') {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        executeDiarySpell(null);
      }, IDLE_CAST_DELAY_MS);
    }
  };

  const handleClearParchment = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    strokesRef.current = [];
    activeStrokeRef.current = null;
    inkOpacityRef.current = 1;
    setTranscribedText('');
    setConjuredReply('');
    setSpellStatus('idle');
    setQuillOverlay((prev) => ({ ...prev, visible: false }));
    renderCanvasStrokes();
  };

  const handleKeyboardSubmit = (e) => {
    e.preventDefault();
    if (!keyboardInput.trim() || spellStatus !== 'idle') return;
    const text = keyboardInput.trim();
    setKeyboardInput('');
    executeDiarySpell(text);
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
  const activeMemories = spreadMemories[currentSpread] || [];

  return (
    <div
      className="riddle-desk"
      data-phase={phase}
      data-view={viewMode}
    >
      {/* 1. Three.js 3D Desk, Closed/Opening Tom Riddle Diary, Pewter Inkwell & Floating Quill */}
      <div className="riddle-scene" ref={sceneContainerRef} aria-hidden="true" />

      {/* 2. Top Reading Room Header (Taubat + Potterhand Toolbar) */}
      <header className="riddle-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="https://www.niskenadi.com"
            className="riddle-brand-group"
            onClick={(e) => {
              if (onBackToPortfolio) {
                e.preventDefault();
                onBackToPortfolio();
              }
            }}
          >
            <span className="riddle-brand-emblem">✦</span>
            <span className="riddle-brand-title">T. M. RIDDLE</span>
            <span className="riddle-brand-divider" />
            <span className="riddle-brand-sub">The Enchanted Diary • 1943</span>
          </a>

          <a
            href="https://www.niskenadi.com/#bounties"
            className="riddle-back-link"
            onClick={(e) => {
              if (onBackToPortfolio) {
                e.preventDefault();
                onBackToPortfolio();
              }
            }}
          >
            ← Portfolio
          </a>
        </div>

        {/* Center Potterhand Quill Island (visible when diary is open) */}
        {(phase === 'reading' || phase === 'closing') && (
          <div className="riddle-controls-pill" role="toolbar" aria-label="Enchanted Quill Tools">
            <button
              type="button"
              className="riddle-pill-btn"
              aria-pressed={activeTool === 'pen' && !showKeyboardBar}
              onClick={() => {
                setActiveTool('pen');
                setShowKeyboardBar(false);
              }}
              title="Write with Feather Quill"
            >
              <span>🪶</span>
              <span>Quill</span>
            </button>
            <button
              type="button"
              className="riddle-pill-btn"
              aria-pressed={activeTool === 'eraser'}
              onClick={() => setActiveTool('eraser')}
              title="Erase Ink Strokes"
            >
              <span>🧽</span>
              <span>Eraser</span>
            </button>
            <button
              type="button"
              className="riddle-pill-btn"
              aria-pressed={showKeyboardBar}
              onClick={() => setShowKeyboardBar((v) => !v)}
              title="Toggle Keyboard Ink Input"
            >
              <span>⌨️</span>
              <span>Type</span>
            </button>
            <button
              type="button"
              className="riddle-pill-btn"
              onClick={handleClearParchment}
              disabled={spellStatus !== 'idle' && !conjuredReply}
              title="Wipe Parchment Clean"
            >
              <span>✨</span>
              <span>Clear</span>
            </button>
          </div>
        )}

        {/* Right Environment View Switcher (Desk View | Focus | Chamber Dark + 3D Ref) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {(phase === 'reading' || phase === 'closing') && (
            <div className="riddle-controls-pill" role="group" aria-label="Reading Environment">
              <button
                type="button"
                className="riddle-pill-btn"
                aria-pressed={viewMode === 'desk'}
                onClick={() => handleChangeViewMode('desk')}
              >
                Desk view
              </button>
              <button
                type="button"
                className="riddle-pill-btn"
                aria-pressed={viewMode === 'focus'}
                onClick={() => handleChangeViewMode('focus')}
              >
                Focus
              </button>
              <button
                type="button"
                className="riddle-pill-btn"
                aria-pressed={viewMode === 'dark'}
                onClick={() => handleChangeViewMode('dark')}
              >
                Dark
              </button>
            </div>
          )}

          <button
            type="button"
            className="riddle-back-link"
            onClick={() => setShowSketchfabModal(true)}
            title="Inspect Original 3D Sketchfab Diary Reference"
          >
            <span>📦</span>
            <span>3D Model</span>
          </button>
        </div>
      </header>

      {/* 3. Interactive Target Over Closed 3D Diary on Desk */}
      <button
        ref={openTargetRef}
        type="button"
        hidden={phase !== 'closed'}
        disabled={!deskReady || phase !== 'closed'}
        className="riddle-open-target"
        onClick={handleOpenDiary}
        aria-label="Open Tom Riddle's Diary"
      />

      {phase === 'closed' && (
        <button
          type="button"
          className="riddle-entry-prompt"
          onClick={handleOpenDiary}
          disabled={!deskReady}
        >
          <span className="riddle-entry-prompt-title">
            ✦ {deskReady ? 'TAP TOM RIDDLE’S DIARY TO OPEN' : 'CONJURING HOGWARTS DESK…'} ✦
          </span>
          <span className="riddle-entry-prompt-sub">
            Write on the enchanted parchment and Tom Marvolo Riddle will write back
          </span>
        </button>
      )}

      {/* 4. Open 3D Book Spread (Taubat Quran Spread + Potterhand Parchment Canvas) */}
      <div
        className="riddle-reader-wrap"
        ref={readerWrapRef}
        aria-hidden={phase !== 'reading'}
      >
        <div className="riddle-book-stage">
          <div className="riddle-book-body">
            {/* Tarnished Brass Corners */}
            <span className="riddle-brass-corner tl" aria-hidden="true" />
            <span className="riddle-brass-corner tr" aria-hidden="true" />
            <span className="riddle-brass-corner bl" aria-hidden="true" />
            <span className="riddle-brass-corner br" aria-hidden="true" />

            <div className="riddle-spread">
              <span className="riddle-stack-left" aria-hidden="true" />

              {/* LEFT PAGE: Chronicle of 1943 Memories & Quick Spell Prompts */}
              <div className="riddle-leaf riddle-leaf-left">
                <div className="riddle-leaf-chrome">
                  <span>Chronicle of Memories</span>
                  <span>Spread {romanNumerals[currentSpread]}</span>
                </div>

                <div className="riddle-leaf-content">
                  <p className="riddle-epigraph">
                    “Thirteenth of June, 1943 — Every secret poured into these pages is preserved forever within my memory.”
                  </p>

                  <div className="riddle-chronicle-scroll">
                    {activeMemories.length === 0 ? (
                      <p
                        style={{
                          fontFamily: "'IM Fell English', Georgia, serif",
                          fontStyle: 'italic',
                          fontSize: '13.5px',
                          color: 'var(--riddle-ink-muted)',
                          marginTop: '12px'
                        }}
                      >
                        This parchment spread is still blank. Write a question on the right-hand page with your quill, or tap an ink prompt below…
                      </p>
                    ) : (
                      activeMemories.map((item) => (
                        <div key={item.id} className="riddle-memory-entry">
                          <div className="riddle-memory-you">“{item.you}”</div>
                          <div className="riddle-memory-tom riddle-weathered-ink">
                            — {item.tom}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quick Enchanted Ink Prompts for Instant Demo */}
                  <div className="riddle-prompts-box">
                    <span className="riddle-prompts-label">
                      ✦ Or tap an enchanted question to inscribe:
                    </span>
                    <div className="riddle-prompt-chips">
                      {STARTER_PROMPTS.map((promptText, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="riddle-prompt-chip"
                          disabled={spellStatus !== 'idle'}
                          onClick={() => executeDiarySpell(promptText)}
                        >
                          “{promptText}”
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="riddle-leaf-foot">
                  <button
                    type="button"
                    className="riddle-turn-btn"
                    disabled={currentSpread <= 0 || !!turnDirection}
                    onClick={() => handleTurnSpread(-1)}
                  >
                    ← Prev Leaf
                  </button>
                  <span>Page {currentSpread * 2 + 1}</span>
                </div>
              </div>

              {/* CENTER SPINE GUTTER */}
              <span className="riddle-gutter" aria-hidden="true" />

              {/* RIGHT PAGE: Potterhand Interactive Enchanted Parchment */}
              <div className="riddle-leaf riddle-leaf-right">
                <div className="riddle-leaf-chrome">
                  <span>Enchanted Parchment</span>
                  <span>
                    {spellStatus === 'reading'
                      ? '✦ Deciphering Ink…'
                      : spellStatus === 'fading'
                        ? '✦ Ink Seeping into Diary…'
                        : spellStatus === 'writing'
                          ? '✦ Tom Riddle is Writing…'
                          : '✦ Ready for Quill'}
                  </span>
                </div>

                <div className="riddle-leaf-content">
                  <div className="riddle-canvas-stage">
                    {/* Freehand Quill Canvas */}
                    <canvas
                      ref={canvasRef}
                      className="riddle-drawing-canvas"
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUpOrCancel}
                      onPointerCancel={handlePointerUpOrCancel}
                    />

                    {/* Conjured Handwriting Overlay (User Ghost + Tom Riddle's Ink Reply) */}
                    <div className="riddle-conjured-overlay">
                      {transcribedText && (
                        <div
                          className="riddle-transcribed-ghost"
                          style={{
                            opacity: spellStatus === 'writing' || spellStatus === 'idle' ? 0.38 : 0.78
                          }}
                        >
                          “{transcribedText}”
                        </div>
                      )}

                      {conjuredReply && (
                        <div className="riddle-tom-handwriting riddle-weathered-ink">
                          {conjuredReply}
                        </div>
                      )}
                    </div>

                    {/* Animated 3D-Style Feather Quill + Cast Shadow (Sketchfab Reference!) */}
                    <div
                      className="riddle-quill-follower"
                      style={{
                        opacity: quillOverlay.visible ? 1 : 0,
                        transform: `translate3d(${quillOverlay.x - 12}px, ${quillOverlay.y - 208}px, 0) rotate(${quillOverlay.angle}deg)`
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 150 220"
                        width="150"
                        height="220"
                        style={{ overflow: 'visible' }}
                      >
                        {/* Diagonal Shadow Cast on Parchment (exact Sketchfab look!) */}
                        <path
                          d="M12,208 L-55,155 C-75,135 -85,115 -72,102 C-58,88 -30,115 12,208 Z"
                          fill="rgba(28, 18, 9, 0.22)"
                          filter="blur(3px)"
                        />
                        {/* Cream & Tan Feather Vane with Barb Notches */}
                        <path
                          d="M16,184 C22,145 36,92 68,42 C82,20 104,6 122,4 C126,18 118,44 106,68 L94,66 L102,76 C92,98 78,120 62,142 L50,138 L56,149 C42,168 28,180 16,184 Z"
                          fill="#dfd2b5"
                          stroke="#b8a682"
                          strokeWidth="1"
                        />
                        <path
                          d="M16,184 C12,142 22,88 52,38 C68,14 96,2 122,4 C96,36 62,98 16,184 Z"
                          fill="#cbb994"
                        />
                        {/* Dark Rachis / Calamus Shaft */}
                        <path
                          d="M12,208 C22,162 56,82 118,8"
                          fill="none"
                          stroke="#3a2b1c"
                          strokeWidth="3.6"
                          strokeLinecap="round"
                        />
                        {/* Brass Nib Tip */}
                        <polygon points="10,212 15,196 9,195" fill="#c5a059" />
                      </svg>
                    </div>
                  </div>

                  {/* Optional Keyboard Ink Input Bar */}
                  {showKeyboardBar && (
                    <form className="riddle-keyboard-bar" onSubmit={handleKeyboardSubmit}>
                      <input
                        type="text"
                        className="riddle-keyboard-input"
                        placeholder="Or type a question for Tom Riddle…"
                        value={keyboardInput}
                        onChange={(e) => setKeyboardInput(e.target.value)}
                        disabled={spellStatus !== 'idle'}
                      />
                      <button
                        type="submit"
                        className="riddle-keyboard-send"
                        disabled={!keyboardInput.trim() || spellStatus !== 'idle'}
                      >
                        Inscribe
                      </button>
                    </form>
                  )}
                </div>

                <div className="riddle-leaf-foot">
                  <span>Page {currentSpread * 2 + 2}</span>

                  <div className="riddle-page-dots" role="tablist" aria-label="Diary Spreads">
                    {spreadMemories.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`riddle-page-dot ${idx === currentSpread ? 'active' : ''}`}
                        onClick={() => {
                          if (idx !== currentSpread) {
                            handleTurnSpread(idx > currentSpread ? 1 : -1);
                          }
                        }}
                        aria-label={`Go to spread ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="riddle-turn-btn"
                    disabled={currentSpread >= spreadMemories.length - 1 || !!turnDirection}
                    onClick={() => handleTurnSpread(1)}
                  >
                    Next Leaf →
                  </button>
                </div>
              </div>

              <span className="riddle-stack-right" aria-hidden="true" />

              {/* 3D Animated Page Turner Overlay */}
              {turnDirection && (
                <div
                  className={`riddle-turner ${
                    turnDirection === 'next' ? 'riddle-turner-next' : 'riddle-turner-prev'
                  }`}
                >
                  <div className="riddle-turner-face" />
                  <div className="riddle-turner-face riddle-turner-back" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Potterhand Floating Enchanted Parchment Banner (visible when reading) */}
      {phase === 'reading' && (
        <div className="riddle-potterhand-banner">
          <div style={{ fontSize: 'clamp(12px, 3.2vw, 14.5px)', lineHeight: 1.35 }}>
            ✦ write a question with the quill, then lift your hand and wait ✦
          </div>
          <div style={{ fontSize: 'clamp(10px, 2.6vw, 11.5px)', marginTop: 4, opacity: 0.78 }}>
            Replies are conjured by AI from 1943 memories. {questionsLeft} of {MAX_VISIT_QUESTIONS} questions left this visit.
          </div>
        </div>
      )}

      {/* 6. Bottom Reading Room Footer (Taubat Quran style Close Diary button + lore caption) */}
      <footer className="riddle-footer">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            opacity: 0.82
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#c9a45c',
              display: 'inline-block'
            }}
          />
          <span>
            Inspired by{' '}
            <a
              href="https://potterhand.sonnylab.com/"
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              Potterhand
            </a>
            ,{' '}
            <a
              href="https://www.taubat.app/quran"
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              Taubat 3D Book
            </a>{' '}
            &amp;{' '}
            <a
              href="https://sketchfab.com/3d-models/tom-riddle-diary-animated-1f3d37f5dc0b42b0a52186fc596a8135"
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              Tom Riddle Diary 3D
            </a>
          </span>
        </div>

        {(phase === 'reading' || phase === 'closing') && (
          <div className="riddle-controls-pill">
            <button
              type="button"
              className="riddle-pill-btn"
              onClick={handleCloseDiary}
              disabled={phase !== 'reading'}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 5v15M12 5C8 3 5 3 3 4v14c3-1 6 0 9 2 3-2 6-3 9-2V4c-2-1-5-1-9 1Z" />
              </svg>
              <span>Close Diary</span>
            </button>
          </div>
        )}

        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '13px',
            opacity: 0.82
          }}
        >
          “Memory is everything.”
        </div>
      </footer>

      {/* 7. Optional Sketchfab 3D Model Reference Viewer Modal */}
      {showSketchfabModal && (
        <div
          className="riddle-modal-backdrop"
          onClick={() => setShowSketchfabModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Tom Riddle Diary 3D Sketchfab Reference"
        >
          <div className="riddle-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="riddle-modal-head">
              <span>✦ Tom Riddle Diary Animated — 3D Reference (by luismi93)</span>
              <button
                type="button"
                className="riddle-back-link"
                onClick={() => setShowSketchfabModal(false)}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
              <iframe
                title="Tom Riddle diary animated"
                src="https://sketchfab.com/models/1f3d37f5dc0b42b0a52186fc596a8135/embed?autostart=1&ui_theme=dark"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
