/* =====================================================================
   MAK BPO & Telecommunications — 3D building hero scene (Three.js)
   Procedural recreation of the MAK BPO head office in Rawalpindi: cream
   split-face stone facade, four floors of blue reflective glass ribbons with
   awning windows, warm up/down wall sconces, the blue "MAK BPO &
   TELECOMMUNICATIONS PVT.LTD." signboard, red ground-floor fascia with
   down-lights, AC units, mesh shutters and the glass entrance — plus a
   starfield / light-streak fly-in, rising light beams and orbiting rings.
   Used by <Hero3D />. createBuildingScene() returns { dispose() }.
   Note: written against the three@0.128 API (pinned in package.json).
   ===================================================================== */
import * as THREE from "three";

export default function createBuildingScene(opts) {
  var canvas = opts.canvas, wrap = opts.wrap, hero = opts.hero, onFallback = opts.onFallback;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  var isTouch = window.matchMedia("(hover: none)").matches;
  var disposed = false, disposeFns = [], api = { dispose: function () { disposed = true; disposeFns.forEach(function (f) { try { f(); } catch (e) {} }); disposeFns = []; } };
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); disposeFns.push(function () { t.removeEventListener(ev, fn, o); }); }
  function showFallback() { if (disposed) return; canvas.style.display = "none"; if (onFallback) onFallback(); }
  function hasWebGL() {
    try { var c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; }
  }
  function fontsReady() {
    var p = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    return Promise.race([p, new Promise(function (r) { setTimeout(r, 1500); })]);
  }
  if (!hasWebGL()) { showFallback(); return api; }
  fontsReady().then(function () { if (!disposed) { try { init(); } catch (e) { console.error("3D scene failed:", e); showFallback(); } } });

  /* =================================================================
     Canvas texture factories
     ================================================================= */
  function cv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function rand(seed) { /* deterministic pseudo random */ var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  // Full front facade: 10 units wide x 14.1 units tall  ->  1024 x 1444 px (102.4 px/unit)
  var W = 10, D = 7.6, H = 14.1, PX = 102.4;
  var FLOOR_BOTTOMS = [3.7, 6.3, 8.9, 11.5], RIBBON_H = 1.7, RIBBON_W = 7.8, BAYS = 6;
  var OPEN = [[0, 2], [0], [0, 2, 5], [0, 2]];     // awning windows open per floor (bottom floor first)
  var SPLIT = [[5], [2, 5], [], [5]];              // bays with a transom split

  function stoneFill(ctx, w, h, rnd, opts) {
    opts = opts || {};
    var tw = opts.tw || 82, th = opts.th || 59;
    ctx.fillStyle = "#b9a885"; ctx.fillRect(0, 0, w, h);
    var row = 0;
    for (var y = 0; y < h; y += th, row++) {
      var off = (row % 2) ? tw / 2 : 0;
      for (var x = -tw; x < w + tw; x += tw) {
        var l = 0.86 + rnd() * 0.16;
        var r = Math.round(222 * l), g = Math.round(205 * l), b = Math.round(170 * l);
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x + off + 1.5, y + 1.5, tw - 3, th - 3);
        // split-face shading: a lighter top-left and darker bottom-right edge
        ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(x + off + 1.5, y + 1.5, tw - 3, 3);
        ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(x + off + 1.5, y + th - 4.5, tw - 3, 3);
        // speckle
        for (var k = 0; k < 6; k++) {
          ctx.fillStyle = rnd() > 0.5 ? "rgba(255,255,255,0.12)" : "rgba(60,40,20,0.10)";
          ctx.fillRect(x + off + 4 + rnd() * (tw - 10), y + 4 + rnd() * (th - 10), 2 + rnd() * 5, 1 + rnd() * 3);
        }
      }
    }
  }
  function warmGlow(ctx, x, y, rx, ry, alpha, up) {
    ctx.save(); ctx.translate(x, y); ctx.scale(rx / 100, ry / 100);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    g.addColorStop(0, "rgba(255,205,130," + alpha + ")");
    g.addColorStop(0.45, "rgba(255,170,90," + (alpha * 0.45) + ")");
    g.addColorStop(1, "rgba(255,150,60,0)");
    ctx.fillStyle = g; ctx.beginPath();
    if (up === true) ctx.rect(-100, -100, 200, 100); else if (up === false) ctx.rect(-100, 0, 200, 100); else ctx.rect(-100, -100, 200, 200);
    ctx.fill(); ctx.restore();
  }

  function makeFacadeTexture(THREE) {
    var w = 1024, h = 1444, c = cv(w, h), ctx = c.getContext("2d"), rnd = rand(7);
    stoneFill(ctx, w, h, rnd);
    // subtle large-scale shading (darker toward edges, warmer near lights)
    var vg = ctx.createLinearGradient(0, 0, w, 0);
    vg.addColorStop(0, "rgba(0,0,0,0.22)"); vg.addColorStop(0.18, "rgba(0,0,0,0)"); vg.addColorStop(0.82, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.22)");
    ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
    // top parapet band (dark navy) + thin cap line
    ctx.fillStyle = "#1a2033"; ctx.fillRect(0, 0, w, 0.5 * PX);
    ctx.fillStyle = "#2b3350"; ctx.fillRect(0, 0, w, 6);
    // wall sconces: fixture + up/down light cones per floor
    FLOOR_BOTTOMS.forEach(function (fb) {
      var yc = h - (fb + RIBBON_H / 2) * PX;
      [56, w - 56].forEach(function (x) {
        warmGlow(ctx, x, yc - 14, 70, 150, 0.85, true);
        warmGlow(ctx, x, yc + 14, 80, 170, 0.9, false);
        ctx.fillStyle = "#15181f"; ctx.fillRect(x - 9, yc - 14, 18, 28);
        ctx.fillStyle = "#ffd9a0"; ctx.fillRect(x - 7, yc - 16, 14, 3); ctx.fillRect(x - 7, yc + 13, 14, 3);
      });
    });
    // soft blue spill from the signboard
    var sg = ctx.createRadialGradient(w / 2, h - 3.1 * PX, 10, w / 2, h - 3.1 * PX, 330);
    sg.addColorStop(0, "rgba(70,110,255,0.35)"); sg.addColorStop(1, "rgba(70,110,255,0)");
    ctx.fillStyle = sg; ctx.fillRect(0, h - 5 * PX, w, 2.6 * PX);
    // shadow line under each window ribbon
    FLOOR_BOTTOMS.forEach(function (fb) {
      var yb = h - fb * PX;
      var lg = ctx.createLinearGradient(0, yb, 0, yb + 26);
      lg.addColorStop(0, "rgba(0,0,0,0.35)"); lg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lg; ctx.fillRect(1.1 * PX, yb, w - 2.2 * PX, 26);
    });
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeStoneTexture(THREE, repeatX, repeatY, seed) {
    var c = cv(512, 512), ctx = c.getContext("2d");
    stoneFill(ctx, 512, 512, rand(seed || 3), { tw: 82, th: 59 });
    ctx.fillStyle = "rgba(0,0,0,0.06)"; ctx.fillRect(0, 0, 512, 512);
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeatX, repeatY); return t;
  }
  function makeGlassTexture(THREE, floor) {
    var w = 1024, h = 224, c = cv(w, h), ctx = c.getContext("2d"), rnd = rand(11 + floor * 13);
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#2a4a8a"); g.addColorStop(0.35, "#17305f"); g.addColorStop(1, "#0a1836");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // sky reflection sweep
    var sg = ctx.createLinearGradient(0, 0, w, h);
    sg.addColorStop(0, "rgba(140,180,255,0)"); sg.addColorStop(0.5, "rgba(140,180,255,0.18)"); sg.addColorStop(1, "rgba(140,180,255,0)");
    ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h);
    // interior: ceiling line + warm lights visible through the glass
    var bayW = w / BAYS;
    for (var b = 0; b < BAYS; b++) {
      var x0 = b * bayW;
      ctx.fillStyle = "rgba(255,230,190,0.06)"; ctx.fillRect(x0 + 10, 18, bayW - 20, 30);
      var n = 1 + (rnd() > 0.6 ? 1 : 0);
      for (var k = 0; k < n; k++) {
        var lx = x0 + bayW * (0.25 + rnd() * 0.5), ly = 38 + rnd() * 28;
        var lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 26);
        lg.addColorStop(0, "rgba(255,240,200,1)"); lg.addColorStop(0.25, "rgba(255,215,150,0.9)"); lg.addColorStop(1, "rgba(255,190,110,0)");
        ctx.fillStyle = lg; ctx.fillRect(lx - 26, ly - 26, 52, 52);
        // light streak falling down the glass
        var sl = ctx.createLinearGradient(0, ly, 0, ly + 120);
        sl.addColorStop(0, "rgba(255,210,140,0.22)"); sl.addColorStop(1, "rgba(255,210,140,0)");
        ctx.fillStyle = sl; ctx.fillRect(lx - 14, ly, 28, 120);
      }
      // occasional silhouette of a tree reflection (bottom corners)
      if (rnd() > 0.7) { ctx.fillStyle = "rgba(30,60,30,0.25)"; ctx.beginPath(); ctx.arc(x0 + bayW * 0.8, h * 0.85, 40, 0, Math.PI * 2); ctx.fill(); }
    }
    // frames: outer border, mullions, transoms
    ctx.fillStyle = "#07090f";
    ctx.fillRect(0, 0, w, 7); ctx.fillRect(0, h - 7, w, 7); ctx.fillRect(0, 0, 7, h); ctx.fillRect(w - 7, 0, 7, h);
    for (var m = 1; m < BAYS; m++) ctx.fillRect(m * bayW - 3.5, 0, 7, h);
    SPLIT[floor].forEach(function (sb) { ctx.fillRect(sb * bayW, h * 0.55 - 3, bayW, 6); });
    OPEN[floor].forEach(function (ob) { ctx.fillRect(ob * bayW, h * 0.47 - 3, bayW, 6); });
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeSignTexture(THREE) {
    var w = 1024, h = 246, c = cv(w, h), ctx = c.getContext("2d");
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#2a44ff"); g.addColorStop(0.5, "#1d33ee"); g.addColorStop(1, "#1628c9");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 6; ctx.strokeRect(3, 3, w - 6, h - 6);
    ctx.fillStyle = "#ffffff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = "800 150px Sora, 'Arial Black', 'Segoe UI Black', Arial, sans-serif";
    ctx.fillText("MAK BPO", w / 2, h * 0.43);
    ctx.font = "700 40px Sora, 'Arial Black', Arial, sans-serif";
    ctx.fillText("& TELECOMMUNICATIONS   PVT.LTD.", w / 2, h * 0.84);
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeFasciaTexture(THREE) {
    var w = 1024, h = 64, c = cv(w, h), ctx = c.getContext("2d");
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#9c1413"); g.addColorStop(0.45, "#d42422"); g.addColorStop(1, "#b11c1a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < 6; i++) {
      var x = w * (0.09 + i * 0.164), y = h * 0.42;
      var lg = ctx.createRadialGradient(x, y, 0, x, y, 30);
      lg.addColorStop(0, "rgba(255,250,220,1)"); lg.addColorStop(0.3, "rgba(255,220,160,0.85)"); lg.addColorStop(1, "rgba(255,180,100,0)");
      ctx.fillStyle = lg; ctx.fillRect(x - 30, y - 30, 60, 60);
    }
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeInteriorTexture(THREE) {
    var w = 1024, h = 256, c = cv(w, h), ctx = c.getContext("2d"), rnd = rand(42);
    var g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#1a1f2e"); g.addColorStop(1, "#070910");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // ceiling lights
    for (var i = 0; i < 9; i++) {
      var x = 60 + i * 112, y = 34;
      var lg = ctx.createRadialGradient(x, y, 0, x, y, 60);
      lg.addColorStop(0, "rgba(255,235,190,1)"); lg.addColorStop(0.2, "rgba(255,210,140,0.7)"); lg.addColorStop(1, "rgba(255,180,100,0)");
      ctx.fillStyle = lg; ctx.fillRect(x - 60, y - 60, 120, 120);
      ctx.fillStyle = "rgba(255,200,130,0.12)"; ctx.fillRect(x - 24, y, 48, h);
    }
    // floor reflection
    var fg = ctx.createLinearGradient(0, h * 0.7, 0, h); fg.addColorStop(0, "rgba(255,200,140,0)"); fg.addColorStop(1, "rgba(255,200,140,0.22)");
    ctx.fillStyle = fg; ctx.fillRect(0, h * 0.7, w, h * 0.3);
    for (var k = 0; k < 20; k++) { ctx.fillStyle = "rgba(255,255,255," + (0.03 + rnd() * 0.05) + ")"; ctx.fillRect(rnd() * w, 90 + rnd() * 120, 20 + rnd() * 60, 2); }
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeMeshTexture(THREE) {
    var s = 256, c = cv(s, s), ctx = c.getContext("2d");
    ctx.clearRect(0, 0, s, s);
    ctx.strokeStyle = "rgba(205,210,220,0.95)"; ctx.lineWidth = 3;
    var step = 32;
    for (var i = -s; i < s * 2; i += step) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + s, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(i, s); ctx.lineTo(i + s, 0); ctx.stroke();
    }
    var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3.5); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeACTexture(THREE) {
    var c = cv(256, 192), ctx = c.getContext("2d");
    ctx.fillStyle = "#e9ecef"; ctx.fillRect(0, 0, 256, 192);
    ctx.fillStyle = "#cfd4da"; for (var y = 14; y < 180; y += 12) ctx.fillRect(14, y, 228, 3);
    ctx.fillStyle = "#b9bfc7"; ctx.beginPath(); ctx.arc(96, 96, 64, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#8d949c"; ctx.beginPath(); ctx.arc(96, 96, 52, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#5e646c"; ctx.beginPath(); ctx.arc(96, 96, 14, 0, Math.PI * 2); ctx.fill();
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeGroundTexture(THREE) {
    var s = 1024, c = cv(s, s), ctx = c.getContext("2d");
    ctx.fillStyle = "#0a0f1f"; ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = "rgba(90,130,255,0.22)"; ctx.lineWidth = 1;
    for (var i = 0; i <= s; i += 48) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke(); }
    ctx.strokeStyle = "rgba(90,130,255,0.5)"; ctx.lineWidth = 2;
    for (var j = 0; j <= s; j += 192) { ctx.beginPath(); ctx.moveTo(j, 0); ctx.lineTo(j, s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(s, j); ctx.stroke(); }
    // radial alpha fade out
    var g = ctx.createRadialGradient(s / 2, s / 2, s * 0.12, s / 2, s / 2, s * 0.5);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function makeGlowSprite(THREE) {
    var s = 128, c = cv(s, s), ctx = c.getContext("2d");
    var g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,0.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }
  function makeEnvMap(THREE, skyHex, horizonHex, groundHex) {
    var faces = [];
    for (var i = 0; i < 6; i++) {
      var c = cv(128, 128), ctx = c.getContext("2d"), g;
      if (i === 2) { ctx.fillStyle = skyHex; ctx.fillRect(0, 0, 128, 128); }           // +y top
      else if (i === 3) { ctx.fillStyle = groundHex; ctx.fillRect(0, 0, 128, 128); }   // -y bottom
      else {
        g = ctx.createLinearGradient(0, 0, 0, 128);
        g.addColorStop(0, skyHex); g.addColorStop(0.55, horizonHex); g.addColorStop(0.62, groundHex); g.addColorStop(1, groundHex);
        ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
        // a couple of soft bright "city light" streaks for reflections
        ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(20 + i * 9, 40, 50, 3); ctx.fillRect(60, 52, 40, 2);
      }
      faces.push(c);
    }
    var t = new THREE.CubeTexture(faces); t.encoding = THREE.sRGBEncoding; t.needsUpdate = true; return t;
  }

  /* =================================================================
     Scene
     ================================================================= */
  function cssVar(name, fb) { var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); return v || fb; }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeOutBack(t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  function init() {
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { showFallback(); return; }
    disposeFns.push(function () { try { renderer.dispose(); } catch (e) {} });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.6 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 400);
    var env = makeEnvMap(THREE, "#3a5aa8", "#ff9f6e", "#0b1020");
    var glowTex = makeGlowSprite(THREE);
    var maxAniso = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1;

    /* ---- materials ---- */
    var facadeTex = makeFacadeTexture(THREE); facadeTex.anisotropy = maxAniso;
    var facadeMat = new THREE.MeshStandardMaterial({ map: facadeTex, roughness: 0.92, metalness: 0.02 });
    var sideStone = makeStoneTexture(THREE, 1.52, 2.8, 5), backStone = makeStoneTexture(THREE, 2.0, 2.8, 9);
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x151a28, roughness: 0.55, metalness: 0.35, envMap: env, envMapIntensity: 0.35 });
    var frameMat = new THREE.MeshStandardMaterial({ color: 0x0a0c12, roughness: 0.5, metalness: 0.6, envMap: env, envMapIntensity: 0.3 });
    var sideMat = new THREE.MeshStandardMaterial({ map: sideStone, roughness: 0.95, metalness: 0.0 });
    var backMat = new THREE.MeshStandardMaterial({ map: backStone, roughness: 0.95, metalness: 0.0 });
    var topMat = new THREE.MeshStandardMaterial({ color: 0x1a2033, roughness: 0.9 });
    var glassMats = [];

    var building = new THREE.Group();
    scene.add(building);

    /* ---- helper builders ---- */
    function box(w, h, d, mat) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.castShadow = !isMobile; m.receiveShadow = !isMobile; return m; }
    // One building slab per floor. Each slab's vertical faces are UV-mapped to the matching
    // band of the shared full-height textures, so stone courses and the facade stay continuous.
    function slab(bottom, height) {
      var geo = new THREE.BoxGeometry(W, height, D), uv = geo.attributes.uv;
      var v0 = bottom / H, v1 = (bottom + height) / H;
      [0, 4, 16, 20].forEach(function (s) { uv.setY(s, v1); uv.setY(s + 1, v1); uv.setY(s + 2, v0); uv.setY(s + 3, v0); });
      uv.needsUpdate = true;
      var m = new THREE.Mesh(geo, [sideMat, sideMat, topMat, topMat, facadeMat, backMat]);
      m.position.set(0, height / 2, 0); m.castShadow = !isMobile; m.receiveShadow = !isMobile; return m;
    }

    var floorGroups = [];
    /* ---- Ground floor group (0 -> 3.7) ---- */
    (function groundFloor() {
      var g = new THREE.Group(); g.position.y = 0; building.add(g); floorGroups.push(g);
      g.add(slab(0, 3.7));
      // side trims (dark navy vertical edges, slightly proud of the stone)
      [-1, 1].forEach(function (s) { var t = box(0.26, 3.7, 0.22, darkMat); t.position.set(s * (W / 2 - 0.13), 1.85, D / 2 + 0.06); g.add(t); });
      // interior behind shutters / doors
      var interior = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.6, 2.1), new THREE.MeshStandardMaterial({ map: makeInteriorTexture(THREE), emissive: 0xffffff, emissiveMap: null, roughness: 1, emissiveIntensity: 0 }));
      interior.material.emissiveMap = interior.material.map; interior.material.emissiveIntensity = 0.55;
      interior.position.set(0, 1.07, D / 2 - 0.45); g.add(interior);
      // mesh shutters (4 panels) + central glass door
      var meshMat = new THREE.MeshStandardMaterial({ map: makeMeshTexture(THREE), transparent: true, alphaTest: 0.2, roughness: 0.4, metalness: 0.7, envMap: env, side: THREE.DoubleSide, color: 0xdde2ea });
      [-3.85, -1.95, 1.95, 3.85].forEach(function (x) {
        var p = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.05), meshMat); p.position.set(x, 1.03, D / 2 + 0.02); g.add(p);
        var f = box(1.86, 0.08, 0.06, frameMat); f.position.set(x, 2.07, D / 2 + 0.02); g.add(f);
      });
      var doorGlass = new THREE.MeshStandardMaterial({ color: 0x8aa6c8, transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.9, envMap: env });
      var door = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.0), doorGlass); door.position.set(0, 1.0, D / 2 + 0.02); g.add(door);
      var doorFrameL = box(0.06, 2.05, 0.06, frameMat); doorFrameL.position.set(-0.77, 1.03, D / 2 + 0.03); g.add(doorFrameL);
      var doorFrameR = doorFrameL.clone(); doorFrameR.position.x = 0.77; g.add(doorFrameR);
      var doorMid = box(0.05, 2.0, 0.05, frameMat); doorMid.position.set(0, 1.0, D / 2 + 0.03); g.add(doorMid);
      var doorBar = box(1.5, 0.05, 0.05, frameMat); doorBar.position.set(0, 1.1, D / 2 + 0.04); g.add(doorBar);
      // red fascia with down-lights
      var fasciaTex = makeFasciaTexture(THREE), redMat = new THREE.MeshStandardMaterial({ color: 0xa81918, roughness: 0.6 });
      var fascia = new THREE.Mesh(new THREE.BoxGeometry(W - 0.2, 0.5, 0.3), [redMat, redMat, new THREE.MeshStandardMaterial({ color: 0x7a1010, roughness: 0.6 }), new THREE.MeshStandardMaterial({ color: 0xffd9a8, emissive: 0xffc98a, emissiveIntensity: 0.6, roughness: 0.6 }), new THREE.MeshStandardMaterial({ map: fasciaTex, emissive: 0xffffff, emissiveMap: fasciaTex, emissiveIntensity: 0.55, roughness: 0.55 }), redMat]);
      fascia.position.set(0, 2.37, D / 2 + 0.15); fascia.castShadow = !isMobile; g.add(fascia);
      var shadowStrip = box(W - 0.2, 0.1, 0.05, new THREE.MeshStandardMaterial({ color: 0x0b0d14 })); shadowStrip.position.set(0, 2.67, D / 2 + 0.02); g.add(shadowStrip);
      // AC units
      var acTex = makeACTexture(THREE);
      var acMat = new THREE.MeshStandardMaterial({ map: acTex, roughness: 0.7, metalness: 0.1 });
      var acSide = new THREE.MeshStandardMaterial({ color: 0xdfe3e8, roughness: 0.7 });
      [-4.15, 3.45, 4.5].forEach(function (x) {
        var ac = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.62, 0.34), [acSide, acSide, acSide, acSide, acMat, acSide]);
        ac.position.set(x, 2.38, D / 2 + 0.33); ac.castShadow = !isMobile; g.add(ac);
      });
      // signboard
      var signTex = makeSignTexture(THREE); signTex.anisotropy = maxAniso;
      var signFront = new THREE.MeshStandardMaterial({ map: signTex, emissive: 0xffffff, emissiveMap: signTex, emissiveIntensity: 0, roughness: 0.35, metalness: 0.1 });
      var signSide = new THREE.MeshStandardMaterial({ color: 0x1526a8, roughness: 0.5 });
      var sign = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.86, 0.14), [signSide, signSide, signSide, signSide, signFront, signSide]);
      sign.position.set(0, 3.1, D / 2 + 0.08); sign.castShadow = !isMobile; g.add(sign);
      g.userData.signMat = signFront;
      // light spill from the sign onto the stone
      var signLight = new THREE.PointLight(0x4a66ff, 0, 7, 2); signLight.position.set(0, 3.1, D / 2 + 1.1); g.add(signLight); g.userData.signLight = signLight;
      // small CCTV cameras (as in the photo, above the first-floor windows corners)
      [-4.35, 4.35].forEach(function (x) { var cam = box(0.14, 0.14, 0.26, new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.4 })); cam.position.set(x, 3.62, D / 2 + 0.12); g.add(cam); });
    })();

    /* ---- Upper floors ---- */
    FLOOR_BOTTOMS.forEach(function (fb, f) {
      var slabH = (f === 3) ? (H - fb) : 2.6;
      var g = new THREE.Group(); g.position.y = fb; building.add(g); floorGroups.push(g);
      g.add(slab(fb, slabH));
      [-1, 1].forEach(function (s) { var t = box(0.26, slabH, 0.22, darkMat); t.position.set(s * (W / 2 - 0.13), slabH / 2, D / 2 + 0.06); g.add(t); });
      if (f === 3) { var cap = box(W + 0.1, 0.12, D + 0.1, new THREE.MeshStandardMaterial({ color: 0x2b3350, roughness: 0.6, metalness: 0.4, envMap: env })); cap.position.set(0, slabH - 0.02, 0); g.add(cap); }
      // glass ribbon
      var gt = makeGlassTexture(THREE, f); gt.anisotropy = maxAniso;
      var gm = new THREE.MeshStandardMaterial({ map: gt, emissive: 0xffffff, emissiveMap: gt, emissiveIntensity: 0, roughness: 0.14, metalness: 0.75, envMap: env, envMapIntensity: 1.2 });
      glassMats.push(gm);
      var glass = new THREE.Mesh(new THREE.PlaneGeometry(RIBBON_W, RIBBON_H), gm); glass.position.set(0, RIBBON_H / 2, D / 2 + 0.012); g.add(glass);
      // outer frame
      var ft = box(RIBBON_W + 0.1, 0.07, 0.07, frameMat); ft.position.set(0, RIBBON_H, D / 2 + 0.02); g.add(ft);
      var fbm = ft.clone(); fbm.position.y = 0; g.add(fbm);
      var fl = box(0.07, RIBBON_H + 0.07, 0.07, frameMat); fl.position.set(-RIBBON_W / 2, RIBBON_H / 2, D / 2 + 0.02); g.add(fl);
      var fr = fl.clone(); fr.position.x = RIBBON_W / 2; g.add(fr);
      var bayW = RIBBON_W / BAYS;
      for (var m = 1; m < BAYS; m++) { var mu = box(0.06, RIBBON_H, 0.05, frameMat); mu.position.set(-RIBBON_W / 2 + m * bayW, RIBBON_H / 2, D / 2 + 0.02); g.add(mu); }
      // awning windows (top-hinged, tilted outward)
      OPEN[f].forEach(function (b) {
        var cx = -RIBBON_W / 2 + (b + 0.5) * bayW;
        var hinge = new THREE.Group(); hinge.position.set(cx, RIBBON_H - 0.04, D / 2 + 0.04); g.add(hinge);
        var sashH = RIBBON_H * 0.47;
        var sashFrame = new THREE.Mesh(new THREE.BoxGeometry(bayW - 0.06, sashH, 0.05), frameMat); sashFrame.position.set(0, -sashH / 2, 0); hinge.add(sashFrame);
        var sashGlass = new THREE.Mesh(new THREE.PlaneGeometry(bayW - 0.16, sashH - 0.1), new THREE.MeshStandardMaterial({ color: 0x6f9cff, roughness: 0.05, metalness: 0.9, envMap: env, envMapIntensity: 1.6 }));
        sashGlass.position.set(0, -sashH / 2, 0.03); hinge.add(sashGlass);
        var sashBack = new THREE.Mesh(new THREE.PlaneGeometry(bayW - 0.16, sashH - 0.1), new THREE.MeshStandardMaterial({ color: 0x1b2f5e, roughness: 0.2, metalness: 0.6, side: THREE.BackSide }));
        sashBack.position.set(0, -sashH / 2, -0.03); hinge.add(sashBack);
        hinge.rotation.x = -0.5; hinge.userData.open = -0.5; hinge.castShadow = true;
        g.userData.hinges = g.userData.hinges || []; g.userData.hinges.push(hinge);
      });
      // wall sconces with glow sprites
      [-1, 1].forEach(function (s) {
        var x = s * 4.45, y = RIBBON_H / 2;
        var fixture = box(0.18, 0.28, 0.16, new THREE.MeshStandardMaterial({ color: 0x15181f, roughness: 0.5, metalness: 0.6 })); fixture.position.set(x, y, D / 2 + 0.08); g.add(fixture);
        var spMat = new THREE.SpriteMaterial({ map: glowTex, color: 0xff9a3c, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
        var up = new THREE.Sprite(spMat); up.scale.set(0.9, 1.6, 1); up.position.set(x, y + 0.75, D / 2 + 0.12); g.add(up);
        var dn = new THREE.Sprite(spMat.clone()); dn.scale.set(1.0, 1.8, 1); dn.position.set(x, y - 0.8, D / 2 + 0.12); g.add(dn);
        g.userData.glows = g.userData.glows || []; g.userData.glows.push(up, dn);
      });
      if (f === 3) {
        [-1, 1].forEach(function (s) { var pl = new THREE.PointLight(0xffb060, 0, 5, 2); pl.position.set(s * 4.45, RIBBON_H / 2, D / 2 + 0.9); g.add(pl); g.userData.lights = g.userData.lights || []; g.userData.lights.push(pl); });
      }
    });

    /* ---- Ground, plinth, rings, particles ---- */
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshStandardMaterial({ map: makeGroundTexture(THREE), transparent: true, roughness: 0.9, metalness: 0.2, color: 0xffffff }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; ground.receiveShadow = !isMobile; scene.add(ground);
    var pave = new THREE.Mesh(new THREE.BoxGeometry(W + 2.4, 0.12, 2.6), new THREE.MeshStandardMaterial({ color: 0x8e9299, roughness: 0.95 }));
    pave.position.set(0, 0.04, D / 2 + 1.3); pave.receiveShadow = !isMobile; building.add(pave);
    var ringMat = new THREE.MeshBasicMaterial({ color: 0x3d6cff, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
    var baseRing = new THREE.Mesh(new THREE.RingGeometry(9.2, 9.35, 96), ringMat); baseRing.rotation.x = -Math.PI / 2; baseRing.position.y = 0.01; scene.add(baseRing);
    var baseRing2 = new THREE.Mesh(new THREE.RingGeometry(10.8, 10.86, 96), ringMat.clone()); baseRing2.rotation.x = -Math.PI / 2; baseRing2.position.y = 0.01; scene.add(baseRing2);
    var scanRing = new THREE.Mesh(new THREE.RingGeometry(0.6, 1.0, 96), new THREE.MeshBasicMaterial({ color: 0x28e0ff, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
    scanRing.rotation.x = -Math.PI / 2; scanRing.position.y = 0.03; scene.add(scanRing);
    var scanPlane = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.6, 0.12), new THREE.MeshBasicMaterial({ color: 0x28e0ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    scanPlane.position.set(0, 0, D / 2 + 0.6); building.add(scanPlane);
    var orbit = new THREE.Mesh(new THREE.TorusGeometry(11.5, 0.035, 8, 160), new THREE.MeshBasicMaterial({ color: 0x3d6cff, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false }));
    orbit.rotation.x = Math.PI / 2 - 0.2; orbit.position.y = 6.5; scene.add(orbit);
    var orbitDot = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x28e0ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 })); orbitDot.scale.set(1.4, 1.4, 1); scene.add(orbitDot);

    var P = isMobile ? 220 : 480, pos = new Float32Array(P * 3), seeds = new Float32Array(P);
    for (var i = 0; i < P; i++) { pos[i * 3] = (Math.random() - 0.5) * 44; pos[i * 3 + 1] = Math.random() * 22; pos[i * 3 + 2] = (Math.random() - 0.5) * 30; seeds[i] = Math.random() * Math.PI * 2; }
    var pGeo = new THREE.BufferGeometry(); pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var pMat = new THREE.PointsMaterial({ size: isMobile ? 0.22 : 0.18, map: glowTex, color: 0x7aa2ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
    var particles = new THREE.Points(pGeo, pMat); scene.add(particles);

    /* ---- Deep-space starfield (two twinkling layers) ---- */
    function starLayer(n, rMin, rMax, size) {
      var arr = new Float32Array(n * 3);
      for (var i = 0; i < n; i++) {
        var r = rMin + Math.random() * (rMax - rMin), th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(ph) * Math.cos(th); arr[i * 3 + 1] = Math.abs(r * Math.cos(ph)) * 0.75 + 2; arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 20;
      }
      var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      var m = new THREE.PointsMaterial({ size: size, map: glowTex, color: 0xdfe8ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
      var pts = new THREE.Points(g, m); scene.add(pts); return pts;
    }
    var starsA = starLayer(isMobile ? 500 : 900, 70, 150, 1.1), starsB = starLayer(isMobile ? 250 : 500, 60, 140, 1.9);

    /* ---- Warp streaks: light lines rushing past during the intro, then a calm drift ---- */
    var NL = isMobile ? 120 : 220, lpos = new Float32Array(NL * 6), lcol = new Float32Array(NL * 6), lvel = new Float32Array(NL), llen = new Float32Array(NL);
    function resetLine(i, zRand) {
      var x = (Math.random() - 0.5) * 70, y = Math.random() * 30 - 4, z = zRand ? (Math.random() * 160 - 140) : -140 + Math.random() * 20;
      llen[i] = 3 + Math.random() * 9; lvel[i] = 0.7 + Math.random() * 1.6;
      lpos[i * 6] = x; lpos[i * 6 + 1] = y; lpos[i * 6 + 2] = z; lpos[i * 6 + 3] = x; lpos[i * 6 + 4] = y; lpos[i * 6 + 5] = z - llen[i];
    }
    for (var li = 0; li < NL; li++) { resetLine(li, true); lcol[li * 6] = 0.75; lcol[li * 6 + 1] = 0.85; lcol[li * 6 + 2] = 1; lcol[li * 6 + 3] = 0; lcol[li * 6 + 4] = 0; lcol[li * 6 + 5] = 0; }
    var lGeo = new THREE.BufferGeometry(); lGeo.setAttribute("position", new THREE.BufferAttribute(lpos, 3)); lGeo.setAttribute("color", new THREE.BufferAttribute(lcol, 3));
    var lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    var streaks = new THREE.LineSegments(lGeo, lMat); scene.add(streaks);

    /* ---- Rising light beams along the building edges ---- */
    var beams = [], beamMat = new THREE.MeshBasicMaterial({ color: 0x28e0ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    [[-5.25, D / 2 + 0.35], [5.25, D / 2 + 0.35], [-5.25, -D / 2 - 0.35], [5.25, -D / 2 - 0.35], [-2.5, D / 2 + 0.6], [2.5, D / 2 + 0.6], [0, -D / 2 - 0.6], [-5.5, 0], [5.5, 0]].forEach(function (c, i) {
      var b = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 2.2 + Math.random() * 2), beamMat.clone());
      b.position.set(c[0], Math.random() * H, c[1]); b.userData.speed = 0.025 + Math.random() * 0.045; b.userData.max = 0.25 + Math.random() * 0.3;
      building.add(b); beams.push(b);
    });

    /* ---- Soft glow backdrop + second orbit ring ---- */
    var backGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x3d6cff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
    backGlow.scale.set(46, 46, 1); backGlow.position.set(0, 7, -9); scene.add(backGlow);
    var orbit2 = new THREE.Mesh(new THREE.TorusGeometry(13.5, 0.025, 8, 180), new THREE.MeshBasicMaterial({ color: 0x28e0ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    orbit2.rotation.x = Math.PI / 2 + 0.35; orbit2.rotation.y = 0.5; orbit2.position.y = 7.5; scene.add(orbit2);
    ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;

    /* ---- Lights ---- */
    var hemi = new THREE.HemisphereLight(0x8fb0ff, 0x1a1026, 0.9); scene.add(hemi);
    var sun = new THREE.DirectionalLight(0xffd3a8, 1.6); sun.position.set(-11, 16, 14); sun.castShadow = !isMobile;
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -16; sun.shadow.camera.right = 16; sun.shadow.camera.top = 20; sun.shadow.camera.bottom = -6; sun.shadow.camera.near = 1; sun.shadow.camera.far = 60; sun.shadow.bias = -0.0008; sun.shadow.radius = 4;
    scene.add(sun); scene.add(sun.target);
    var fill = new THREE.PointLight(0x3d6cff, 0.9, 50, 2); fill.position.set(10, 7, 12); scene.add(fill);
    var rim = new THREE.DirectionalLight(0x28e0ff, 0.55); rim.position.set(8, 12, -12); scene.add(rim);
    var ambient = new THREE.AmbientLight(0x2a3860, 0.7); scene.add(ambient);
    var sideFill = new THREE.PointLight(0xffd0a0, 0.55, 60, 2); sideFill.position.set(16, 9, 8); scene.add(sideFill);
    scene.fog = new THREE.FogExp2(0x0a0f1f, 0.010);

    /* ---- Theme coupling ---- */
    function applyTheme() {
      var sky = new THREE.Color(cssVar("--scene-sky", "#1b2a6b")), horizon = new THREE.Color(cssVar("--scene-horizon", "#ff8a5c")), groundC = new THREE.Color(cssVar("--scene-ground", "#0a0f1f"));
      var primary = new THREE.Color(cssVar("--primary", "#3d6cff")), secondary = new THREE.Color(cssVar("--secondary", "#28e0ff"));
      hemi.color.copy(sky); hemi.groundColor.copy(groundC);
      scene.fog.color.copy(groundC);
      fill.color.copy(primary); rim.color.copy(secondary);
      ringMat.color.copy(primary); baseRing2.material.color.copy(primary); orbit.material.color.copy(primary); orbitDot.material.color.copy(secondary); scanRing.material.color.copy(secondary); scanPlane.material.color.copy(secondary);
      pMat.color.copy(primary).lerp(new THREE.Color(0xffffff), 0.35);
      backGlow.material.color.copy(primary); orbit2.material.color.copy(secondary); beams.forEach(function (b) { b.material.color.copy(secondary); });
      var lc = secondary.clone().lerp(new THREE.Color(0xffffff), 0.5); for (var q = 0; q < NL; q++) { lcol[q * 6] = lc.r; lcol[q * 6 + 1] = lc.g; lcol[q * 6 + 2] = lc.b; } lGeo.attributes.color.needsUpdate = true;

      ground.material.color.copy(groundC).lerp(new THREE.Color(0xffffff), 0.55);
      var light = document.documentElement.getAttribute("data-theme") === "solar";
      ground.material.opacity = light ? 0.5 : 1; pMat.opacity = light ? 0.35 : pMat.opacity;
      hemi.intensity = light ? 1.2 : 0.9; ambient.intensity = light ? 1.0 : 0.7; sun.intensity = light ? 1.9 : 1.6;
    }
    applyTheme(); on(window, "themechange", applyTheme);

    /* ---- Camera framing ---- */
    var state = { mx: 0, my: 0, tx: 0, ty: 0, scroll: 0, dist: 34, offsetX: 0, lookY: 6.8, start: performance.now(), visible: true, running: false, baseRot: -0.36 };
    function resize() {
      var w = wrap.clientWidth || window.innerWidth, h = wrap.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      var fovRad = THREE.MathUtils.degToRad(camera.fov);
      var distH = (H * 0.80) / Math.tan(fovRad / 2);
      var distW = ((W + 3) * 0.62 / camera.aspect) / Math.tan(fovRad / 2);
      state.dist = Math.max(distH, distW) * 1.05;
      var portrait = w < 768 || h > w * 1.05; // phones and portrait tablets
      if (portrait) {
        // Phones / portrait tablets: the building fills the top ~55% of the hero, headline sits below it
        state.dist = (H / 2) / Math.tan(THREE.MathUtils.degToRad(6.6)) + D / 2;
        var halfW = state.dist * Math.tan(fovRad / 2) * camera.aspect; if (halfW < 6.4) state.dist *= 6.4 / halfW;
      }
      // Desktop: push the building toward the right so the headline sits on the left
      state.offsetX = portrait ? 0 : ((w >= 1100) ? -camera.aspect * 2.7 : -camera.aspect * 1.4);
      state.lookY = portrait ? 1.95 : H * 0.5;
      state.camLift = portrait ? 0.3 : 3.2;
      state.baseRot = portrait ? -0.42 : -0.36;
    }
    resize();
    var ro = window.ResizeObserver ? new ResizeObserver(resize) : null; if (ro) ro.observe(wrap); else on(window, "resize", resize);
    disposeFns.push(function () { if (ro) ro.disconnect(); });

    /* ---- Interaction ---- */
    if (!isTouch) {
      on(window, "mousemove", function (e) { state.tx = (e.clientX / window.innerWidth - 0.5) * 2; state.ty = (e.clientY / window.innerHeight - 0.5) * 2; }, { passive: true });
    } else {
      var lastX = null;
      on(canvas, "touchstart", function (e) { lastX = e.touches[0].clientX; }, { passive: true });
      on(canvas, "touchmove", function (e) { if (lastX === null) return; var dx = e.touches[0].clientX - lastX; state.tx = Math.max(-1.5, Math.min(1.5, state.tx + dx / 220)); lastX = e.touches[0].clientX; }, { passive: true });
      on(canvas, "touchend", function () { lastX = null; }, { passive: true });
    }
    function onScroll() {
      var hh = hero ? hero.offsetHeight : window.innerHeight;
      state.scroll = clamp01(window.scrollY / Math.max(1, hh * 0.9));
      wrap.style.opacity = String(1 - state.scroll * 1.1);
      state.visible = window.scrollY < hh + 100;
    }
    on(window, "scroll", onScroll, { passive: true }); onScroll();
    on(document, "visibilitychange", function () { if (!document.hidden && !state.running) loop(); });

    /* ---- Animation loop ---- */
    var clockStart = performance.now();
    function loop() {
      if (disposed) { state.running = false; return; }
      if (document.hidden) { state.running = false; return; }
      state.running = true;
      requestAnimationFrame(loop);
      if (!state.visible) return;
      var now = performance.now(), t = (now - clockStart) / 1000;
      var intro = reduceMotion ? 1 : t;

      // --- assembly animation ---
      floorGroups.forEach(function (g, i) {
        var s = reduceMotion ? 1 : easeOutBack(clamp01((intro - 0.25 - i * 0.22) / 0.85));
        g.scale.y = Math.max(0.001, s); g.visible = s > 0.002;
      });
      var scanT = clamp01((intro - 0.25) / 1.6);
      scanPlane.position.y = scanT * H; scanPlane.material.opacity = scanT > 0 && scanT < 1 ? 0.9 : 0;
      var ringT = clamp01((intro - 0.1) / 1.4);
      scanRing.scale.setScalar(0.5 + ringT * 14); scanRing.material.opacity = (1 - ringT) * 0.8;
      var ringsIn = clamp01((intro - 1.2) / 1.2);
      ringMat.opacity = 0.35 * ringsIn; baseRing2.material.opacity = 0.18 * ringsIn; orbit.material.opacity = 0.22 * ringsIn; orbitDot.material.opacity = 0.9 * ringsIn;
      pMat.opacity = Math.min(pMat.opacity + 0.004, (document.documentElement.getAttribute("data-theme") === "solar" ? 0.35 : 0.75) * ringsIn);
      // lights on, floor by floor, with a flicker
      glassMats.forEach(function (m, i) {
        var lt = clamp01((intro - 1.9 - i * 0.16) / 0.5);
        var flick = lt < 1 ? (Math.sin(t * 40 + i) > 0.2 ? 1 : 0.35) : 1;
        m.emissiveIntensity = 0.95 * lt * flick * (0.97 + 0.03 * Math.sin(t * 2.2 + i));
      });
      floorGroups.forEach(function (g, i) {
        var gt = clamp01((intro - 2.1 - i * 0.12) / 0.6);
        if (g.userData.glows) g.userData.glows.forEach(function (sp) { sp.material.opacity = 0.55 * gt * (0.95 + 0.05 * Math.sin(t * 3 + i)); });
        if (g.userData.lights) g.userData.lights.forEach(function (l) { l.intensity = 1.1 * gt; });
        if (g.userData.hinges) g.userData.hinges.forEach(function (hg, k) { hg.rotation.x = hg.userData.open * (0.97 + 0.03 * Math.sin(t * 0.7 + k)); });
      });
      var sg = floorGroups[0].userData;
      var signT = clamp01((intro - 2.7) / 0.7), signFlick = signT < 1 ? (Math.sin(t * 28) > 0 ? 1 : 0.2) : 1;
      sg.signMat.emissiveIntensity = 1.15 * signT * signFlick; sg.signLight.intensity = 1.8 * signT * signFlick;

      // --- idle motion, mouse & scroll ---
      state.mx += (state.tx - state.mx) * 0.045; state.my += (state.ty - state.my) * 0.045;
      var sway = reduceMotion ? 0 : Math.sin(t * 0.32) * 0.09;
      building.rotation.y = state.baseRot + sway + state.mx * 0.32 + state.scroll * 0.75;
      building.rotation.x = state.my * -0.04;
      var flyT = reduceMotion ? 1 : clamp01(t / 2.8), fly = 1 - Math.pow(1 - flyT, 4);
      var dist = state.dist * (1 + state.scroll * 0.25) * (1 + 2.4 * (1 - fly)), camY = state.lookY + (state.camLift || 3.2) + state.scroll * 9 + state.my * -0.6 + 7 * (1 - fly);
      building.rotation.y += -1.4 * (1 - fly);
      camera.position.set(state.offsetX + state.mx * 0.9, camY, dist);
      camera.lookAt(state.offsetX, state.lookY + state.scroll * 1.5 + 1.5 * (1 - fly), 0);

      // light streaks: rush toward the camera during the fly-in, then drift calmly
      var warp = 1 - fly, speed = 0.06 + 2.2 * warp;
      for (var q = 0; q < NL; q++) {
        var z = lpos[q * 6 + 2] + speed * lvel[q];
        if (z > 40) { resetLine(q, false); z = lpos[q * 6 + 2]; }
        lpos[q * 6 + 2] = z; lpos[q * 6 + 5] = z - llen[q] * (0.3 + warp * 2.2);
      }
      lGeo.attributes.position.needsUpdate = true; lMat.opacity = reduceMotion ? 0.15 : (0.22 + 0.7 * warp);
      var lightTheme = document.documentElement.getAttribute("data-theme") === "solar", starFade = clamp01(t / 1.5);
      starsA.material.opacity = (lightTheme ? 0.25 : 0.85) * starFade * (0.8 + 0.2 * Math.sin(t * 1.3));
      starsB.material.opacity = (lightTheme ? 0.15 : 0.5) * starFade * (0.75 + 0.25 * Math.sin(t * 0.9 + 2));
      starsA.rotation.y = t * 0.004; starsB.rotation.y = -t * 0.003;
      beams.forEach(function (b, i) { b.position.y += b.userData.speed; if (b.position.y > H + 3) b.position.y = -2; b.material.opacity = b.userData.max * ringsIn * (0.6 + 0.4 * Math.sin(t * 2 + i)); });
      backGlow.material.opacity = 0.22 * ringsIn * (0.85 + 0.15 * Math.sin(t * 0.8)) + 0.5 * clamp01(1 - Math.abs(t - 2.9) / 0.5);
      orbit2.material.opacity = 0.16 * ringsIn; orbit2.rotation.z = -t * 0.09;
      ground.material.map.offset.y = -t * 0.003;

      orbit.rotation.z = t * 0.12;
      var oa = t * 0.35; orbitDot.position.set(Math.cos(oa) * 11.5, 6.5 + Math.sin(oa) * 2.2, Math.sin(oa) * 11.5);
      var pp = pGeo.attributes.position.array;
      for (var i = 0; i < P; i++) { pp[i * 3 + 1] += 0.004 + Math.sin(seeds[i]) * 0.002; if (pp[i * 3 + 1] > 22) pp[i * 3 + 1] = 0; pp[i * 3] += Math.sin(t * 0.3 + seeds[i]) * 0.002; }
      pGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    }
    loop();
    api.scene = scene; api.camera = camera; api.renderer = renderer; api.group = building;
  }
  return api;
}
