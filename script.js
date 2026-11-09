/**
 * Wix Pro Gallery Custom Hero Scroll & Card Animation Script
 */
(function () {
  'use strict';

  if (window.__mPGE) return;
  window.__mPGE = true;

  // DOM Selectors
  const G = '#pro-gallery-margin-container-comp-mubc8tl2';
  const W = '#comp-muo5rugs';
  const T = '#comp-mubeboye';
  const N = '#pagePinnedTopRight-qtl90';

  // Assets & External Links
  const DK = 'bf7add_724d2c7a947a444facfb39f0ec98db29~mv2.png';
  const TK = 'gloam';
  const U = 'https://static.wixstatic.com/media/';
  const S1 = U + 'bf7add_236e0dd27f034249b685e11ed03944e2~mv2.png';
  const S2 = U + 'bf7add_3f9c7c3ec1d94449a73ba61a0b981bcb~mv2.png';
  const S3 = U + 'bf7add_2aca91d46b3245b9a4353289ef3d814f~mv2.png';

  const L = 'https://www.gloam.io/portfolio/';
  const CL = [L + 'beats-by-dre', L + 'google-watch', L + 'lego-batman'];
  const LL = ['', '', L + 'visible-hate'];
  const RL = [L + 'bbc-6music', '', ''];

  const IT = '.gallery-item-container,[data-hook="gallery-item"],[data-hook="gallery-item-container"],[data-hook="item-container"]';
  const TO = '[data-hook="item-title"],[data-hook="item-description"],.gallery-item-title,.gallery-item-description,.gallery-item-text-wrapper';

  // Constants & Thresholds
  const HD = 1900;
  const SM = 2.16;
  const OF = -140;
  const GS = 0.4;
  const GE = 0.65;
  const SS = 0.95;
  const HS = 0.85;
  const CR = '45px';

  let gal = null, tls = [], dst = null;
  let sY = window.scrollY, tY = window.scrollY;
  let frm = null, rFrm = null, rev = false;
  let hov = null, prs = null, bTm = null, bTo = null, cHov = null, hasF = false;
  let s2Timer = null, s2FadedIn = false;

  const orig = new WeakMap();
  const cM = (v, a, b) => Math.min(b, Math.max(a, v));

  // Build UI Overlay
  const ovr = document.createElement('div');
  ovr.className = 'pf-overlay';

  const hB1 = document.createElement('div');
  hB1.className = 'pf-heading-container';
  hB1.style.top = (140 - sY) + 'px';
  hB1.style.opacity = '0';
  hB1.innerHTML = `
    <span class="pf-subheading">CREATIVE DIRECTOR</span>
    <h1 class="pf-mainheading">PAUL RAFFAELLI</h1>
    <span class="pf-tagline">Founder at <a href="https://gloam.io" target="_blank" rel="noopener">GLOAM</a> <span style="font-size:.7em;display:inline-block">&#8599;</span>&nbsp;&nbsp;&nbsp;&nbsp;Former BBC Producer&nbsp;&nbsp;&nbsp;&nbsp;London UK</span>
    <div><div class="pf-arrow-btn" id="s1AB"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div></div>
  `;
  ovr.appendChild(hB1);

  const hB2 = document.createElement('div');
  hB2.className = 'pf-heading-container';
  hB2.style.opacity = '0';
  hB2.innerHTML = `
    <span class="pf-subheading">PORTFOLIO</span>
    <h2 class="pf-mainheading" style="font-size:clamp(28px,4vw,52px)">FEATURED PROJECTS</h2>
    <div><div class="pf-arrow-btn" id="s2AB"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div></div>
  `;
  ovr.appendChild(hB2);

  setTimeout(() => {
    const b = document.getElementById('s1AB');
    if (b) b.style.opacity = '1';
  }, 6000);

  function smoothGlideTo(target, duration = 2200) {
    const start = window.scrollY;
    const distance = target - start;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 16 * Math.pow(progress, 5) : 1 - Math.pow(-2 * progress + 2, 5) / 2;
      tY = start + distance * ease;
      sY = tY;
      window.scrollTo(0, tY);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.addEventListener('click', (e) => {
    const b1 = e.target.closest('#s1AB');
    const b2 = e.target.closest('#s2AB');
    if (b1) { e.preventDefault(); e.stopPropagation(); smoothGlideTo(608, 2200); }
    if (b2) { e.preventDefault(); e.stopPropagation(); smoothGlideTo(1900, 2800); }
  }, true);

  function pS2Shd(p) {
    return p <= 0.01 ? 'none' : 'drop-shadow(0px ' + (8 * p).toFixed(1) + 'px ' + (8 * p).toFixed(1) + 'px rgba(128,128,135,' + (0.105 * p).toFixed(3) + '))';
  }

  function cCrd(src, hE, lnks, zI = 51) {
    const c = document.createElement('div');
    c.className = 'pf-card-container';
    c.style.zIndex = zI;

    const i = document.createElement('img');
    i.src = src;
    i.alt = '';
    i.draggable = false;
    i.decoding = 'async';
    i.className = 'pf-card-img';
    c.appendChild(i);

    let e = null;
    if (hE) {
      e = document.createElement('img');
      e.src = S3;
      e.alt = '';
      e.draggable = false;
      e.decoding = 'async';
      e.className = 'pf-card-eyes';
      c.appendChild(e);
    }

    const h = [];
    if (lnks && lnks.length) {
      lnks.forEach((u, idx) => {
        if (!u) return;
        const a = document.createElement('a');
        a.href = u;
        a.className = 'hero-phone-link';
        let sX = u.indexOf('visible-hate') > -1 || u.indexOf('espn') > -1 ? -75 : (u.indexOf('google-watch') > -1 ? -25 : (u.indexOf('lego-batman') > -1 ? -58 : 0));
        a.style.left = 'calc(' + (idx * 33.33) + '% + ' + (50 + idx * 10 + sX) + 'px)';
        a.style.width = 'calc(33.33% - 60px)';
        a.addEventListener('click', (ev) => ev.preventDefault());
        c.appendChild(a);
        h.push(a);
      });
    }
    return { container: c, img: i, eyes: e, hotspots: h };
  }

  const cC = cCrd(S1, true, CL, 51);
  const lC = cCrd(S2, false, LL, 48);
  const rC = cCrd(S2, false, RL, 48);

  ovr.appendChild(lC.container);
  ovr.appendChild(cC.container);
  ovr.appendChild(rC.container);
  document.documentElement.appendChild(ovr);

  function tHS(en) {
    const st = en ? 'auto' : 'none';
    [cC, lC, rC].forEach(card => {
      card.container.style.pointerEvents = 'none';
      if (card.hotspots) card.hotspots.forEach(a => a.style.pointerEvents = st);
    });
  }

  function sBlnk() {
    clearTimeout(bTm);
    bTm = setTimeout(() => {
      if (window.scrollY <= 1088 && cC.eyes) {
        cC.eyes.style.opacity = '1';
        bTo = setTimeout(() => {
          if (cC.eyes) cC.eyes.style.opacity = '0';
          sBlnk();
        }, 160);
      } else stBlnk();
    }, Math.random() * 3500 + 2500);
  }

  function stBlnk() {
    clearTimeout(bTm);
    clearTimeout(bTo);
    if (cC.eyes) cC.eyes.style.opacity = '0';
  }

  function uBlnk() {
    if (window.scrollY <= 1088) {
      if (!bTm) sBlnk();
    } else {
      stBlnk();
      bTm = null;
    }
  }

  function rGal() {
    if (rev) return;
    rev = true;
    const g = gal || document.querySelector(G);
    if (g) {
      g.style.setProperty('opacity', '1', 'important');
      g.style.setProperty('visibility', 'visible', 'important');
    }
  }

  function gTls() {
    if (!gal) return [];
    return [...gal.querySelectorAll(IT)].filter((item, i, all) => all.indexOf(item) === i);
  }

  function gDst() {
    if (!tls.length) return null;
    let m = tls.find(item => ((item.querySelector('img') || {}).currentSrc || '').indexOf(DK) > -1);
    if (!m) {
      m = tls.find(item => [item.innerText, item.getAttribute('aria-label'), item.getAttribute('data-title'), item.title].filter(Boolean).join(' ').toLowerCase().indexOf(TK) > -1);
    }
    return m || null;
  }

  function prep() {
    gal = document.querySelector(G);
    if (!gal) return false;
    tls = gTls();
    if (!tls.length) return false;
    dst = gDst();
    if (!dst) return false;

    tls.forEach(item => {
      if (!orig.has(item)) orig.set(item, { pointerEvents: item.style.pointerEvents, transition: item.style.transition });
    });

    const wrp = document.querySelector(W);
    if (wrp) {
      wrp.style.setProperty('position', 'relative', 'important');
      wrp.style.setProperty('z-index', '0', 'important');
    }
    gal.style.setProperty('position', 'relative', 'important');
    gal.style.setProperty('z-index', '0', 'important');

    const txt = document.querySelector(T);
    if (txt) {
      txt.style.setProperty('z-index', '55', 'important');
      txt.style.setProperty('pointer-events', 'none', 'important');
      txt.querySelectorAll('*').forEach(c => c.style.setProperty('pointer-events', c.matches('a,button,[role="button"],input,select,textarea') ? 'auto' : 'none', 'important'));
    }

    const nav = document.querySelector(N);
    if (nav) {
      nav.style.setProperty('position', 'relative', 'important');
      nav.style.setProperty('z-index', '70', 'important');
      nav.querySelectorAll('a,button,[role="button"]').forEach(l => {
        l.style.setProperty('position', 'relative', 'important');
        l.style.setProperty('z-index', '70', 'important');
        l.style.setProperty('pointer-events', 'auto', 'important');
      });
    }
    return true;
  }

  function gZm(y, gBT) {
    if (y <= 200) return 0.75 + 0.15 * cM(y / 200, 0, 1);
    if (!gBT || y < gBT) return 0.9;
    const rp = cM((y - gBT) / 350, 0, 1);
    const ep = rp * rp * (3 - 2 * rp);
    return 0.9 - 0.05 * ep;
  }

  function sST(item, som, sp, ac) {
    const str = som * sp * 0.5 * (ac ? 0.4 : 1);
    item.style.setProperty('box-shadow', (16 * str).toFixed(2) + 'px ' + (19 * str).toFixed(2) + 'px ' + (30 * str).toFixed(2) + 'px 0 rgba(64,64,71,' + (0.6 * str).toFixed(3) + ')', 'important');
    item.querySelectorAll(TO).forEach(el => {
      el.style.setProperty('transition', 'transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease', 'important');
      el.style.setProperty('transform', 'scale(' + (ac ? 0.95 : 1) + ')', 'important');
      el.style.setProperty('opacity', String(som), 'important');
    });
  }

  function render() {
    if (!gal || !gal.isConnected || !dst || !dst.isConnected) {
      if (!prep()) { rGal(); return; }
    }
    rGal();

    const y = Math.max(0, sY);
    const p = cM(y / HD, 0, 1);
    const isC = p >= 1;
    const lSS = 608, lES = 1088;

    tHS(y > lES);

    const pS1 = cM(y / lSS, 0, 1);
    const pS3 = cM((y - lES) / (HD - lES), 0, 1);
    const eI = pS1 * pS1 * (3 - 2 * pS1);
    const esd = pS3 * pS3 * (3 - 2 * pS3);
    const swP = cM((p - SS) / (1 - SS), 0, 1);
    const gFP = cM(p / GE, 0, 1);
    const sR = cM((p - HS) / (1 - HS), 0, 1);
    const sP = sR * sR * (3 - 2 * sR);

    const gR = gal.getBoundingClientRect();
    const gBT = (gR.bottom + y) - innerHeight;
    const bZ = gZm(y, gBT);
    const uGS = isC ? bZ : bZ * (GS + (1 - GS) * gFP);

    gal.style.transformOrigin = 'center top';
    gal.style.willChange = 'transform';
    gal.style.transform = 'scale(' + uGS.toFixed(5) + ')';

    const trg = dst.getBoundingClientRect();
    const w = Math.max(1, trg.width);
    const h = Math.max(1, trg.height);
    const fS = Math.min(innerWidth * 0.72 / w, innerHeight * 0.52 / h);
    const pP = Math.sin(pS1 * Math.PI);
    const sB = 1 + (pP * 0.15);
    const lY = pP * -30;

    let lSM = innerWidth < 1440 ? 1 - (0.15 * eI) : (innerWidth < 1680 ? 1 - (0.1 * eI) : 1);
    let lYD = innerWidth < 1440 ? 80 * eI : (innerWidth < 1680 ? 45 * eI : 0);

    const stW = w * fS * SM * sB * lSM;
    const stH = h * fS * SM * sB * lSM;
    const sW = stW + (trg.width - stW) * esd;
    const sH = stH + (trg.height - stH) * esd;

    const txt = document.querySelector(T);
    const sT = txt ? txt.getBoundingClientRect().bottom + OF : 10;
    let yC = y < lSS ? eI * 90 : (y <= lES ? (y - lSS) + 90 : 570);
    const sTp = sT + lY + 180 + (280 * eI) + yC + lYD;
    const cT = sTp + (trg.top - sTp) * esd;
    const sCX = innerWidth / 2;
    const cCX = sCX + (trg.left + trg.width / 2 - sCX) * esd;
    const cL = cCX - (sW / 2);

    hB1.style.left = sCX + 'px';
    hB1.style.top = (140 - y) + 'px';
    hB1.style.opacity = String(cM(1 - (y / 608), 0, 1));

    let tT2 = 110, iBY2 = innerHeight;
    let t2Y = y < lSS ? iBY2 - (pS1 * (iBY2 - tT2)) : (y <= lES ? tT2 : tT2 - (y - lES));
    hB2.style.left = sCX + 'px';
    hB2.style.top = t2Y + 'px';
    hB2.style.opacity = y < 20 ? '0' : String(cM((y - 20) / 40, 0, 1) * (y > lES ? cM(1 - esd, 0, 1) : 1));

    const s2B = document.getElementById('s2AB');
    if (s2B) {
      if (y >= lSS && y <= lES) {
        if (!s2Timer && !s2FadedIn) {
          s2Timer = setTimeout(() => { s2B.style.opacity = '1'; s2FadedIn = true; }, 3000);
        }
      } else {
        clearTimeout(s2Timer);
        s2Timer = null;
        s2FadedIn = false;
        s2B.style.opacity = '0';
      }
    }

    const cW = sW, cH = sH;
    const s2SO = y <= lSS ? eI : cM(1 - esd, 0, 1);
    const s2SF = isC ? 'none' : pS2Shd(s2SO);

    cC.container.style.left = cL + 'px';
    cC.container.style.top = cT + 'px';
    cC.container.style.width = cW + 'px';
    cC.container.style.height = cH + 'px';
    cC.container.style.boxShadow = 'none';
    cC.container.style.filter = s2SF;
    cC.img.style.opacity = String(1 - swP);

    const bLP = cL - cW - 24 + 80;
    const bRP = cL + cW + 24 - 80;
    const sO = (1 - eI) * (cW * 0.3);
    const lP = (bLP + sO) - (esd * 2000);
    const rP = (bRP - sO) + (esd * 2000);
    const sOpc = cM(eI * (1 - esd), 0, 1);

    lC.container.style.left = lP + 'px';
    lC.container.style.top = cT + 'px';
    lC.container.style.width = cW + 'px';
    lC.container.style.height = cH + 'px';
    lC.container.style.boxShadow = 'none';
    lC.container.style.filter = s2SF;
    lC.img.style.opacity = String(sOpc);

    rC.container.style.left = rP + 'px';
    rC.container.style.top = cT + 'px';
    rC.container.style.width = cW + 'px';
    rC.container.style.height = cH + 'px';
    rC.container.style.boxShadow = 'none';
    rC.container.style.filter = s2SF;
    rC.img.style.opacity = String(sOpc);

    if (!hasF) {
      hasF = true;
      requestAnimationFrame(() => {
        lC.container.style.opacity = '1';
        cC.container.style.opacity = '1';
        rC.container.style.opacity = '1';
      });
    }

    uBlnk();

    tls.forEach((item, index) => {
      const isD = item === dst;
      let op, sOM;
      const act = isC && (item === hov || item === prs);

      if (isC) {
        sOM = 1;
        item.classList.add('gallery-tile-expand-mode');
        item.style.removeProperty('opacity');
        item.style.setProperty('transition', 'transform 600ms cubic-bezier(0.16,1,0.3,1), box-shadow 600ms ease', 'important');
        item.style.setProperty('transform', act ? 'scale(0.98)' : 'scale(1.0)', 'important');
        const saved = orig.get(item);
        if (saved) item.style.pointerEvents = saved.pointerEvents;
      } else {
        item.classList.remove('gallery-tile-expand-mode');
        item.style.setProperty('transition', 'opacity 0s, transform 0s, box-shadow 0s', 'important');
        item.style.setProperty('pointer-events', 'none', 'important');

        if (isD) {
          op = swP;
          sOM = swP * swP;
          item.style.setProperty('transform', 'scale(1.0)', 'important');
        } else {
          const stg = index / Math.max(1, tls.length - 1);
          const sTh = 0.02 + stg * 0.04;
          op = cM((gFP - sTh) / (1 - sTh), 0, 1);
          sOM = op;
          item.style.setProperty('transform', 'scale(' + (0.8 + 0.2 * op).toFixed(3) + ')', 'important');
        }
        item.style.setProperty('opacity', String(op), 'important');
      }
      sST(item, sOM, sP, act);
    });
  }

  function qRbd() {
    if (rFrm !== null) return;
    rFrm = requestAnimationFrame(() => {
      rFrm = null;
      if (prep()) render();
      else rGal();
    });
  }

  function step() {
    frm = null;
    let t = tY;
    const d = t - sY;
    if (Math.abs(d) <= 0.5) {
      sY = t;
      render();
      return;
    }
    sY += d * (d < 0 ? 0.18 : 0.12);
    render();
    frm = requestAnimationFrame(step);
  }

  function gTl(el) {
    const item = el && el.closest && el.closest(IT);
    return item && gal && gal.contains(item) ? item : null;
  }

  window.addEventListener('scroll', () => {
    tY = window.scrollY;
    uBlnk();
    if (frm === null) frm = requestAnimationFrame(step);
  }, { passive: true });

  window.addEventListener('resize', () => {
    sY = tY = window.scrollY;
    render();
  });

  document.addEventListener('mouseover', (e) => {
    const tile = gTl(e.target);
    if (tile && tile !== cHov) {
      cHov = tile;
      hov = tile;
      render();
    }
  }, true);

  document.addEventListener('mouseout', (e) => {
    if (!cHov) return;
    const tile = gTl(e.target);
    const rel = gTl(e.relatedTarget);
    if (tile === cHov && rel !== cHov) {
      cHov = null;
      hov = null;
      render();
    }
  }, true);

  document.addEventListener('touchstart', (e) => {
    prs = gTl(e.target);
    render();
    clearTimeout(window.__gPT);
    window.__gPT = setTimeout(() => {
      prs = null;
      render();
    }, 180);
  }, { passive: true, capture: true });

  const obs = new MutationObserver(qRbd);

  function start() {
    obs.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'data-src']
    });
    qRbd();
    sBlnk();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
