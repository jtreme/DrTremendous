/* ARE 201 Study Tools: interactive graphs for the "See it" section.
   All curves are linear, written as P = a + bQ on a 0-100 grid unless noted.
   Conventions: supply shifts are horizontal; a bumper crop shifts an upward-sloping
   supply curve right; externalities are drawn on the production side. */

const NS = "http://www.w3.org/2000/svg";
const GW = 560, GH = 430, ML = 56, MR = 22, MT = 18, MB = 48;

function svgEl(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function fmt(x, d) { return (Math.round(x * Math.pow(10, d || 0)) / Math.pow(10, d || 0)).toFixed(d || 0); }
function money(x) { const r = Math.round(x); return (r < 0 ? "−$" : "$") + Math.abs(r).toLocaleString(); }
function clampN(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

/* A plotting frame with its own scales. */
function makeFrame(svg, xmax, ymax, xlabel, ylabel) {
  const pw = GW - ML - MR, ph = GH - MT - MB;
  const X = q => ML + (q / xmax) * pw;
  const Y = p => MT + ph - (p / ymax) * ph;
  const axes = svgEl("g", {}, svg);
  for (let i = 0; i <= 5; i++) {
    const qv = xmax * i / 5, pv = ymax * i / 5;
    svgEl("line", { x1: X(qv), y1: Y(0), x2: X(qv), y2: Y(ymax), stroke: "#eadfc6", "stroke-width": 1 }, axes);
    svgEl("line", { x1: X(0), y1: Y(pv), x2: X(xmax), y2: Y(pv), stroke: "#eadfc6", "stroke-width": 1 }, axes);
    const tx = svgEl("text", { x: X(qv), y: Y(0) + 17, "text-anchor": "middle", class: "svg-axis" }, axes); tx.textContent = fmt(qv);
    const ty = svgEl("text", { x: X(0) - 8, y: Y(pv) + 4, "text-anchor": "end", class: "svg-axis" }, axes); ty.textContent = fmt(pv);
  }
  svgEl("line", { x1: X(0), y1: Y(0), x2: X(xmax), y2: Y(0), stroke: "#141b34", "stroke-width": 1.5 }, axes);
  svgEl("line", { x1: X(0), y1: Y(0), x2: X(0), y2: Y(ymax), stroke: "#141b34", "stroke-width": 1.5 }, axes);
  const xl = svgEl("text", { x: X(xmax / 2), y: GH - 8, "text-anchor": "middle", class: "svg-label" }, axes); xl.textContent = xlabel;
  const yl = svgEl("text", { x: 14, y: Y(ymax / 2), "text-anchor": "middle", class: "svg-label", transform: `rotate(-90 14 ${Y(ymax / 2)})` }, axes); yl.textContent = ylabel;
  const layer = svgEl("g", {}, svg);
  return { X, Y, xmax, ymax, layer };
}

/* Endpoints of P = a + bQ clipped to the frame. */
function clipLine(F, a, b) {
  const pts = [];
  const add = (q, p) => { if (q >= -1e-9 && q <= F.xmax + 1e-9 && p >= -1e-9 && p <= F.ymax + 1e-9) pts.push([q, p]); };
  add(0, a); add(F.xmax, a + b * F.xmax);
  if (b !== 0) { add(-a / b, 0); add((F.ymax - a) / b, F.ymax); }
  pts.sort((u, v) => u[0] - v[0]);
  return pts.length >= 2 ? [pts[0], pts[pts.length - 1]] : null;
}
function drawCurve(F, a, b, opts) {
  const seg = clipLine(F, a, b); if (!seg) return;
  svgEl("line", { x1: F.X(seg[0][0]), y1: F.Y(seg[0][1]), x2: F.X(seg[1][0]), y2: F.Y(seg[1][1]),
    stroke: opts.color, "stroke-width": opts.width || 3, "stroke-dasharray": opts.dash || "", opacity: opts.opacity || 1, "stroke-linecap": "round" }, F.layer);
  if (opts.label) {
    const end = opts.labelAt === "start" ? seg[0] : seg[1];
    const t = svgEl("text", { x: F.X(end[0]) + (opts.dx || 6), y: F.Y(end[1]) + (opts.dy || 4), class: "svg-label", style: `fill:${opts.color};font-weight:600` }, F.layer);
    t.textContent = opts.label;
  }
}
function poly(F, pts, fill, opacity, stroke) {
  svgEl("polygon", { points: pts.map(p => F.X(p[0]) + "," + F.Y(p[1])).join(" "), fill, opacity: opacity == null ? 0.45 : opacity, stroke: stroke || "none", "stroke-width": stroke ? 1.5 : 0 }, F.layer);
}
function guide(F, q, p, labelQ, labelP) {
  svgEl("line", { x1: F.X(q), y1: F.Y(p), x2: F.X(q), y2: F.Y(0), stroke: "#6b7088", "stroke-dasharray": "4 4", "stroke-width": 1.2 }, F.layer);
  svgEl("line", { x1: F.X(q), y1: F.Y(p), x2: F.X(0), y2: F.Y(p), stroke: "#6b7088", "stroke-dasharray": "4 4", "stroke-width": 1.2 }, F.layer);
  svgEl("circle", { cx: F.X(q), cy: F.Y(p), r: 5.5, fill: "#141b34", stroke: "#fffaf0", "stroke-width": 2 }, F.layer);
  if (labelP) { const t = svgEl("text", { x: F.X(0) + 6, y: F.Y(p) - 6, class: "svg-label", style: "font-weight:600" }, F.layer); t.textContent = labelP; }
  if (labelQ) { const t = svgEl("text", { x: F.X(q) + 6, y: F.Y(0) - 8, class: "svg-label", style: "font-weight:600" }, F.layer); t.textContent = labelQ; }
}
function hline(F, p, color, label) {
  svgEl("line", { x1: F.X(0), y1: F.Y(p), x2: F.X(F.xmax), y2: F.Y(p), stroke: color, "stroke-width": 2.5, "stroke-dasharray": "8 5" }, F.layer);
  if (label) { const t = svgEl("text", { x: F.X(F.xmax) - 4, y: F.Y(p) - 7, "text-anchor": "end", class: "svg-label", style: `fill:${color};font-weight:600` }, F.layer); t.textContent = label; }
}
function bracket(F, q1, q2, p, label, color) {
  const y = F.Y(p) + 16;
  svgEl("path", { d: `M${F.X(q1)},${y - 5} L${F.X(q1)},${y} L${F.X(q2)},${y} L${F.X(q2)},${y - 5}`, stroke: color, fill: "none", "stroke-width": 2 }, F.layer);
  const t = svgEl("text", { x: (F.X(q1) + F.X(q2)) / 2, y: y + 15, "text-anchor": "middle", class: "svg-label", style: `fill:${color};font-weight:600` }, F.layer);
  t.textContent = label;
}
function clearLayer(F) { while (F.layer.firstChild) F.layer.removeChild(F.layer.firstChild); }
function animate(from, to, ms, step, done) {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { step(to); if (done) done(); return; }
  const t0 = performance.now();
  function tick(now) {
    const k = Math.min(1, (now - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    step(from + (to - from) * e);
    if (k < 1) requestAnimationFrame(tick); else if (done) done();
  }
  requestAnimationFrame(tick);
}
function seeHeader(sec, eyebrow, title, lead) {
  sec.innerHTML = `<div class="eyebrow">${eyebrow}</div><h1 class="view-title">${title}</h1><p class="view-lead">${lead}</p>
  <div class="see-grid"><div class="card graph-card"><svg viewBox="0 0 ${GW} ${GH}" role="img"></svg></div><div class="controls"></div></div>`;
  return { svg: sec.querySelector("svg"), ctl: sec.querySelector(".controls") };
}
function swatch(c) { return `<span class="sw" style="background:${c}"></span>`; }

const GRAPHS = {};

/* ================= 1. Supply and demand ================= */
GRAPHS["see-sd"] = function (sec) {
  const { svg, ctl } = seeHeader(sec, "See it · Unit 4", "Supply &amp; demand",
    "Pick an event, predict which curve moves, then watch the market find its new equilibrium. Or drag the sliders yourself.");
  svg.setAttribute("aria-label", "Supply and demand graph");
  const F = makeFrame(svg, 100, 100, "Quantity", "Price ($)");
  const base = { aD: 90, bD: -0.8, aS: 10, bS: 0.8 };
  const st = { sD: 0, sS: 0 };
  const EVENTS = [
    { label: "Consumer incomes rise (beef is a normal good)", market: "beef", curve: "D", dir: 1, amt: 20, why: "Income is a demand shifter. For a normal good, higher income raises demand at every price, so demand shifts right. Price and quantity both rise." },
    { label: "A record corn harvest (bumper crop)", market: "corn", curve: "S", dir: 1, amt: 25, why: "A bigger harvest is a production change, so supply shifts right. Price falls and quantity rises along the same demand curve." },
    { label: "Feed and fuel costs rise for ranchers", market: "beef", curve: "S", dir: -1, amt: 20, why: "Higher input costs make it costlier to produce every unit, so supply shifts left. Price rises and quantity falls." },
    { label: "The price of chicken (a substitute) falls", market: "beef", curve: "D", dir: -1, amt: 18, why: "Cheaper chicken pulls buyers away from beef, so beef demand shifts left. Price and quantity both fall." },
    { label: "A study finds beef is healthier than thought", market: "beef", curve: "D", dir: 1, amt: 15, why: "Tastes and preferences shift demand. Demand shifts right, raising price and quantity." },
    { label: "Faster harvesting equipment arrives", market: "corn", curve: "S", dir: 1, amt: 15, why: "Better technology lowers the cost of producing each unit, so supply shifts right. Price falls and quantity rises." }
  ];
  ctl.innerHTML = `
    <div><div class="lbl">Try an event</div><div class="events" id="sdEvents"></div></div>
    <div class="predict" id="sdPredict" hidden></div>
    <div class="ctrl"><label for="sdD">Shift demand <b id="sdDv">0</b></label><input type="range" id="sdD" min="-30" max="30" step="1" value="0"></div>
    <div class="ctrl"><label for="sdS">Shift supply <b id="sdSv">0</b></label><input type="range" id="sdS" min="-30" max="30" step="1" value="0"></div>
    <div class="readout" id="sdRead"></div>
    <div class="row-end" style="margin-top:0"><button class="ghost-btn" id="sdReset">Reset</button></div>
    <div class="see-note">Sliders shift curves horizontally: positive moves a curve right (an increase), negative moves it left.</div>`;
  const evWrap = ctl.querySelector("#sdEvents");
  EVENTS.forEach((ev, i) => {
    const b = document.createElement("button"); b.className = "event-btn"; b.textContent = ev.label; b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => startEvent(i, b)); evWrap.appendChild(b);
  });
  const dS = ctl.querySelector("#sdD"), sS = ctl.querySelector("#sdS");
  dS.addEventListener("input", () => { st.sD = +dS.value; draw(); });
  sS.addEventListener("input", () => { st.sS = +sS.value; draw(); });
  ctl.querySelector("#sdReset").addEventListener("click", () => { st.sD = 0; st.sS = 0; dS.value = 0; sS.value = 0; ctl.querySelector("#sdPredict").hidden = true; evWrap.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", "false")); draw(); });

  function eq(sD, sSv) {
    const aD = base.aD + 0.8 * sD, aS = base.aS - 0.8 * sSv;
    const Q = (aD - aS) / (base.bS - base.bD), P = aD + base.bD * Q;
    return { aD, aS, Q, P };
  }
  function draw() {
    clearLayer(F);
    const e0 = eq(0, 0), e1 = eq(st.sD, st.sS);
    const moved = st.sD !== 0 || st.sS !== 0;
    if (moved) {
      if (st.sD !== 0) drawCurve(F, base.aD, base.bD, { color: "#141b34", width: 2, dash: "6 5", opacity: 0.35, label: "D₀", dy: -2 });
      if (st.sS !== 0) drawCurve(F, base.aS, base.bS, { color: "#a8782c", width: 2, dash: "6 5", opacity: 0.45, label: "S₀" });
      svgEl("circle", { cx: F.X(e0.Q), cy: F.Y(e0.P), r: 4, fill: "none", stroke: "#6b7088", "stroke-width": 1.5 }, F.layer);
    }
    drawCurve(F, e1.aD, base.bD, { color: "#141b34", label: st.sD !== 0 ? "D₁" : "D", dy: -2 });
    drawCurve(F, e1.aS, base.bS, { color: "#d8a249", label: st.sS !== 0 ? "S₁" : "S" });
    guide(F, e1.Q, e1.P, "Q*", "P*");
    ctl.querySelector("#sdDv").textContent = (st.sD > 0 ? "+" : "") + st.sD;
    ctl.querySelector("#sdSv").textContent = (st.sS > 0 ? "+" : "") + st.sS;
    const arrow = (a, b) => Math.abs(a - b) < 0.05 ? "no change" : (b > a ? "up " : "down ") + fmt(Math.abs(b - a), 1);
    ctl.querySelector("#sdRead").innerHTML = `<table>
      <tr><td>Equilibrium price</td><td>$${fmt(e1.P, 1)}</td></tr>
      <tr><td>Equilibrium quantity</td><td>${fmt(e1.Q, 1)}</td></tr>
      ${moved ? `<tr><td>Price vs. start</td><td>${arrow(e0.P, e1.P)}</td></tr><tr><td>Quantity vs. start</td><td>${arrow(e0.Q, e1.Q)}</td></tr>` : ""}
    </table>`;
  }
  function startEvent(i, btn) {
    const ev = EVENTS[i];
    evWrap.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === btn ? "true" : "false"));
    st.sD = 0; st.sS = 0; dS.value = 0; sS.value = 0; draw();
    const box = ctl.querySelector("#sdPredict"); box.hidden = false;
    box.innerHTML = `<div class="p-q">${ev.label}. In the ${ev.market} market, which curve shifts, and which way?</div>
      <div class="seg">
        <button data-c="D" data-d="1">Demand right</button><button data-c="D" data-d="-1">Demand left</button>
        <button data-c="S" data-d="1">Supply right</button><button data-c="S" data-d="-1">Supply left</button>
      </div><div class="p-res"></div>`;
    box.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      const right = b.dataset.c === ev.curve && +b.dataset.d === ev.dir;
      box.querySelectorAll("button").forEach(x => { x.disabled = true; if (x.dataset.c === ev.curve && +x.dataset.d === ev.dir) x.setAttribute("aria-pressed", "true"); });
      box.querySelector(".p-res").innerHTML = `<b style="color:${right ? "var(--good)" : "var(--bad)"}">${right ? "Right." : "Not quite."}</b> ${ev.why}`;
      const target = ev.dir * ev.amt;
      animate(0, target, 700, v => {
        if (ev.curve === "D") { st.sD = Math.round(v * 10) / 10; dS.value = Math.round(v); } else { st.sS = Math.round(v * 10) / 10; sS.value = Math.round(v); }
        draw();
      }, () => { if (ev.curve === "D") st.sD = target; else st.sS = target; draw(); });
      if (window.DT && DT.recordSee) DT.recordSee("sd", right);
    }));
  }
  draw();
};

/* ================= 2. Surplus and price controls ================= */
GRAPHS["see-surplus"] = function (sec) {
  const { svg, ctl } = seeHeader(sec, "See it · Unit 5", "Surplus &amp; price controls",
    "Choose a policy and a price. Predict what happens, then see consumer surplus, producer surplus, deadweight loss, and what the government spends.");
  svg.setAttribute("aria-label", "Consumer surplus, producer surplus, and price control graph");
  const F = makeFrame(svg, 100, 100, "Quantity", "Price ($)");
  const aD = 90, bD = -0.8, aS = 10, bS = 0.8, Qe = 50, Pe = 50;
  const D = q => aD + bD * q, S = q => aS + bS * q, Qd = p => (p - aD) / bD, Qs = p => (p - aS) / bS;
  const st = { mode: "none", price: 35, revealed: true };
  ctl.innerHTML = `
    <div><div class="lbl">Policy</div><div class="seg" id="spMode">
      <button data-m="none" aria-pressed="true">Free market</button>
      <button data-m="ceiling">Price ceiling</button>
      <button data-m="floor">Price floor</button>
      <button data-m="gov">Price floor with government purchases</button>
    </div></div>
    <div class="ctrl" id="spPriceWrap" hidden><label for="spPrice">Policy price <b id="spPv">$35</b></label><input type="range" id="spPrice" min="15" max="85" step="1" value="35"></div>
    <div class="predict" id="spPredict" hidden></div>
    <div class="verdict-box" id="spVerdict"></div>
    <div class="readout" id="spRead"></div>`;
  const modeBtns = ctl.querySelectorAll("#spMode button"), pr = ctl.querySelector("#spPrice");
  modeBtns.forEach(b => b.addEventListener("click", () => {
    st.mode = b.dataset.m; modeBtns.forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    st.price = st.mode === "ceiling" ? 35 : 65; pr.value = st.price;
    ctl.querySelector("#spPriceWrap").hidden = st.mode === "none";
    st.revealed = st.mode === "none";
    draw(); if (!st.revealed) askPredict();
  }));
  pr.addEventListener("input", () => { st.price = +pr.value; draw(); if (!st.revealed) askPredict(); });

  function outcome() {
    const p = st.price;
    if (st.mode === "none") return { kind: "none" };
    if (st.mode === "ceiling") return p >= Pe ? { kind: "nonbinding" } : { kind: "shortage" };
    return p <= Pe ? { kind: "nonbinding" } : { kind: "surplus" };
  }
  function askPredict() {
    const box = ctl.querySelector("#spPredict"); box.hidden = false;
    const name = { ceiling: "price ceiling", floor: "price floor", gov: "price floor with government purchases" }[st.mode];
    box.innerHTML = `<div class="p-q">A ${name} at $${st.price}. The market price is $${Pe}. What happens?</div>
      <div class="seg"><button data-k="shortage">A shortage</button><button data-k="surplus">A surplus</button><button data-k="nonbinding">No effect (non-binding)</button></div><div class="p-res"></div>`;
    box.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      const o = outcome().kind, right = b.dataset.k === o;
      const why = o === "nonbinding"
        ? (st.mode === "ceiling" ? "A ceiling is a legal maximum. Set above the market price, it doesn't constrain anyone." : "A floor is a legal minimum. Set below the market price, it doesn't constrain anyone.")
        : (o === "shortage" ? "A ceiling below the market price raises quantity demanded and lowers quantity supplied." : "A floor above the market price raises quantity supplied and lowers quantity demanded.");
      box.querySelector(".p-res").innerHTML = `<b style="color:${right ? "var(--good)" : "var(--bad)"}">${right ? "Right." : "Not quite."}</b> ${why} Move the slider to explore.`;
      box.querySelectorAll("button").forEach(x => x.disabled = true);
      st.revealed = true; draw();
      if (window.DT && DT.recordSee) DT.recordSee("surplus", right);
    }));
  }
  function draw() {
    clearLayer(F);
    const p = st.price, o = outcome();
    ctl.querySelector("#spPv").textContent = "$" + p;
    let cs, ps, dwl = 0, gov = 0, note = "";
    const showAreas = st.revealed;
    if (o.kind === "none" || o.kind === "nonbinding") {
      if (showAreas) {
        poly(F, [[0, aD], [0, Pe], [Qe, Pe]], "var(--cs)");
        poly(F, [[0, Pe], [0, aS], [Qe, Pe]], "var(--ps)");
      }
      cs = 0.5 * Qe * (aD - Pe); ps = 0.5 * Qe * (Pe - aS);
      note = o.kind === "none" ? `At the market price of $${Pe}, buyers and sellers trade ${Qe} units. Total surplus is as large as it can be.`
        : `Non-binding: the ${st.mode === "ceiling" ? "ceiling sits above" : "floor sits below"} the market price, so the market stays at $${Pe} and ${Qe} units.`;
    } else if (o.kind === "shortage") {
      const qs = Qs(p), qd = Qd(p);
      if (showAreas) {
        poly(F, [[0, aD], [qs, D(qs)], [qs, p], [0, p]], "var(--cs)");
        poly(F, [[0, p], [0, aS], [qs, p]], "var(--ps)");
        poly(F, [[qs, D(qs)], [Qe, Pe], [qs, S(qs)]], "var(--dwl)", 0.6);
        bracket(F, qs, qd, p, `Shortage ${fmt(qd - qs, 1)}`, "var(--bad)");
      }
      cs = (aD - p + D(qs) - p) / 2 * qs; ps = 0.5 * qs * (p - aS); dwl = 0.5 * (Qe - qs) * (D(qs) - S(qs));
      note = `Binding ceiling: buyers want ${fmt(qd, 1)} units but sellers offer only ${fmt(qs, 1)}. Trades between ${fmt(qs, 1)} and ${Qe} units no longer happen, which is the deadweight loss.`;
    } else {
      const qd = Qd(p), qs = Qs(p);
      if (st.mode === "floor") {
        if (showAreas) {
          poly(F, [[0, aD], [0, p], [qd, p]], "var(--cs)");
          poly(F, [[0, p], [qd, p], [qd, S(qd)], [0, aS]], "var(--ps)");
          poly(F, [[qd, p], [Qe, Pe], [qd, S(qd)]], "var(--dwl)", 0.6);
          bracket(F, qd, qs, p, `Unsold surplus ${fmt(qs - qd, 1)}`, "var(--bad)");
        }
        cs = 0.5 * qd * (aD - p); ps = (p - aS + p - S(qd)) / 2 * qd; dwl = 0.5 * (Qe - qd) * (p - S(qd));
        note = `Binding floor: sellers offer ${fmt(qs, 1)} units but buyers take only ${fmt(qd, 1)}. Trades between ${fmt(qd, 1)} and ${Qe} units no longer happen, which is the deadweight loss.`;
      } else {
        if (showAreas) {
          poly(F, [[0, aD], [0, p], [qd, p]], "var(--cs)");
          poly(F, [[0, p], [qs, p], [0, aS]], "var(--ps)");
          poly(F, [[qd, 0], [qd, p], [qs, p], [qs, 0]], "var(--gov)", 0.28, "var(--gov)");
          const gt = svgEl("text", { x: (F.X(qd) + F.X(qs)) / 2, y: F.Y(p / 2), "text-anchor": "middle", class: "svg-label", style: "font-weight:600;fill:#3b4a72" }, F.layer);
          gt.textContent = `Government buys ${fmt(qs - qd, 1)}`;
        }
        cs = 0.5 * qd * (aD - p); ps = 0.5 * qs * (p - aS); gov = p * (qs - qd);
        note = `Government purchases: producers sell ${fmt(qs, 1)} units at $${p}. Consumers buy ${fmt(qd, 1)}, and the government buys the other ${fmt(qs - qd, 1)} at a cost of ${money(gov)} to taxpayers.`;
      }
    }
    drawCurve(F, aD, bD, { color: "#141b34", label: "D", dy: -2 });
    drawCurve(F, aS, bS, { color: "#a8782c", label: "S" });
    if (st.mode !== "none") hline(F, p, st.mode === "ceiling" ? "#a8402e" : "#2f6b4a", st.mode === "ceiling" ? "Ceiling" : "Floor");
    else guide(F, Qe, Pe, "Q*", "P*");
    ctl.querySelector("#spVerdict").innerHTML = showAreas ? note : "Make your prediction to see the result.";
    const base = 0.5 * Qe * (aD - Pe) + 0.5 * Qe * (Pe - aS);
    const total = cs + ps - gov;
    ctl.querySelector("#spRead").innerHTML = showAreas ? `<table>
      <tr><td>${swatch("var(--cs)")}Consumer surplus</td><td>${money(cs)}</td></tr>
      <tr><td>${swatch("var(--ps)")}Producer surplus</td><td>${money(ps)}</td></tr>
      ${st.mode === "gov" && o.kind === "surplus" ? `<tr><td>${swatch("var(--gov)")}Government cost</td><td>−${money(gov)}</td></tr>` : ""}
      ${dwl ? `<tr><td>${swatch("var(--dwl)")}Deadweight loss</td><td>${money(dwl)}</td></tr>` : ""}
      <tr><td><b>${st.mode === "gov" && o.kind === "surplus" ? "Net (CS + PS − government cost)" : "Total surplus"}</b></td><td><b>${money(total)}</b></td></tr>
      <tr><td>${st.mode === "gov" && o.kind === "surplus" ? swatch("var(--dwl)") + "Deadweight loss (change from free market)" : "Change from free market"}</td><td>${total - base >= -0.5 ? "none" : "−" + money(base - total)}</td></tr>
    </table>` : "";
  }
  draw();
};

/* ================= 3. Elasticity and total revenue ================= */
GRAPHS["see-elasticity"] = function (sec) {
  const { svg, ctl } = seeHeader(sec, "See it · Unit 6", "Elasticity &amp; total revenue",
    "Change the price and watch quantity respond. Percent changes are measured from the starting values, and price elasticity of demand keeps its negative sign.");
  svg.setAttribute("aria-label", "Elasticity and total revenue graph");
  const F = makeFrame(svg, 120, 60, "Quantity", "Price ($)");
  const PRESETS = {
    wheat: { name: "Wheat (few substitutes)", A: 100, B: 0.5 },   // Q = A − B·P
    meals: { name: "Restaurant meals (many substitutes)", A: 120, B: 2 }
  };
  const P0 = 40;
  const st = { k: "wheat", p1: 40, predicted: false };
  ctl.innerHTML = `
    <div><div class="lbl">Market</div><div class="seg" id="elMk">
      <button data-k="wheat" aria-pressed="true">Wheat</button><button data-k="meals">Restaurant meals</button></div></div>
    <div class="predict" id="elPredict"></div>
    <div class="ctrl"><label for="elP">New price <b id="elPv">$40</b></label><input type="range" id="elP" min="32" max="55" step="1" value="40" disabled></div>
    <div class="readout" id="elRead"></div>
    <div class="see-note">Elasticity = %ΔQ ÷ %ΔP, with each percent change = (new − starting) ÷ starting. Starting price is $${P0}.</div>`;
  const mk = ctl.querySelectorAll("#elMk button"), sl = ctl.querySelector("#elP");
  mk.forEach(b => b.addEventListener("click", () => {
    st.k = b.dataset.k; mk.forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    st.p1 = P0; sl.value = P0; st.predicted = false; sl.disabled = true; askPredict(); draw();
  }));
  sl.addEventListener("input", () => { st.p1 = +sl.value; draw(); });
  const Q = p => PRESETS[st.k].A - PRESETS[st.k].B * p;

  function askPredict() {
    const box = ctl.querySelector("#elPredict"); box.hidden = false;
    box.innerHTML = `<div class="p-q">${PRESETS[st.k].name}: if the price rises from $40 to $48, what happens to total revenue?</div>
      <div class="seg"><button data-a="up">Rises</button><button data-a="down">Falls</button><button data-a="same">Stays the same</button></div><div class="p-res"></div>`;
    box.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      const tr0 = P0 * Q(P0), tr1 = 48 * Q(48), ans = tr1 > tr0 ? "up" : "down", right = b.dataset.a === ans;
      const e = ((Q(48) - Q(P0)) / Q(P0)) / ((48 - P0) / P0);
      box.querySelector(".p-res").innerHTML = `<b style="color:${right ? "var(--good)" : "var(--bad)"}">${right ? "Right." : "Not quite."}</b> Revenue ${ans === "up" ? "rises" : "falls"}: the elasticity over that change is ${fmt(e, 2)}, so demand is ${Math.abs(e) < 1 ? "inelastic and price and revenue move together" : "elastic and price and revenue move in opposite directions"}. Now try other prices.`;
      box.querySelectorAll("button").forEach(x => x.disabled = true);
      st.predicted = true; sl.disabled = false; st.p1 = 48; sl.value = 48; draw();
      if (window.DT && DT.recordSee) DT.recordSee("elasticity", right);
    }));
  }
  function draw() {
    clearLayer(F);
    const pr = PRESETS[st.k], q0 = Q(P0), p1 = st.p1, q1 = Q(p1);
    // revenue rectangles
    if (p1 !== P0) {
      if (p1 > P0) {
        poly(F, [[0, P0], [0, p1], [q1, p1], [q1, P0]], "var(--cs)", 0.55);          // gained from higher price
        poly(F, [[q1, 0], [q1, P0], [q0, P0], [q0, 0]], "var(--dwl)", 0.5);          // lost from lower quantity
        poly(F, [[0, 0], [0, P0], [q1, P0], [q1, 0]], "var(--ps)", 0.35);
      } else {
        poly(F, [[q0, 0], [q0, p1], [q1, p1], [q1, 0]], "var(--cs)", 0.55);
        poly(F, [[0, p1], [0, P0], [q0, P0], [q0, p1]], "var(--dwl)", 0.5);
        poly(F, [[0, 0], [0, p1], [q0, p1], [q0, 0]], "var(--ps)", 0.35);
      }
    } else {
      poly(F, [[0, 0], [0, P0], [q0, P0], [q0, 0]], "var(--ps)", 0.35);
    }
    drawCurve(F, pr.A / pr.B, -1 / pr.B, { color: "#141b34", label: "D", dy: -2 });
    svgEl("circle", { cx: F.X(q0), cy: F.Y(P0), r: 4.5, fill: "#fffaf0", stroke: "#141b34", "stroke-width": 2 }, F.layer);
    guide(F, q1, p1, "", "");
    ctl.querySelector("#elPv").textContent = "$" + p1;
    const dP = (p1 - P0) / P0, dQ = (q1 - q0) / q0, tr0 = P0 * q0, tr1 = p1 * q1;
    let e = dP === 0 ? null : dQ / dP;
    const cls = e === null ? "move the price" : Math.abs(e) > 1.005 ? "elastic (|E| > 1)" : Math.abs(e) < 0.995 ? "inelastic (|E| < 1)" : "unit elastic (|E| = 1)";
    ctl.querySelector("#elRead").innerHTML = `<table>
      <tr><td>Quantity</td><td>${fmt(q0, 1)} → ${fmt(q1, 1)}</td></tr>
      <tr><td>%ΔP from start</td><td>${dP >= 0 ? "+" : ""}${fmt(dP * 100, 1)}%</td></tr>
      <tr><td>%ΔQ from start</td><td>${dQ >= 0 ? "+" : ""}${fmt(dQ * 100, 1)}%</td></tr>
      <tr><td><b>Price elasticity of demand</b></td><td><b>${e === null ? "-" : fmt(e, 2)}</b></td></tr>
      <tr><td>Demand is</td><td>${cls}</td></tr>
      <tr><td>${swatch("var(--ps)")}Total revenue</td><td>${money(tr0)} → ${money(tr1)}</td></tr>
      ${p1 !== P0 ? `<tr><td>${swatch("var(--cs)")}Gained from ${p1 > P0 ? "higher price" : "more units"}</td><td>+${money(p1 > P0 ? (p1 - P0) * q1 : (q1 - q0) * p1)}</td></tr>
      <tr><td>${swatch("var(--dwl)")}Lost from ${p1 > P0 ? "fewer units" : "lower price"}</td><td>−${money(p1 > P0 ? (q0 - q1) * P0 : (P0 - p1) * q0)}</td></tr>` : ""}
    </table>`;
  }
  askPredict(); draw();
};

/* ================= 4. Externalities ================= */
GRAPHS["see-externality"] = function (sec) {
  const { svg, ctl } = seeHeader(sec, "See it · Unit 10", "Externalities",
    "When producers don't pay for a cost they impose, or don't get paid for a benefit they create, the market misses the efficient quantity. Predict which way, then fix it with a tax or subsidy.");
  svg.setAttribute("aria-label", "Externality graph with marginal social cost and marginal private cost");
  const F = makeFrame(svg, 100, 100, "Quantity", "Price ($)");
  const aD = 90, bD = -0.8, aS = 10, bS = 0.8, E = 20;
  const st = { kind: "neg", policy: 0, revealed: false };
  ctl.innerHTML = `
    <div><div class="lbl">Case</div><div class="seg" id="exK">
      <button data-k="neg" aria-pressed="true">Hog farm runoff (negative)</button><button data-k="pos">Beekeeping pollination (positive)</button></div></div>
    <div class="predict" id="exPredict"></div>
    <div class="ctrl"><label for="exT"><span id="exTl">Per-unit tax</span> <b id="exTv">$0</b></label><input type="range" id="exT" min="0" max="35" step="1" value="0" disabled></div>
    <div class="verdict-box" id="exVerdict"></div>
    <div class="readout" id="exRead"></div>
    <div class="see-note">Both cases are drawn on the production side. The gap between marginal social cost (MSC) and marginal private cost (MPC) is the external cost or benefit per unit, $${E} here.</div>`;
  const kb = ctl.querySelectorAll("#exK button"), sl = ctl.querySelector("#exT");
  kb.forEach(b => b.addEventListener("click", () => {
    st.kind = b.dataset.k; kb.forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    st.policy = 0; sl.value = 0; sl.disabled = true; st.revealed = false; askPredict(); draw();
  }));
  sl.addEventListener("input", () => { st.policy = +sl.value; draw(); });

  const aMSC = () => st.kind === "neg" ? aS + E : aS - E;
  function askPredict() {
    const box = ctl.querySelector("#exPredict");
    const what = st.kind === "neg" ? "Runoff from hog farms harms people downstream, and farms don't pay for it." : "Bees pollinate neighboring orchards, and beekeepers aren't paid for it.";
    box.innerHTML = `<div class="p-q">${what} Compared with the efficient amount, the market produces:</div>
      <div class="seg"><button data-a="more">Too much</button><button data-a="less">Too little</button><button data-a="same">The efficient amount</button></div><div class="p-res"></div>`;
    box.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      const ans = st.kind === "neg" ? "more" : "less", right = b.dataset.a === ans;
      box.querySelector(".p-res").innerHTML = `<b style="color:${right ? "var(--good)" : "var(--bad)"}">${right ? "Right." : "Not quite."}</b> ${st.kind === "neg"
        ? "Farms ignore the harm, so their private cost is below the social cost. The market produces past the efficient quantity. Try a tax."
        : "Beekeepers bear the full cost but the orchard benefit is unpaid, so social cost is below private cost. The market produces too few hives. Try a subsidy."}`;
      box.querySelectorAll("button").forEach(x => x.disabled = true);
      st.revealed = true; sl.disabled = false; draw();
      if (window.DT && DT.recordSee) DT.recordSee("externality", right);
    }));
  }
  function draw() {
    clearLayer(F);
    const neg = st.kind === "neg", t = st.policy;
    const aM = aMSC();
    const qMkt = (aD - aS) / (bS - bD);
    const qEff = (aD - aM) / (bS - bD), pEff = aD + bD * qEff;
    const aPol = neg ? aS + t : aS - t;                 // supply facing the market with policy
    const qCur = (aD - aPol) / (bS - bD), pCur = aD + bD * qCur;
    ctl.querySelector("#exTl").textContent = neg ? "Per-unit tax" : "Per-unit subsidy";
    ctl.querySelector("#exTv").textContent = "$" + t;
    if (st.revealed) {
      const dmsc = aM + bS * qCur, dd = aD + bD * qCur;
      if (Math.abs(qCur - qEff) > 0.05) poly(F, [[qEff, pEff], [qCur, dmsc], [qCur, dd]], "var(--dwl)", 0.6);
    }
    drawCurve(F, aD, bD, { color: "#141b34", label: "D = MSB", dy: -2, dx: -60 });
    drawCurve(F, aS, bS, { color: "#a8782c", label: "MPC", dx: -38, dy: 16 });
    if (st.revealed) {
      drawCurve(F, aM, bS, { color: "#a8402e", label: "MSC", dx: -38, dy: -6 });
      if (t > 0) drawCurve(F, aPol, bS, { color: "#6b7fa8", width: 2, dash: "7 5", label: neg ? "MPC + tax" : "MPC − subsidy", dx: -96, dy: neg ? -8 : 18 });
      guide(F, qEff, pEff, "", "");
      const lab = svgEl("text", { x: F.X(qEff) + (neg ? -82 : 8), y: F.Y(pEff) - 10, class: "svg-label", style: "font-weight:600;fill:#a8402e" }, F.layer); lab.textContent = "Efficient";
    }
    svgEl("circle", { cx: F.X(qCur), cy: F.Y(pCur), r: 5.5, fill: "#d8a249", stroke: "#141b34", "stroke-width": 2 }, F.layer);
    const ml = svgEl("text", { x: F.X(qCur) + 9, y: F.Y(pCur) + 18, class: "svg-label", style: "font-weight:600" }, F.layer); ml.textContent = t > 0 ? "Market with policy" : "Market";
    const dwl = st.revealed ? 0.5 * Math.abs(qCur - qEff) * Math.abs((aM + bS * qCur) - (aD + bD * qCur)) : 0;
    let v;
    if (!st.revealed) v = "Make your prediction to see the social cost curve.";
    else if (Math.abs(qCur - qEff) < 0.05) v = `The ${neg ? "tax" : "subsidy"} equals the external ${neg ? "cost" : "benefit"} of $${E} per unit, so producers' cost now matches the marginal social cost and the market lands on the efficient quantity. Deadweight loss is gone.`;
    else if (neg ? qCur > qEff : qCur < qEff) v = `The market makes ${fmt(qCur, 1)} units, but the efficient quantity is ${fmt(qEff, 1)}. The red triangle is the deadweight loss from ${neg ? "overproduction" : "underproduction"}.`;
    else v = `The ${neg ? "tax" : "subsidy"} is larger than the external ${neg ? "cost" : "benefit"}, so the market now ${neg ? "underproduces" : "overproduces"}. Deadweight loss is back, on the other side.`;
    ctl.querySelector("#exVerdict").innerHTML = v;
    ctl.querySelector("#exRead").innerHTML = st.revealed ? `<table>
      <tr><td>Market quantity (no policy)</td><td>${fmt(qMkt, 1)}</td></tr>
      <tr><td>Efficient quantity</td><td>${fmt(qEff, 1)}</td></tr>
      <tr><td>Quantity with policy</td><td>${fmt(qCur, 1)}</td></tr>
      <tr><td>${swatch("var(--dwl)")}Deadweight loss</td><td>${money(dwl)}</td></tr>
    </table>` : "";
  }
  askPredict(); draw();
};
