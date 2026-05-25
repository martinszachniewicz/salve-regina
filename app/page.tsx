"use client";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   SALVE REGINA — Winnica
   Heraldyczny Minimalizm
   Bordo · Złoto Jagiellońskie · Pergamin · Drewno
───────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Jost:wght@200;300;400&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}

:root{
  --parch:   #EEE3C6;
  --linen:   #E1CEA4;
  --linen2:  #D0B87C;
  --bordo:   #7A1C2E;
  --bordo2:  #9B2D3F;
  --red:     #BE3535;
  --gold:    #B8852A;
  --gold2:   #D4A848;
  --granat:  #1B2D48;
  --wood:    #5A381A;
  --wood2:   #8A5C30;
  --ink:     #18100A;
  --ink2:    #3A2410;
  --mid:     #6A4830;
  --border:  rgba(90,56,26,.15);
}

body{font-family:'Jost',sans-serif;background:var(--parch);color:var(--ink);overflow-x:hidden;}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--parch);}
::-webkit-scrollbar-thumb{background:var(--bordo);opacity:.5;}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:2rem 5rem;
  display:flex;align-items:center;justify-content:space-between;
  transition:all .5s cubic-bezier(.16,1,.3,1);
  background:var(--bordo);
}
.nav.scrolled{
  padding:1rem 5rem;
  background:rgba(24,16,10,.95);
  backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(184,133,42,.15);
}
.nav.scrolled .logo-main{color:var(--parch);}
.nav.scrolled .nav-links a{color:rgba(238,227,198,.5);}
.nav.scrolled .nav-links a:hover,.nav.scrolled .nav-links a.active{color:var(--gold2);}
.nav.scrolled .nav-cta{border-color:rgba(184,133,42,.4) !important;color:var(--gold) !important;}
.nav-logo{cursor:pointer;text-decoration:none;}
.logo-main{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:400;color:var(--parch);letter-spacing:.06em;display:block;line-height:1;transition:color .5s;}
.logo-sub{font-family:'Cinzel',serif;font-size:.42rem;letter-spacing:.55em;color:var(--gold);display:block;margin-top:3px;text-transform:uppercase;}
.nav-links{display:flex;gap:2.5rem;list-style:none;align-items:center;}
.nav-links a{
  font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.28em;
  color:rgba(238,227,198,.8);text-decoration:none;cursor:pointer;
  text-transform:uppercase;transition:color .3s;
}
.nav-links a:hover,.nav-links a.active{color:var(--parch);}
.nav-cta{
  padding:.5rem 1.4rem;
  border:1px solid rgba(238,227,198,.5) !important;
  color:var(--parch) !important;
  transition:all .3s !important;
}
.nav-cta:hover{background:var(--bordo) !important;border-color:var(--bordo) !important;color:var(--parch) !important;}

/* ── HERO ── */
.hero{
  min-height:100vh;
  background:var(--parch);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.hero-noise{
  position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity:.4;pointer-events:none;
}
.hero-glow{
  position:absolute;
  width:600px;height:600px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(122,28,46,.2) 0%,transparent 70%);
  top:50%;left:55%;transform:translate(-50%,-50%);
  pointer-events:none;
}
.hero-glow2{
  position:absolute;
  width:400px;height:400px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(184,133,42,.08) 0%,transparent 70%);
  bottom:10%;left:15%;
  pointer-events:none;
}
.hero-inner{
  position:relative;z-index:2;
  text-align:center;
  padding:0 2rem;
  max-width:900px;
}

/* fade-in animations */
.fade-up{opacity:0;transform:translateY(28px);animation:fadeUp .9s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes fadeUp{to{opacity:1;transform:translateY(0);}}
.delay-1{animation-delay:.2s;}
.delay-2{animation-delay:.45s;}
.delay-3{animation-delay:.65s;}
.delay-4{animation-delay:.85s;}
.delay-5{animation-delay:1.05s;}

.hero-eyebrow{
  font-family:'Cinzel',serif;font-size:.57rem;letter-spacing:.55em;
  color:rgba(238,227,198,.85);margin-bottom:2rem;text-transform:uppercase;
}
.hero-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(4rem,10vw,8.5rem);
  font-weight:300;color:var(--parch);line-height:.95;
  margin-bottom:1.2rem;
}
.hero-title em{font-style:italic;color:var(--gold2);}
.hero-haft{margin:1.5rem auto;}
.hero-sub{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1rem,2.5vw,1.4rem);
  font-weight:300;font-style:italic;
  color:rgba(238,227,198,.75);
  letter-spacing:.1em;margin-bottom:3.5rem;
}
.hero-btns{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;}

/* ── BUTTONS ── */
.btn{
  font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.28em;
  text-transform:uppercase;padding:.9rem 2.8rem;
  cursor:pointer;border:none;transition:all .4s cubic-bezier(.16,1,.3,1);
  display:inline-block;text-decoration:none;
}
.btn-bordo{background:var(--bordo);color:var(--parch);}
.btn-bordo:hover{background:var(--bordo2);transform:translateY(-2px);}
.btn-ghost{background:transparent;color:rgba(238,227,198,.85);border:1px solid rgba(238,227,198,.35);}
.btn-ghost:hover{border-color:rgba(238,227,198,.7);color:var(--parch);background:rgba(238,227,198,.1);}
.btn-gold{background:var(--gold);color:var(--parch);}
.btn-gold:hover{background:var(--gold2);transform:translateY(-2px);}
.btn-dark{background:var(--ink);color:var(--parch);}
.btn-dark:hover{background:var(--ink2);}

/* ── SCROLL CUE ── */
.scroll-cue{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;z-index:2;
}
.scroll-bar{width:1px;height:50px;background:linear-gradient(to bottom,var(--gold),transparent);animation:scrollBar 2.4s ease-in-out infinite;}
@keyframes scrollBar{0%{opacity:0;transform:scaleY(0);transform-origin:top}60%{opacity:1}100%{opacity:0;transform:scaleY(1);transform-origin:top}}
.scroll-txt{font-family:'Cinzel',serif;font-size:.45rem;letter-spacing:.4em;color:rgba(238,227,198,.35);}

/* ── SECTIONS ── */
.sec{padding:8rem 5rem;}
.sec-inner{max-width:1280px;margin:0 auto;}
.sec-label{font-family:'Cinzel',serif;font-size:.55rem;letter-spacing:.48em;color:var(--bordo);margin-bottom:.9rem;display:block;}
.sec-h2{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.4rem,5vw,4.2rem);
  font-weight:300;color:var(--ink);line-height:1.05;
}
.sec-h2 em{font-style:italic;}

/* scroll-reveal */
.reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-delay-1{transition-delay:.1s;}
.reveal-delay-2{transition-delay:.2s;}
.reveal-delay-3{transition-delay:.3s;}
.reveal-delay-4{transition-delay:.4s;}

/* ── O NAS ── */
.about{background:var(--parch);}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center;}
.about-lead{
  font-family:'Cormorant Garamond',serif;
  font-size:1.35rem;font-weight:300;font-style:italic;
  color:var(--mid);line-height:1.65;margin:2.2rem 0 1.5rem;
}
.about-body{font-size:.87rem;font-weight:300;line-height:1.95;color:var(--mid);margin-bottom:.9rem;}
.about-stats{
  display:grid;grid-template-columns:1fr 1fr;
  gap:1.8rem 2rem;
  margin-top:3rem;padding-top:2.8rem;
  border-top:1px solid var(--border);
}
.stat-num{font-family:'Cormorant Garamond',serif;font-size:3.2rem;font-weight:300;color:var(--bordo);line-height:1;}
.stat-lbl{font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.2em;color:var(--mid);margin-top:.3rem;}

.about-visual{position:relative;height:580px;}
.av-bg{position:absolute;inset:0;background:var(--linen);}
.av-accent{position:absolute;bottom:-2rem;right:-2rem;width:65%;height:65%;border:1px solid var(--gold);opacity:.22;}
.av-content{
  position:absolute;inset:0;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  gap:1.5rem;z-index:1;
}
.av-yr{
  font-family:'Cormorant Garamond',serif;
  font-size:10rem;font-weight:300;
  color:var(--wood);opacity:.07;
  position:absolute;line-height:1;
}
.av-emblem{position:relative;z-index:2;}
.av-loc{
  font-family:'Cormorant Garamond',serif;
  font-size:1.1rem;font-style:italic;
  color:var(--wood2);position:relative;z-index:2;
}
.av-route{position:absolute;bottom:2rem;left:0;right:0;text-align:center;}
.route-lbl{font-family:'Cinzel',serif;font-size:.47rem;letter-spacing:.38em;color:var(--gold);text-transform:uppercase;}

/* ── WINA ── */
.wines{background:var(--linen);}
.wines-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4.5rem;gap:2rem;flex-wrap:wrap;}
.wines-note{font-size:.82rem;font-weight:300;color:var(--mid);line-height:1.85;max-width:300px;}
.wines-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}

.wc{
  background:var(--parch);
  padding:2.8rem 2rem;
  cursor:default;
  transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s;
  position:relative;overflow:hidden;
}
.wc::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(to right,var(--bordo),var(--gold),var(--bordo));
  transform:scaleX(0);transform-origin:left;
  transition:transform .5s cubic-bezier(.16,1,.3,1);
}
.wc:hover::before{transform:scaleX(1);}
.wc:hover{transform:translateY(-6px);box-shadow:0 30px 70px rgba(90,56,26,.1);}

.wc-badge{
  font-family:'Cinzel',serif;font-size:.46rem;letter-spacing:.24em;
  color:var(--gold);background:rgba(184,133,42,.1);
  border:1px solid rgba(184,133,42,.25);
  padding:.25rem .7rem;display:inline-block;margin-bottom:2rem;
}
.wc-ph{height:2rem;}
.wc-yr{font-family:'Cinzel',serif;font-size:.54rem;letter-spacing:.28em;color:var(--bordo2);margin-bottom:.3rem;}
.wc-name{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:400;color:var(--ink);margin-bottom:.3rem;line-height:1.1;}
.wc-type{font-family:'Cormorant Garamond',serif;font-size:.82rem;font-style:italic;color:var(--mid);margin-bottom:1.2rem;}
.wc-rule{width:24px;height:1px;background:var(--bordo);opacity:.3;margin-bottom:1.2rem;}
.wc-desc{font-size:.78rem;font-weight:300;line-height:1.8;color:var(--mid);}

/* ── SKLEP ── */
.shop{background:var(--parch);}
.shop .sec-label{color:var(--bordo);}
.shop .sec-h2{color:var(--ink);}
.shop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-top:4rem;}

.sc{
  background:rgba(90,56,26,.04);
  border:1px solid rgba(90,56,26,.14);
  padding:2.2rem 1.8rem;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  cursor:pointer;position:relative;
}
.sc::after{
  content:'';position:absolute;inset:0;
  border:1px solid rgba(184,133,42,.5);
  opacity:0;transition:opacity .4s;
}
.sc:hover{background:rgba(90,56,26,.08);transform:translateY(-4px);}
.sc:hover::after{opacity:1;}

.sc-note{font-family:'Cinzel',serif;font-size:.46rem;letter-spacing:.24em;color:var(--gold);margin-bottom:.5rem;}
.sc-ph{height:1rem;}
.sc-name{font-family:'Cormorant Garamond',serif;font-size:1.65rem;font-weight:400;color:var(--ink);margin-bottom:.25rem;line-height:1.1;}
.sc-yr{font-family:'Cinzel',serif;font-size:.5rem;letter-spacing:.24em;color:var(--bordo2);margin-bottom:.3rem;}
.sc-type{font-family:'Cormorant Garamond',serif;font-size:.78rem;font-style:italic;color:rgba(238,227,198,.82);margin-bottom:1.5rem;}
.sc-bottom{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:1.4rem;border-top:1px solid rgba(90,56,26,.12);margin-top:1.4rem;
}
.sc-price{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--bordo);}
.sc-price sup{font-size:.65rem;font-family:'Cinzel',serif;color:var(--mid);vertical-align:super;margin-left:1px;}
.add-btn{
  width:42px;height:42px;
  border:1px solid rgba(90,56,26,.25);
  background:transparent;color:var(--ink);
  cursor:pointer;font-size:1.15rem;
  display:flex;align-items:center;justify-content:center;
  transition:all .3s;font-family:'Cinzel',serif;
}
.add-btn:hover,.add-btn.added{background:var(--bordo);border-color:var(--bordo);}
.add-btn.added{background:var(--bordo);}

.cart-summary{
  margin-top:2.8rem;
  padding:1.6rem 2rem;
  border:1px solid rgba(90,56,26,.15);
  background:rgba(90,56,26,.04);
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:1.5rem;
}
.cart-info{font-size:.82rem;font-weight:300;color:var(--mid);}
.cart-info strong{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:400;color:var(--ink);}
.shop-note{margin-top:1.5rem;font-size:.65rem;color:var(--mid);opacity:.5;font-weight:300;letter-spacing:.07em;font-family:'Cinzel',serif;}

/* ── JAGIELLONIAN BANNER ── */
.jag-banner{
  background:var(--bordo);
  padding:5rem;
  position:relative;overflow:hidden;
}
.jag-bg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse at 80% 50%,rgba(184,133,42,.12) 0%,transparent 60%);
}
.jag-inner{
  max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:1fr auto;
  align-items:center;gap:4rem;position:relative;z-index:1;
}
.jag-txt .sec-label{color:rgba(184,133,42,.75);}
.jag-h{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:300;color:var(--parch);line-height:1.1;margin-bottom:1.2rem;}
.jag-h em{font-style:italic;color:var(--gold2);}
.jag-body{font-size:.85rem;font-weight:300;line-height:1.9;color:rgba(238,227,198,.6);}
.jag-emblem{opacity:.18;}

/* ── KONTAKT ── */
.contact{background:var(--ink);}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:8rem;margin-top:4rem;align-items:start;}
.ci{margin-bottom:2.5rem;}
.ci-label{font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.38em;color:rgba(184,133,42,.7);margin-bottom:.6rem;display:block;}
.ci-val{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;color:var(--parch);line-height:1.6;}
.ci-note{font-size:.78rem;font-weight:300;color:rgba(238,227,198,.45);margin-top:.3rem;}

.map-box{background:rgba(238,227,198,.06);border:1px solid rgba(238,227,198,.1);height:440px;position:relative;overflow:hidden;}
.map-grid{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(238,227,198,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(238,227,198,.07) 1px,transparent 1px);
  background-size:48px 48px;
}
.map-grid2{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(238,227,198,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(238,227,198,.03) 1px,transparent 1px);
  background-size:12px 12px;
}
.map-pin-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.map-ping{
  width:14px;height:14px;background:var(--bordo);border-radius:50%;
  margin:0 auto 8px;
  box-shadow:0 0 0 8px rgba(122,28,46,.15),0 0 0 16px rgba(122,28,46,.07);
  animation:ping 2.5s ease-in-out infinite;
}
@keyframes ping{0%,100%{box-shadow:0 0 0 0 rgba(122,28,46,.3),0 0 0 0 rgba(122,28,46,.15);}50%{box-shadow:0 0 0 10px rgba(122,28,46,.12),0 0 0 22px rgba(122,28,46,.05);}}
.map-pin-lbl{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:var(--parch);white-space:nowrap;}
.map-route{position:absolute;top:1.4rem;left:1.4rem;}
.map-route-lbl{font-family:'Cinzel',serif;font-size:.47rem;letter-spacing:.34em;color:rgba(184,133,42,.7);text-transform:uppercase;}
.map-coords{position:absolute;bottom:1.4rem;right:1.4rem;font-family:'Cinzel',serif;font-size:.48rem;letter-spacing:.16em;color:rgba(238,227,198,.3);}

/* ── FOOTER ── */
footer{
  background:var(--ink);
  padding:3rem 5rem;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:1.5rem;
  border-top:1px solid rgba(238,227,198,.06);
}
.ft-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:400;color:var(--parch);}
.ft-links{display:flex;gap:2.5rem;list-style:none;}
.ft-links a{font-family:'Cinzel',serif;font-size:.5rem;letter-spacing:.22em;color:rgba(238,227,198,.25);text-decoration:none;cursor:pointer;transition:color .3s;text-transform:uppercase;}
.ft-links a:hover{color:var(--gold);}
.ft-copy{font-family:'Cinzel',serif;font-size:.48rem;letter-spacing:.12em;color:rgba(238,227,198,.18);}

/* ── RESPONSIVE ── */
@media(max-width:1100px){
  .nav,.nav.scrolled{padding-left:3rem;padding-right:3rem;}
  .sec{padding:6rem 3rem;}
  .about-grid,.contact-grid{grid-template-columns:1fr;gap:4rem;}
  .about-visual{height:320px;}
  .wines-grid,.shop-grid{grid-template-columns:repeat(2,1fr);}
  .jag-banner{padding:4rem 3rem;}
  .jag-inner{grid-template-columns:1fr;}
  footer{padding:2.5rem 3rem;}
}
@media(max-width:640px){
  .nav,.nav.scrolled{padding:1rem 1.5rem;}
  .nav-links{display:none;}
  .sec{padding:5rem 1.5rem;}
  .wines-grid,.shop-grid{grid-template-columns:1fr;}
  footer{flex-direction:column;padding:2rem 1.5rem;gap:1.2rem;}
  .jag-banner{padding:3.5rem 1.5rem;}
}
`;

/* ─── DATA ─────────────────────────────────────── */
const WINES = [
  { id:1, name:"Brut Nature",    year:"2023", type:"Białe musujące",     badge:"Nowy rocznik",       desc:"Eleganckie, mineralne. Nuty zielonych jabłek, cytryny i świeżych drożdży. Długa, kremowa piana — wyraz naszej kredowej gleby.", price:95,  bottleColor:"#1B2D48" },
  { id:2, name:"Rosé Brut",      year:"2023", type:"Różowe musujące",    badge:"",                    desc:"Delikatne i aromatyczne. Truskawki, maliny, odrobina dzikiej róży. Żywe bąbelki, jedwabiste wykończenie. Lato w kieliszku.", price:105, bottleColor:"#6B1A1A" },
  { id:3, name:"Blanc de Noirs", year:"2022", type:"Białe musujące",     badge:"Limitowana edycja",  desc:"Pełne i złożone — z czerwonych odmian. Brioche, orzechy laskowe, subtelne nuty czerwonych owoców. Najdłuższe leżakowanie.", price:118, bottleColor:"#18100A" },
  { id:4, name:"Demi-Sec",       year:"2023", type:"Półsłodkie musujące",badge:"",                    desc:"Łagodny styl dla miłośników owoców. Gruszka, brzoskwinia, kwiat akacji. Idealny na deser i letnie popołudnia w winnicy.", price:89,  bottleColor:"#3A5C44" },
];

/* ─── SVG HELPERS ─────────────────────────────── */
function HaftBorder({ width = 700, primary = "#7A1C2E", accent = "#B8852A", light = false }) {
  const step = 26, r = 6.5;
  const items = [];
  for (let x = step / 2; x < width; x += step) {
    items.push(
      <g key={x} transform={`translate(${x},12)`}>
        <rect x={-r} y={-r} width={r*2} height={r*2} transform="rotate(45)" fill={primary} opacity={light?"0.18":"0.65"}/>
        <rect x={-r*.42} y={-r*.42} width={r*.84} height={r*.84} transform="rotate(45)" fill={accent} opacity={light?"0.22":"0.75"}/>
      </g>
    );
    if (x + step/2 < width) {
      items.push(
        <g key={`d${x}`} transform={`translate(${x+step/2},12)`}>
          <rect x={-3.5} y={-3.5} width={7} height={7} transform="rotate(45)" fill={primary} opacity={light?"0.08":"0.28"}/>
        </g>
      );
    }
  }
  return (
    <svg width="100%" viewBox={`0 0 ${width} 24`} preserveAspectRatio="xMidYMid meet" style={{display:"block"}}>
      <line x1="0" y1="2" x2={width} y2="2" stroke={primary} strokeWidth=".7" opacity={light?"0.12":"0.3"}/>
      <line x1="0" y1="22" x2={width} y2="22" stroke={primary} strokeWidth=".7" opacity={light?"0.12":"0.3"}/>
      {items}
    </svg>
  );
}

function HeraldEmblem({ size = 110, c = "#B8852A", opacity = 1 }) {
  const cx = size/2, cy = size/2, r = size*.4;
  const pts8 = (rad: number) => Array.from({length:8},(_,i) => {
    const a = (i*Math.PI/4) - Math.PI/2;
    return `${cx+rad*Math.cos(a)},${cy+rad*Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{opacity}}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="1.2" opacity=".6"/>
      <circle cx={cx} cy={cy} r={r*.7} fill="none" stroke={c} strokeWidth=".8" opacity=".4"/>
      <circle cx={cx} cy={cy} r={r*.35} fill="none" stroke={c} strokeWidth=".6" opacity=".35"/>
      <polygon points={pts8(r*.55)} fill="none" stroke={c} strokeWidth=".9" opacity=".5"/>
      <polygon points={pts8(r*.35)} fill={c} opacity=".15"/>
      <line x1={cx-r} y1={cy} x2={cx+r} y2={cy} stroke={c} strokeWidth=".7" opacity=".3"/>
      <line x1={cx} y1={cy-r} x2={cx} y2={cy+r} stroke={c} strokeWidth=".7" opacity=".3"/>
      <line x1={cx-r*.7} y1={cy-r*.7} x2={cx+r*.7} y2={cy+r*.7} stroke={c} strokeWidth=".5" opacity=".2"/>
      <line x1={cx+r*.7} y1={cy-r*.7} x2={cx-r*.7} y2={cy+r*.7} stroke={c} strokeWidth=".5" opacity=".2"/>
      <polygon
        points={`${cx},${cy-r*.42} ${cx+r*.35},${cy+r*.24} ${cx-r*.35},${cy+r*.24}`}
        fill={c} opacity=".55"
      />
    </svg>
  );
}

function VineLeaf({ size = 90, c = "#3A2410" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none" style={{opacity:.18}}>
      <circle cx="45" cy="26" r="12" stroke={c} strokeWidth="1.1"/>
      <circle cx="28" cy="46" r="10" stroke={c} strokeWidth="1.1"/>
      <circle cx="62" cy="46" r="10" stroke={c} strokeWidth="1.1"/>
      <circle cx="38" cy="64" r="9" stroke={c} strokeWidth="1.1"/>
      <circle cx="54" cy="64" r="9" stroke={c} strokeWidth="1.1"/>
      <circle cx="45" cy="79" r="8" stroke={c} strokeWidth="1.1"/>
      <path d="M45 14 Q32 4 18 9 Q10 4 12 0" stroke={c} strokeWidth=".9" strokeLinecap="round" fill="none"/>
      <path d="M45 14 Q58 4 72 9 Q80 4 78 0" stroke={c} strokeWidth=".9" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function BottleSVG({ color="#18100A" }) {
  return (
    <svg width="44" height="130" viewBox="0 0 44 130" fill="none">
      <rect x="15" y="0" width="14" height="18" rx="2.5" fill={color} opacity=".6"/>
      <rect x="14" y="16" width="16" height="5" fill="rgba(184,133,42,.4)"/>
      <path d="M12 21 Q5 36 5 56 L5 118 Q5 127 22 127 Q39 127 39 118 L39 56 Q39 36 32 21 Z"
        fill={color} opacity=".85"/>
      <path d="M12 21 Q5 36 5 56 L5 84 Q14 77 22 77 Q30 77 39 84 L39 56 Q39 36 32 21 Z"
        fill={color} opacity=".1"/>
      <line x1="5" y1="86" x2="39" y2="86" stroke="rgba(238,227,198,.12)" strokeWidth="1"/>
    </svg>
  );
}

function CrossStar({ size=60, c1="#7A1C2E", c2="#B8852A" }) {
  const cx=size/2, cy=size/2, r=size*.38;
  const pts = (n,rad,offset=0) => Array.from({length:n},(_,i)=>{
    const a=(i*2*Math.PI/n)-Math.PI/2+offset;
    return `${cx+rad*Math.cos(a)},${cy+rad*Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={pts(8,r)} fill={c1} opacity=".75"/>
      <polygon points={pts(8,r*.6,Math.PI/8)} fill={c2} opacity=".7"/>
      <polygon points={pts(8,r*.3)} fill="rgba(238,227,198,.6)" opacity=".8"/>
    </svg>
  );
}

/* ─── MAIN COMPONENT ──────────────────────────── */
export default function SalveRegina() {
  const [scrolled, setScrolled]   = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const [cart, setCart]           = useState({});
  const revealRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const sections = ["hero","about","wines","shop","contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 200) setActiveNav(id);
      }
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});

  const toggleCart = (id) => setCart(p => ({...p, [id]: p[id] ? 0 : 1}));
  const cartCount  = Object.values(cart).filter(Boolean).length;
  const cartTotal  = WINES.reduce((s,w) => s + (cart[w.id]||0)*w.price, 0);

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAV ─────────────────────────────────── */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <a className="nav-logo" onClick={() => go("hero")}>
          <span className="logo-main">Salve Regina</span>
          <span className="logo-sub">Winnica · Lubelszczyzna</span>
        </a>
        <ul className="nav-links">
          {[["about","O nas"],["wines","Wina"],["shop","Sklep"],["contact","Kontakt"]].map(([id,lbl])=>(
            <li key={id}><a className={activeNav===id?"active":""} onClick={()=>go(id)}>{lbl}</a></li>
          ))}
          <li><a className="nav-cta" onClick={()=>go("shop")}>Zamów Wino</a></li>
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-noise"/>
        <div className="hero-glow"/>
        <div className="hero-glow2"/>

        <div className="hero-inner">
          <p className="hero-eyebrow fade-up delay-1">
            Kaznów · Ostrów Lubelski · Est. 2018
          </p>

          <h1 className="hero-title fade-up delay-2">
            Winnica<br/><em>Salve Regina</em>
          </h1>

          <div className="hero-haft fade-up delay-3">
            <HaftBorder width={600} primary="rgba(122,28,46,.5)" accent="rgba(184,133,42,.55)"/>
          </div>

          <p className="hero-sub fade-up delay-4">
            Musujące wina z serca Lubelszczyzny
          </p>

          <div className="hero-btns fade-up delay-5">
            <button className="btn btn-bordo" onClick={()=>go("wines")}>Poznaj nasze wina</button>
            <button className="btn btn-ghost" onClick={()=>go("about")}>Nasza historia</button>
          </div>
        </div>

        <div className="scroll-cue">
          <div className="scroll-bar"/>
          <span className="scroll-txt">scroll</span>
        </div>
      </section>

      {/* ── O NAS ───────────────────────────────── */}
      <section className="sec about" id="about">
        <div className="sec-inner">
          <div className="about-grid">
            <div>
              <span className="sec-label reveal">Nasza historia</span>
              <h2 className="sec-h2 reveal reveal-delay-1">
                Tradycja, <em>terroir</em><br/>i pasja do bąbelków
              </h2>
              <p className="about-lead reveal reveal-delay-2">
                Winnica Salve Regina powstała z miłości do ziemi lubelskiej i wiary,
                że polskie klimaty rodzą wybitne wina musujące.
              </p>
              <p className="about-body reveal reveal-delay-3">
                Leżymy na wzgórzach wsi Kaznów, kilka kilometrów od Ostrowa Lubelskiego.
                Łagodne stoki, wapienne gleby i długie, słoneczne lata tworzą wyjątkowy
                mikroklimat dla Chardonnay, Pinot Noir i Pinot Meunier.
              </p>
              <p className="about-body reveal reveal-delay-3">
                Przez naszą winnicę przebiega historyczny Szlak Jagielloński — trakt,
                którym podróżowali polscy królowie z dynastii Jagiellonów.
                Stare kroniki parafialne potwierdzają, że wino produkowano w Kaznowie
                już przed wiekami. Jesteśmy kontynuatorami, nie pionierami.
              </p>
              <p className="about-body reveal reveal-delay-3">
                Każde wino powstaje metodą tradycyjną — z ręcznych zbiorów i długiego
                leżakowania na osadzie. Wyraz miejsca, roku i rąk, które je stworzyły.
              </p>
              <div className="about-stats reveal reveal-delay-4">
                {[["6 ha","Powierzchnia winnicy"],["2018","Rok założenia"],["100%","Metoda tradycyjna"],["4","Rodzaje win musujących"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="stat-num">{n}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-visual reveal reveal-delay-2">
              <div className="av-bg"/>
              <div className="av-accent"/>
              <div className="av-content">
                <div className="av-yr">2018</div>
                <div className="av-emblem">
                  <VineLeaf size={120} c="#5A381A"/>
                </div>
                <CrossStar size={70} c1="#7A1C2E" c2="#B8852A"/>
                <div className="av-loc">Kaznów, Lubelszczyzna</div>
              </div>
              <div className="av-route">
                <div className="route-lbl">✦ Szlak Jagielloński ✦</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NASZE WINA ──────────────────────────── */}
      <section className="sec wines" id="wines">
        <div className="sec-inner">
          <div className="wines-header">
            <div>
              <span className="sec-label reveal">Kolekcja</span>
              <h2 className="sec-h2 reveal reveal-delay-1">Nasze <em>wina</em></h2>
            </div>
            <p className="wines-note reveal reveal-delay-2">
              Wszystkie wina produkowane metodą tradycyjną, z winogron zebranych
              ręcznie z naszych sadów na kredowych glebach Lubelszczyzny.
            </p>
          </div>

          <div className="wines-grid">
            {WINES.map((w,i) => (
              <div key={w.id} className={`wc reveal reveal-delay-${i+1}`}>
                {w.badge ? <div className="wc-badge">{w.badge}</div> : <div className="wc-ph"/>}
                <div style={{width:44,margin:"0 auto 1.8rem"}}>
                  <BottleSVG color={w.bottleColor}/>
                </div>
                <div className="wc-yr">{w.year}</div>
                <div className="wc-name">{w.name}</div>
                <div className="wc-type">{w.type}</div>
                <div className="wc-rule"/>
                <div className="wc-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JAGIELLOŃSKI BANNER ─────────────────── */}
      <div className="jag-banner">
        <div className="jag-bg"/>
        <div className="jag-inner">
          <div className="jag-txt">
            <span className="sec-label reveal">Dziedzictwo</span>
            <h3 className="jag-h reveal reveal-delay-1">
              Szlak <em>Jagielloński</em><br/>przebiega przez naszą winnicę
            </h3>
            <p className="jag-body reveal reveal-delay-2">
              Historyczny trakt królewski, którym podróżowali Władysław Jagiełło
              i jego następcy, przecina ziemie Kaznowa. Kroniki parafialne
              z XVII i XVIII wieku wspominają o uprawie winorośli w tej wsi.
              Nasze wino nosi w sobie pamięć tego miejsca.
            </p>
          </div>
          <div className="jag-emblem reveal reveal-delay-3">
            <HeraldEmblem size={180} c="#B8852A" opacity={.8}/>
          </div>
        </div>
      </div>

      {/* ── SKLEP ───────────────────────────────── */}
      <section className="sec shop" id="shop">
        <div className="sec-inner">
          <span className="sec-label reveal">Zamów online</span>
          <h2 className="sec-h2 reveal reveal-delay-1">Sklep <em>winnicy</em></h2>

          <div className="shop-grid">
            {WINES.map((w,i) => (
              <div key={w.id} className={`sc reveal reveal-delay-${i+1}`}>
                {w.badge ? <div className="sc-note">{w.badge}</div> : <div className="sc-ph"/>}
                <div className="sc-name">{w.name}</div>
                <div className="sc-yr">{w.year}</div>
                <div className="sc-type">{w.type}</div>
                <div className="sc-bottom">
                  <div className="sc-price">{w.price}<sup>zł</sup></div>
                  <button
                    className={`add-btn${cart[w.id]?" added":""}`}
                    onClick={()=>toggleCart(w.id)}
                    aria-label={cart[w.id]?"Usuń z koszyka":"Dodaj do koszyka"}
                  >
                    {cart[w.id] ? "✓" : "+"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cartCount > 0 && (
            <div className="cart-summary">
              <div className="cart-info">
                <strong>{cartCount}</strong>&nbsp;
                {cartCount===1?"butelka":cartCount<5?"butelki":"butelek"} w koszyku
              </div>
              <div className="cart-info">
                Razem: <strong>{cartTotal} zł</strong>
              </div>
              <button className="btn btn-bordo">Przejdź do kasy →</button>
            </div>
          )}

          <div className="shop-note">
            Wysyłka w całej Polsce &nbsp;·&nbsp; Dostawa 2–3 dni robocze &nbsp;·&nbsp; Bezpieczne pakowanie
          </div>
        </div>
      </section>

      {/* ── KONTAKT ─────────────────────────────── */}
      <section className="sec contact" id="contact">
        <div className="sec-inner">
          <span className="sec-label reveal" style={{color:'rgba(184,133,42,.7)'}}>Znajdź nas</span>
          <h2 className="sec-h2 reveal reveal-delay-1" style={{color:'var(--parch)'}}>Kontakt <em style={{color:'var(--gold2)'}}>& dojazd</em></h2>

          <div className="contact-grid">
            <div>
              {[
                ["Adres",     <div className="ci-val" key="a">Kaznów 15<br/>23-135 Ostrów Lubelski<br/>woj. lubelskie</div>],
                ["Godziny otwarcia", <><div className="ci-val" key="g">Wt – So: 10:00 – 18:00</div><div className="ci-note" key="gn">Nd i pn po wcześniejszej rezerwacji</div></>],
                ["Kontakt",   <><div className="ci-val" key="k">kontakt@salveregina.pl</div><div className="ci-note" key="kn">+48 000 000 000</div></>],
                ["Wizyty & Degustacje", <><div className="ci-val" key="d">Grupy od 6 osób</div><div className="ci-note" key="dn">Rezerwacja minimum 48h wcześniej</div></>],
              ].map(([lbl,val],i) => (
                <div key={lbl} className={`ci reveal reveal-delay-${i+1}`}>
                  <span className="ci-label">{lbl}</span>
                  {val}
                </div>
              ))}
              <button className="btn btn-bordo reveal reveal-delay-4" style={{marginTop:"1rem"}}>
                Zarezerwuj wizytę
              </button>
            </div>

            <div className="map-box reveal reveal-delay-2">
              <div className="map-grid"/>
              <div className="map-grid2"/>
              <div className="map-route">
                <div className="map-route-lbl">✦ Szlak Jagielloński ✦</div>
              </div>
              <div className="map-pin-wrap">
                <div className="map-ping"/>
                <div className="map-pin-lbl">Kaznów, Lubelszczyzna</div>
              </div>
              <div className="map-coords">51.5156° N &nbsp;·&nbsp; 22.8312° E</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer>
        <div className="ft-logo">Salve Regina</div>
        <ul className="ft-links">
          {[["about","O nas"],["wines","Wina"],["shop","Sklep"],["contact","Kontakt"]].map(([id,lbl])=>(
            <li key={id}><a onClick={()=>go(id)}>{lbl}</a></li>
          ))}
        </ul>
        <div className="ft-copy">© 2025 Winnica Salve Regina · Kaznów</div>
      </footer>
    </>
  );
}
