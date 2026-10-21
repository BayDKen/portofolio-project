import * as THREE from 'three';

function smoothstep(x, edge0, edge1) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function createProceduralTextures(maxAnisotropy) {
  const textures = [];
  let seed = 7183;
  const rand = () => ((seed = (seed * 16807) % 0x7fffffff) - 1) / 0x7ffffffe;

  const makeTex = (w, h, drawFn, isColor = true) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    drawFn(canvas.getContext('2d'), w, h);
    const tex = new THREE.CanvasTexture(canvas);
    if (isColor) tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = maxAnisotropy;
    textures.push(tex);
    return tex;
  };

  // 1. Rich Dark Walnut / Hogwarts Mahogany Tabletop Texture
  const walnut = makeTex(1024, 1024, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#22150e');
    grad.addColorStop(0.35, '#2b1b12');
    grad.addColorStop(0.7, '#1d120c');
    grad.addColorStop(1, '#26170f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Wood grain fibers
    for (let i = 0; i < 2400; i++) {
      const y = rand() * h;
      const x = rand() * w;
      const len = 60 + rand() * 220;
      const alpha = 0.03 + rand() * 0.07;
      ctx.strokeStyle = rand() > 0.45 ? `rgba(12, 7, 4, ${alpha})` : `rgba(82, 52, 34, ${alpha * 0.8})`;
      ctx.lineWidth = 0.6 + rand() * 1.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(
        x + len * 0.33,
        y + (rand() - 0.5) * 8,
        x + len * 0.66,
        y + (rand() - 0.5) * 8,
        x + len,
        y + (rand() - 0.5) * 4
      );
      ctx.stroke();
    }

    // Subtle plank seams
    ctx.strokeStyle = 'rgba(8, 4, 2, 0.38)';
    ctx.lineWidth = 2;
    for (const py of [256, 512, 768]) {
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }
  });
  walnut.wrapS = walnut.wrapT = THREE.RepeatWrapping;
  walnut.repeat.set(2, 2);

  // 2. Black Vauxhall Pebble Leather Cover with Gold Embossing ("T. M. RIDDLE")
  const diaryCover = makeTex(1024, 1440, (ctx, w, h) => {
    ctx.fillStyle = '#121215';
    ctx.fillRect(0, 0, w, h);

    // Fine leather grain speckles
    for (let i = 0; i < 38000; i++) {
      const v = rand() > 0.5 ? 28 : 6;
      ctx.fillStyle = `rgba(${v}, ${v}, ${v + 4}, ${0.08 + rand() * 0.14})`;
      ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 2.2, 1 + rand() * 2.2);
    }

    // Subtle aged vignette around edges
    const rad = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.2, w * 0.5, h * 0.5, h * 0.65);
    rad.addColorStop(0, 'rgba(35, 33, 38, 0.15)');
    rad.addColorStop(1, 'rgba(4, 4, 6, 0.72)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, w, h);

    // Double blind-tooled & tarnished gold frame lines
    ctx.strokeStyle = 'rgba(186, 152, 88, 0.55)';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(54, 54, w - 108, h - 108);
    ctx.strokeStyle = 'rgba(186, 152, 88, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(68, 68, w - 136, h - 136);

    // Ornate corner flourishes
    const drawCornerFlourish = (cx, cy, sx, sy) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sy);
      ctx.strokeStyle = 'rgba(204, 168, 98, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 42);
      ctx.quadraticCurveTo(0, 0, 42, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(16, 16, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };
    drawCornerFlourish(82, 82, 1, 1);
    drawCornerFlourish(w - 82, 82, -1, 1);
    drawCornerFlourish(82, h - 82, 1, -1);
    drawCornerFlourish(w - 82, h - 82, -1, -1);

    // Central Serpent / Crest Medallion
    ctx.save();
    ctx.translate(w / 2, h * 0.42);
    ctx.strokeStyle = 'rgba(196, 161, 92, 0.62)';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 92, 124, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 102, 134, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Stylized S-serpent glyph inside medallion
    ctx.strokeStyle = 'rgba(212, 175, 102, 0.78)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(22, -62);
    ctx.bezierCurveTo(-48, -68, -44, -8, 0, 0);
    ctx.bezierCurveTo(44, 8, 48, 68, -22, 62);
    ctx.stroke();
    ctx.restore();

    // Gold-foil embossed "T. M. RIDDLE" nameplate (like the movie prop!)
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(218, 182, 110, 0.88)';
    ctx.font = '700 44px Cinzel, Georgia, serif';
    ctx.fillText('T. M. RIDDLE', w / 2, h * 0.77);

    ctx.fillStyle = 'rgba(182, 148, 84, 0.62)';
    ctx.font = '500 21px Cinzel, Georgia, serif';
    ctx.fillText('MEMORIES • MCMXLIII', w / 2, h * 0.825);
    ctx.restore();
  });

  // 3. Leather Bump Map
  const leatherBump = makeTex(
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 28000; i++) {
        ctx.fillStyle = rand() > 0.5 ? '#9c9c9c' : '#646464';
        ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 2, 1 + rand() * 2);
      }
    },
    false
  );

  // 4. Aged Parchment Texture (matches Sketchfab Tom Riddle Diary pages!)
  const parchment = makeTex(1024, 1440, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w * 0.48, h * 0.48, 40, w * 0.5, h * 0.5, h * 0.75);
    grad.addColorStop(0, '#f6efe0');
    grad.addColorStop(0.65, '#eadec6');
    grad.addColorStop(0.92, '#d8c5a3');
    grad.addColorStop(1, '#bfa67e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Foxing spots and parchment fibers
    for (let i = 0; i < 6500; i++) {
      ctx.fillStyle =
        rand() > 0.45
          ? `rgba(138, 105, 68, ${0.02 + rand() * 0.05})`
          : `rgba(255, 250, 238, ${0.04 + rand() * 0.06})`;
      ctx.beginPath();
      ctx.ellipse(
        rand() * w,
        rand() * h,
        1 + rand() * 5,
        1 + rand() * 3,
        rand() * Math.PI,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Faint ruled lines
    ctx.strokeStyle = 'rgba(116, 92, 64, 0.11)';
    ctx.lineWidth = 1;
    for (let y = 140; y < h - 120; y += 38) {
      ctx.beginPath();
      ctx.moveTo(84, y);
      ctx.lineTo(w - 84, y);
      ctx.stroke();
    }

    // Preview cursive text on the 3D leaf during opening animation
    ctx.save();
    ctx.fillStyle = 'rgba(38, 26, 15, 0.72)';
    ctx.font = 'italic 34px "IM Fell English", Georgia, serif';
    ctx.fillText('Do you know anything about', 130, 320);
    ctx.fillText('the Chamber of Secrets?', 130, 372);
    ctx.restore();
  });

  // 5. Soft Contact Shadow Texture
  const contactShadow = makeTex(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 6, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(10, 5, 2, 0.62)');
    g.addColorStop(0.45, 'rgba(10, 5, 2, 0.36)');
    g.addColorStop(0.75, 'rgba(10, 5, 2, 0.12)');
    g.addColorStop(1, 'rgba(10, 5, 2, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  return {
    walnut,
    diaryCover,
    leatherBump,
    parchment,
    contactShadow,
    dispose: () => textures.forEach((t) => t.dispose())
  };
}

export function createRiddleDesk(containerEl, readerEl, openBtnEl, onReady) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  containerEl.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1a110b');

  const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  const tex = createProceduralTextures(maxAniso);

  // Orthographic camera matching taubat.app/quran desk choreography
  const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 80);
  camera.position.set(0, -18, 18);
  camera.lookAt(0, 0, 0);

  // Lighting: Warm Hogwarts Ambient + Key Directional + Flickering Candle PointLight
  const hemiLight = new THREE.HemisphereLight('#ffeedd', '#2b1d14', 0.85);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight('#fff3df', 1.75);
  dirLight.position.set(-5.5, -7.5, 13);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  Object.assign(dirLight.shadow.camera, {
    left: -10,
    right: 10,
    top: 8,
    bottom: -8,
    near: 0.5,
    far: 38
  });
  dirLight.shadow.normalBias = 0.006;
  dirLight.shadow.bias = -0.0001;
  scene.add(dirLight);

  const candleLight = new THREE.PointLight('#ff9d3b', 2.4, 14, 1.5);
  candleLight.position.set(-3.4, 2.2, 2.2);
  scene.add(candleLight);

  const rimLight = new THREE.DirectionalLight('#6bc4a6', 0.28);
  rimLight.position.set(6, 5, 8);
  scene.add(rimLight);

  // 1. Tabletop Plane
  const tableMat = new THREE.MeshStandardMaterial({
    map: tex.walnut,
    bumpMap: tex.walnut,
    bumpScale: 0.004,
    roughness: 0.72,
    metalness: 0.05
  });
  const tableMesh = new THREE.Mesh(new THREE.PlaneGeometry(42, 28), tableMat);
  tableMesh.position.set(0, 0, -0.04);
  tableMesh.receiveShadow = true;
  scene.add(tableMesh);

  const addContactShadow = (parent, w, h, x = 0.06, y = -0.06, z = -0.032, opacity = 0.85) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        map: tex.contactShadow,
        transparent: true,
        opacity,
        depthWrite: false
      })
    );
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  // =========================================================================
  // 2. THE 3D TOM MARVOLO RIDDLE DIARY (Closed -> Riffle Opening -> Open)
  // =========================================================================
  const diaryRoot = new THREE.Group();
  diaryRoot.name = 'TomRiddleDiary3D';
  scene.add(diaryRoot);

  addContactShadow(diaryRoot, 3.4, 4.2, 0.08, -0.1, -0.025, 0.9);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: '#17161b',
    roughness: 0.68,
    metalness: 0.08,
    bumpMap: tex.leatherBump,
    bumpScale: 0.0025
  });

  const frontCoverMat = new THREE.MeshStandardMaterial({
    map: tex.diaryCover,
    bumpMap: tex.leatherBump,
    bumpScale: 0.002,
    roughness: 0.58,
    metalness: 0.14
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: '#c5a059',
    roughness: 0.32,
    metalness: 0.86
  });

  const paperBlockMat = new THREE.MeshStandardMaterial({
    color: '#eadec7',
    roughness: 0.92,
    metalness: 0.02
  });

  const pageSurfaceMat = new THREE.MeshStandardMaterial({
    map: tex.parchment,
    roughness: 0.88,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const pageW = 2.15;
  const pageH = 3.05;
  const coverW = pageW + 0.12;
  const coverH = pageH + 0.14;
  const coverThick = 0.045;
  const blockThick = 0.14;

  // Back Cover Board (Right side when closed, stays on right)
  const backCover = new THREE.Mesh(
    new THREE.BoxGeometry(coverW, coverH, coverThick),
    leatherMat
  );
  backCover.position.set(coverW / 2, 0, coverThick / 2);
  backCover.castShadow = true;
  backCover.receiveShadow = true;
  diaryRoot.add(backCover);

  // Brass Corners on Back Cover
  const addBrassCorners = (boardGroup, signX = 1) => {
    const cSize = 0.28;
    const cThick = coverThick + 0.012;
    const cornerGeo = new THREE.BoxGeometry(cSize, cSize, cThick);
    const xEdge = signX * (coverW - cSize / 2 + 0.006);
    for (const yDir of [-1, 1]) {
      const corner = new THREE.Mesh(cornerGeo, brassMat);
      corner.position.set(xEdge, yDir * (coverH / 2 - cSize / 2 + 0.006), coverThick / 2);
      corner.castShadow = true;
      boardGroup.add(corner);
    }
  };
  addBrassCorners(diaryRoot, 1);

  // Right Paper Block (resting on back cover)
  const rightBlock = new THREE.Mesh(
    new THREE.BoxGeometry(pageW, pageH, blockThick),
    paperBlockMat
  );
  rightBlock.position.set(pageW / 2 + 0.02, 0, coverThick + blockThick / 2);
  rightBlock.castShadow = true;
  rightBlock.receiveShadow = true;
  diaryRoot.add(rightBlock);

  // Top surface of right paper block (parchment texture)
  const rightTopPage = new THREE.Mesh(
    new THREE.PlaneGeometry(pageW, pageH),
    pageSurfaceMat
  );
  rightTopPage.position.set(pageW / 2 + 0.02, 0, coverThick + blockThick + 0.002);
  rightTopPage.receiveShadow = true;
  diaryRoot.add(rightTopPage);

  // Spine Ridge & Raised Ribs along X = 0
  const totalClosedHeight = coverThick * 2 + blockThick * 2 + 0.02;
  const spineMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, coverH, totalClosedHeight),
    leatherMat
  );
  spineMesh.position.set(0, 0, totalClosedHeight / 2);
  spineMesh.castShadow = true;
  diaryRoot.add(spineMesh);

  for (let i = -2; i <= 2; i++) {
    const rib = new THREE.Mesh(
      new THREE.BoxGeometry(0.125, 0.045, totalClosedHeight + 0.01),
       i === 0 ? brassMat : leatherMat
    );
    rib.position.set(0, i * 0.56, totalClosedHeight / 2);
    diaryRoot.add(rib);
  }

  // Left Paper Block Pivot (swings open from spine X = 0)
  const leftBlockPivot = new THREE.Group();
  leftBlockPivot.position.set(0, 0, coverThick + blockThick);
  diaryRoot.add(leftBlockPivot);

  const leftBlock = new THREE.Mesh(
    new THREE.BoxGeometry(pageW, pageH, blockThick),
    paperBlockMat
  );
  leftBlock.position.set(pageW / 2 + 0.02, 0, blockThick / 2);
  leftBlock.castShadow = true;
  leftBlock.receiveShadow = true;
  leftBlockPivot.add(leftBlock);

  const leftTopPage = new THREE.Mesh(
    new THREE.PlaneGeometry(pageW, pageH),
    pageSurfaceMat
  );
  leftTopPage.position.set(pageW / 2 + 0.02, 0, -0.002);
  leftTopPage.rotation.y = Math.PI;
  leftBlockPivot.add(leftTopPage);

  // 4 Riffle Leaves (bend dynamically in 3D as the diary opens/closes, just like taubat.app/quran!)
  const riffleLeaves = Array.from({ length: 4 }, (_, idx) => {
    const hinge = new THREE.Group();
    hinge.position.set(0.01, 0, coverThick + blockThick + 0.004 * (idx + 1));
    diaryRoot.add(hinge);

    const geo = new THREE.PlaneGeometry(pageW, pageH - 0.02, 24, 4);
    geo.translate(pageW / 2, 0, 0);
    const mesh = new THREE.Mesh(geo, pageSurfaceMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    hinge.add(mesh);
    return { hinge, geo, mesh };
  });

  // Front Cover Pivot (top cover when closed, swings -180 deg to the left when opened)
  const frontCoverPivot = new THREE.Group();
  frontCoverPivot.position.set(0, 0, totalClosedHeight - coverThick / 2);
  diaryRoot.add(frontCoverPivot);

  const frontCoverMaterials = [
    leatherMat,
    leatherMat,
    leatherMat,
    leatherMat,
    frontCoverMat, // Top face: embossed T. M. RIDDLE cover
    leatherMat
  ];
  const frontCover = new THREE.Mesh(
    new THREE.BoxGeometry(coverW, coverH, coverThick),
    frontCoverMaterials
  );
  frontCover.position.set(coverW / 2, 0, 0);
  frontCover.castShadow = true;
  frontCover.receiveShadow = true;
  frontCoverPivot.add(frontCover);

  // Brass corners on Front Cover
  const cSize = 0.28;
  for (const yDir of [-1, 1]) {
    const corner = new THREE.Mesh(
      new THREE.BoxGeometry(cSize, cSize, coverThick + 0.014),
      brassMat
    );
    corner.position.set(coverW - cSize / 2 + 0.006, yDir * (coverH / 2 - cSize / 2 + 0.006), 0);
    frontCoverPivot.add(corner);
  }

  // =========================================================================
  // 3. 3D PEWTER INKWELL & ANIMATED FEATHER QUILL (Sketchfab Reference!)
  // =========================================================================
  const inkwellGroup = new THREE.Group();
  inkwellGroup.name = 'PewterInkwell';
  scene.add(inkwellGroup);
  addContactShadow(inkwellGroup, 1.5, 1.5, 0.05, -0.05, -0.02, 0.85);

  const pewterMat = new THREE.MeshStandardMaterial({
    color: '#434750',
    roughness: 0.28,
    metalness: 0.82
  });
  const darkInkMat = new THREE.MeshStandardMaterial({
    color: '#07090d',
    roughness: 0.06,
    metalness: 0.35
  });

  // Lathed silhouette matching Sketchfab's tiered round pewter inkwell
  const inkwellPoints = [
    [0.0, 0.0],
    [0.54, 0.0],
    [0.56, 0.05],
    [0.52, 0.11],
    [0.48, 0.15],
    [0.36, 0.22],
    [0.24, 0.34],
    [0.19, 0.46],
    [0.22, 0.51],
    [0.20, 0.56],
    [0.14, 0.56],
    [0.13, 0.42]
  ].map(([r, y]) => new THREE.Vector2(r, y));

  const inkwellGeo = new THREE.LatheGeometry(inkwellPoints, 64);
  inkwellGeo.rotateX(Math.PI / 2);
  const inkwellMesh = new THREE.Mesh(inkwellGeo, pewterMat);
  inkwellMesh.castShadow = true;
  inkwellMesh.receiveShadow = true;
  inkwellGroup.add(inkwellMesh);

  const inkSurface = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), darkInkMat);
  inkSurface.position.set(0, 0, 0.53);
  inkwellGroup.add(inkSurface);

  // 3D Feather Quill (stands upright at an angle, writing or hovering over the diary/inkwell)
  const quillGroup = new THREE.Group();
  quillGroup.name = 'AnimatedFeatherQuill';
  scene.add(quillGroup);

  const quillPivot = new THREE.Group();
  // Tilt the quill gracefully like in the Sketchfab thumbnail
  quillPivot.rotation.set(0.28, 0.24, -0.18);
  quillGroup.add(quillPivot);

  // Nib (Brass tip)
  const nibMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.024, 0.18, 16),
    brassMat
  );
  nibMesh.rotation.x = -Math.PI / 2;
  nibMesh.position.set(0, 0, 0.09);
  nibMesh.castShadow = true;
  quillPivot.add(nibMesh);

  // Dark Calamus / Rachis (Center shaft curving upward)
  const shaftCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0.16),
    new THREE.Vector3(0.02, -0.03, 0.75),
    new THREE.Vector3(0.08, -0.08, 1.45),
    new THREE.Vector3(0.18, -0.15, 2.25)
  ]);
  const shaftMat = new THREE.MeshStandardMaterial({
    color: '#2e241b',
    roughness: 0.55,
    metalness: 0.1
  });
  const shaftMesh = new THREE.Mesh(
    new THREE.TubeGeometry(shaftCurve, 32, 0.022, 10, false),
    shaftMat
  );
  shaftMesh.castShadow = true;
  quillPivot.add(shaftMesh);

  // Sculpted Feather Vane with realistic cream/tan barbs (matching Sketchfab)
  const vaneGeo = new THREE.PlaneGeometry(0.46, 1.65, 16, 42);
  const posAttr = vaneGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i); // -0.23 .. 0.23
    const y = posAttr.getY(i); // -0.825 .. 0.825
    const normY = (y + 0.825) / 1.65; // 0 (bottom of feather) -> 1 (tip)
    // Taper envelope of feather vane
    const profile = Math.sin(Math.pow(normY, 0.65) * Math.PI) * (1 - 0.15 * normY);
    // Slight barb notches at specific heights like Sketchfab model
    const notch =
      (Math.abs(normY - 0.32) < 0.025 && x > 0) ||
      (Math.abs(normY - 0.58) < 0.022 && x < 0) ||
      (Math.abs(normY - 0.76) < 0.02 && x > 0)
        ? 0.55
        : 1.0;
    const shapedX = x * profile * notch;
    const curveX = 0.03 + 0.15 * Math.pow(normY, 1.35);
    const curveY = -0.04 - 0.11 * Math.pow(normY, 1.35) + Math.abs(x) * 0.12;
    const zHeight = 0.55 + normY * 1.68;
    posAttr.setXYZ(i, shapedX + curveX, curveY, zHeight);
  }
  vaneGeo.computeVertexNormals();

  const vaneMat = new THREE.MeshStandardMaterial({
    color: '#d8caa9',
    roughness: 0.78,
    metalness: 0.04,
    side: THREE.DoubleSide
  });
  const vaneMesh = new THREE.Mesh(vaneGeo, vaneMat);
  vaneMesh.castShadow = true;
  vaneMesh.receiveShadow = true;
  quillPivot.add(vaneMesh);

  // =========================================================================
  // 4. AMBIENT HOGWARTS DARK-ACADEMIA DESK PROPS (Candles, Spellbooks, Seal)
  // =========================================================================
  const propsGroup = new THREE.Group();
  scene.add(propsGroup);

  // 4A. Brass Candlesticks with Flickering Flames (Upper Left)
  const candleGroup = new THREE.Group();
  propsGroup.add(candleGroup);
  addContactShadow(candleGroup, 1.8, 1.8, 0.05, -0.05, -0.02, 0.8);

  const saucer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.58, 0.48, 0.06, 40),
    brassMat
  );
  saucer.rotation.x = Math.PI / 2;
  saucer.position.z = 0.03;
  saucer.castShadow = true;
  saucer.receiveShadow = true;
  candleGroup.add(saucer);

  const waxMat = new THREE.MeshStandardMaterial({
    color: '#ece2cc',
    roughness: 0.42,
    metalness: 0.02
  });
  const flameMat = new THREE.MeshBasicMaterial({ color: '#ffcf6b' });
  const flameGlowMat = new THREE.MeshBasicMaterial({
    color: '#ff8811',
    transparent: true,
    opacity: 0.38
  });

  const flames = [];
  [
    { x: -0.16, y: 0.1, h: 0.85, r: 0.15 },
    { x: 0.2, y: -0.12, h: 0.54, r: 0.13 }
  ].forEach(({ x, y, h, r }) => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.06, h, 28), waxMat);
    pillar.rotation.x = Math.PI / 2;
    pillar.position.set(x, y, 0.06 + h / 2);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    candleGroup.add(pillar);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.18, 16), flameMat);
    flame.rotation.x = Math.PI / 2;
    flame.position.set(x, y, 0.06 + h + 0.1);
    candleGroup.add(flame);

    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), flameGlowMat);
    halo.position.set(x, y, 0.06 + h + 0.09);
    candleGroup.add(halo);
    flames.push({ flame, halo, baseZ: 0.06 + h + 0.1 });
  });

  // 4B. Stacked Vintage Hogwarts Books (Lower Left)
  const stackGroup = new THREE.Group();
  propsGroup.add(stackGroup);
  addContactShadow(stackGroup, 2.5, 3.1, 0.06, -0.08, -0.02, 0.85);

  [
    { w: 1.55, h: 2.15, d: 0.22, z: 0, rot: 0.18, color: '#1b3326' }, // Slytherin Emerald
    { w: 1.44, h: 2.02, d: 0.2, z: 0.22, rot: -0.06, color: '#3b1c1a' }, // Dark Oxblood
    { w: 1.32, h: 1.88, d: 0.18, z: 0.42, rot: 0.09, color: '#1c2433' } // Raven Midnight
  ].forEach(({ w, h, d, z, rot, color }) => {
    const bWrap = new THREE.Group();
    bWrap.position.z = z;
    bWrap.rotation.z = rot;
    stackGroup.add(bWrap);

    const bMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.72,
      bumpMap: tex.leatherBump,
      bumpScale: 0.002
    });
    const cover = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bMat);
    cover.position.z = d / 2;
    cover.castShadow = true;
    cover.receiveShadow = true;
    bWrap.add(cover);

    const pages = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.06, h - 0.08, d - 0.04),
      paperBlockMat
    );
    pages.position.set(0.03, 0, d / 2);
    bWrap.add(pages);
  });

  // 4C. Salazar Slytherin Wax Seal & Brass Stamp (Lower Right)
  const sealGroup = new THREE.Group();
  propsGroup.add(sealGroup);
  const waxSealMat = new THREE.MeshStandardMaterial({
    color: '#1b4d38',
    roughness: 0.38,
    metalness: 0.15
  });
  const waxSeal = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.04, 32), waxSealMat);
  waxSeal.rotation.x = Math.PI / 2;
  waxSeal.position.set(0, 0, 0.02);
  waxSeal.castShadow = true;
  sealGroup.add(waxSeal);

  const stampHandle = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.48, 24), brassMat);
  stampHandle.rotation.z = 0.45;
  stampHandle.position.set(0.36, -0.22, 0.14);
  stampHandle.castShadow = true;
  sealGroup.add(stampHandle);

  // =========================================================================
  // 5. CAMERA CHOREOGRAPHY, QUILL ANIMATION & INTERACTION LOOP
  // =========================================================================
  let disposed = false;
  let openProgress = 0; // 0 = closed on desk, 1 = open reading spread
  let animRaf = 0;
  let quillState = { mode: 'idle', normX: 0.5, normY: 0.5 };

  const projectBoundsToScreen = (obj, width, height) => {
    obj.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(obj);
    const screenBox = new THREE.Box2();
    for (const x of [box.min.x, box.max.x]) {
      for (const y of [box.min.y, box.max.y]) {
        for (const z of [box.min.z, box.max.z]) {
          const v = new THREE.Vector3(x, y, z).project(camera);
          screenBox.expandByPoint(
            new THREE.Vector2(((v.x + 1) * width) / 2, ((1 - v.y) * height) / 2)
          );
        }
      }
    }
    return screenBox;
  };

  const updateLayoutAndBook = (now = performance.now()) => {
    if (disposed) return;
    const rect = containerEl.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    if (renderer.getPixelRatio() !== dpr) renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);

    // Phase sub-curves matching taubat.app/quran
    const t = Math.max(0, Math.min(1, openProgress));
    const coverOpen = smoothstep(t, 0.04, 0.72);
    const paperOpen = smoothstep(t, 0.14, 0.82);
    const camBlend = smoothstep(t, 0.18, 0.88);
    const readerReveal = smoothstep(t, 0.84, 1.0);

    const aspect = width / height;
    const isCompact = width <= 860;
    const frustumH = THREE.MathUtils.lerp(isCompact ? 7.2 : 6.2, isCompact ? 5.6 : 5.0, camBlend);
    const frustumW = frustumH * aspect;

    // Camera glides from 40deg angled view to 0deg top-down view
    const tiltRad = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(40, 0, camBlend));
    const camDist = 22;
    const lookX = THREE.MathUtils.lerp(0.35, 0, camBlend);
    const lookY = THREE.MathUtils.lerp(-0.1, 0, camBlend);
    const lookZ = 0.15;

    camera.left = -frustumW / 2;
    camera.right = frustumW / 2;
    camera.top = frustumH / 2;
    camera.bottom = -frustumH / 2;
    camera.position.set(
      lookX,
      lookY - camDist * Math.sin(tiltRad),
      lookZ + camDist * Math.cos(tiltRad)
    );
    camera.lookAt(lookX, lookY, lookZ);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    // Rotate the diary from a casual 16deg desk angle to 0deg straight when opened
    const closedCenterOffset = -coverW * 0.42 * (1 - coverOpen);
    diaryRoot.position.set(closedCenterOffset, 0, 0);
    diaryRoot.rotation.z = THREE.MathUtils.degToRad(-14) * (1 - camBlend);

    // Swing Front Cover (-180deg) and Left Paper Block
    frontCoverPivot.rotation.y = -Math.PI * coverOpen;
    frontCoverPivot.position.z = THREE.MathUtils.lerp(
      totalClosedHeight - coverThick / 2,
      coverThick / 2,
      coverOpen
    );

    leftBlockPivot.rotation.y = -Math.PI * paperOpen;
    leftBlockPivot.visible = paperOpen > 0.02;

    // Animate the 4 Riffle Leaves with sinusoidal 3D page arch (taubat.app style!)
    for (let i = 0; i < riffleLeaves.length; i++) {
      const { hinge, geo, mesh } = riffleLeaves[i];
      const leafProg = smoothstep(paperOpen, 0.04 * i, 0.86 + 0.04 * i);
      hinge.rotation.y = -Math.PI * leafProg;
      mesh.visible = paperOpen > 0.01 && paperOpen < 0.99;
      if (mesh.visible) {
        const pos = geo.attributes.position;
        for (let v = 0; v < pos.count; v++) {
          const u = pos.getX(v) / pageW;
          const arch = Math.sin(u * Math.PI) * Math.sin(leafProg * Math.PI) * 0.22;
          pos.setZ(v, arch);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
      }
    }

    // Position the Pewter Inkwell & Props around the diary
    const sideSpread = Math.max(2.9, Math.min(frustumW * 0.38, 4.4));
    inkwellGroup.position.set(
      THREE.MathUtils.lerp(2.15, sideSpread, camBlend),
      THREE.MathUtils.lerp(-0.25, -0.35, camBlend),
      0
    );

    candleGroup.position.set(-sideSpread * 0.95, 1.55, 0);
    stackGroup.position.set(-sideSpread * 0.98, -1.25, 0);
    sealGroup.position.set(sideSpread * 0.92, -1.55, 0);

    // Animate Candle Flicker
    const flicker =
      Math.sin(now * 0.008) * 0.12 +
      Math.sin(now * 0.019) * 0.08 +
      Math.cos(now * 0.031) * 0.05;
    candleLight.intensity = 2.35 + flicker * 0.9;
    candleLight.position.set(-sideSpread * 0.95 + flicker * 0.08, 1.55, 2.2);
    flames.forEach(({ flame, halo }, idx) => {
      flame.scale.set(1 + flicker * 0.18, 1 + flicker * 0.25, 1 - flicker * 0.1);
      flame.rotation.z = flicker * (idx ? -0.25 : 0.25);
      halo.scale.setScalar(1 + flicker * 0.2);
    });

    // Animate 3D Feather Quill (Sketchfab tom-riddle-diary-animated style!)
    const sec = now * 0.001;
    if (openProgress < 0.5) {
      // When diary is closed or opening: quill floats & traces an enchanted arc between inkwell and diary
      const hoverX = THREE.MathUtils.lerp(
        1.15 + Math.sin(sec * 1.4) * 0.28,
        inkwellGroup.position.x,
        openProgress
      );
      const hoverY = -0.15 + Math.cos(sec * 1.1) * 0.22;
      const hoverZ = 0.38 + Math.sin(sec * 2.2) * 0.07;
      quillGroup.position.set(hoverX, hoverY, hoverZ);
      quillPivot.rotation.set(
        0.28 + Math.sin(sec * 1.7) * 0.06,
        0.24 + Math.cos(sec * 1.3) * 0.08,
        -0.18 + Math.sin(sec * 0.9) * 0.05
      );
    } else if (quillState.mode === 'casting') {
      // Dipping into the pewter inkwell!
      quillGroup.position.set(
        inkwellGroup.position.x,
        inkwellGroup.position.y,
        0.35 + Math.sin(sec * 6) * 0.12
      );
      quillPivot.rotation.set(0.18, 0.15, -0.1);
    } else {
      // Perched attentively in the pewter inkwell on the right side of the desk
      quillGroup.position.set(
        inkwellGroup.position.x + 0.02,
        inkwellGroup.position.y + 0.02,
        0.36 + Math.sin(sec * 1.8) * 0.02
      );
      quillPivot.rotation.set(
        0.32 + Math.sin(sec * 1.2) * 0.03,
        0.28 + Math.cos(sec * 1.1) * 0.03,
        -0.15
      );
    }

    if (readerEl) {
      readerEl.style.setProperty('--reader-reveal', readerReveal > 0.5 ? '1' : '0');
    }

    // Position the invisible/interactive "Tap the Diary to begin" button right over the 3D closed diary
    if (openBtnEl && openProgress === 0) {
      const box = projectBoundsToScreen(diaryRoot, width, height);
      const pad = 18;
      Object.assign(openBtnEl.style, {
        left: `${Math.max(12, box.min.x - pad)}px`,
        top: `${Math.max(12, box.min.y - pad)}px`,
        width: `${Math.min(width - 24, box.max.x - box.min.x + pad * 2)}px`,
        height: `${Math.min(height - 24, box.max.y - box.min.y + pad * 2)}px`
      });
    }

    renderer.render(scene, camera);
  };

  // Ambient animation loop for candle flicker & floating quill
  let loopRaf = 0;
  const tick = (now) => {
    if (disposed) return;
    updateLayoutAndBook(now);
    loopRaf = requestAnimationFrame(tick);
  };
  loopRaf = requestAnimationFrame(tick);

  // ResizeObserver using devicePixelContentBoxSize pattern from modern-web-guidance
  const resizeObserver = new ResizeObserver(() => {
    updateLayoutAndBook(performance.now());
  });
  const supportsDPC =
    typeof ResizeObserverEntry !== 'undefined' &&
    'devicePixelContentBoxSize' in ResizeObserverEntry.prototype;
  try {
    resizeObserver.observe(
      containerEl,
      supportsDPC ? { box: 'device-pixel-content-box' } : undefined
    );
  } catch {
    resizeObserver.observe(containerEl);
  }

  // Notify ready
  setTimeout(() => {
    if (!disposed && onReady) onReady();
  }, 60);

  const animateOpenState = (target, onComplete) => {
    if (disposed) return;
    cancelAnimationFrame(animRaf);
    const start = openProgress;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 50 : (target > start ? 2100 : 1850) * Math.abs(target - start);
    const t0 = performance.now();

    const step = (now) => {
      if (disposed) return;
      const p = duration > 0 ? Math.min(1, (now - t0) / duration) : 1;
      openProgress = THREE.MathUtils.lerp(start, target, p);
      if (p < 1) {
        animRaf = requestAnimationFrame(step);
      } else {
        openProgress = target;
        if (onComplete) onComplete();
      }
    };
    animRaf = requestAnimationFrame(step);
  };

  return {
    openDiary(cb) {
      animateOpenState(1, cb);
    },
    closeDiary(cb) {
      animateOpenState(0, cb);
    },
    setQuillState(mode, normX = 0.5, normY = 0.5) {
      quillState = { mode, normX, normY };
    },
    setTheme(theme) {
      if (theme === 'dark') {
        scene.background.set('#0b0f0d');
        hemiLight.intensity = 0.45;
        dirLight.intensity = 0.9;
        rimLight.intensity = 0.65;
      } else {
        scene.background.set('#1a110b');
        hemiLight.intensity = 0.85;
        dirLight.intensity = 1.75;
        rimLight.intensity = 0.28;
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(loopRaf);
      cancelAnimationFrame(animRaf);
      resizeObserver.disconnect();
      tex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
