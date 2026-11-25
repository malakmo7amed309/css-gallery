export const PIECES = [
{
  id: 'orbit', title: 'Orbit Loader', tags: ['keyframes', 'transform-origin'], bg: '#0f172a',
  note: 'Each dot shares one keyframe. Only animation-delay and the orbit radius differ, set through custom properties.',
  html: `<div class="orbit"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>`,
  css: `.orbit { position: relative; width: 120px; height: 120px; }
.orbit i {
  position: absolute; inset: 0; margin: auto;
  width: 16px; height: 16px; border-radius: 50%;
  background: hsl(calc(var(--i) * 45 + 170) 90% 62%);
  animation: spin 2.4s cubic-bezier(.6,.1,.4,.9) infinite;
  animation-delay: calc(var(--i) * -0.2s);
}
@keyframes spin {
  from { transform: rotate(0deg) translateX(52px) scale(1); }
  50% { transform: rotate(180deg) translateX(30px) scale(.5); }
  to { transform: rotate(360deg) translateX(52px) scale(1); }
}`,
},
{
  id: 'sunset', title: 'Nile Sunset', tags: ['gradients', 'box-shadow', 'keyframes'], bg: '#1e1b4b',
  note: 'The sky is two layered gradients. The sun sets by animating translateY, and the water shimmer is a repeating gradient sliding sideways.',
  html: `<div class="scene"><div class="sun"></div><div class="water"></div><div class="felucca"><b></b></div></div>`,
  css: `.scene { position: relative; width: 300px; height: 200px; overflow: hidden; border-radius: 14px;
  background: linear-gradient(#312e81, #be185d 55%, #fb923c 100%); }
.sun { position: absolute; left: 50%; top: 38px; width: 70px; height: 70px; margin-left: -35px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #fef08a, #f59e0b); box-shadow: 0 0 60px 20px rgba(253,186,116,.7);
  animation: set 6s ease-in-out infinite alternate; }
@keyframes set { to { transform: translateY(58px); } }
.water { position: absolute; left: 0; right: 0; bottom: 0; height: 80px;
  background: repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 8px, transparent 8px 22px), linear-gradient(#7c2d12, #1e1b4b);
  animation: shimmer 3s linear infinite; background-size: 22px 100%, 100% 100%; }
@keyframes shimmer { to { background-position: 22px 0, 0 0; } }
.felucca { position: absolute; left: 40px; bottom: 56px; width: 70px; height: 40px; animation: sail 9s linear infinite alternate; }
.felucca::before { content: ""; position: absolute; left: 12px; bottom: 8px; border-left: 28px solid transparent; border-bottom: 36px solid #fde68a; border-right: 0; }
.felucca b { position: absolute; left: 0; bottom: 0; width: 66px; height: 9px; background: #1c1917; border-radius: 0 0 30px 30px; }
@keyframes sail { to { transform: translateX(150px); } }`,
},
{
  id: 'toggle', title: 'Soft Toggle', tags: [':checked', 'transition', 'no JS'], bg: '#e5e7eb',
  note: 'A real checkbox drives the whole thing. The :checked selector moves the knob and swaps the track, so it stays keyboard accessible.',
  html: `<label class="sw"><input type="checkbox" checked><span class="track"><span class="knob"></span></span><span class="txt"></span></label>`,
  css: `.sw { display: flex; align-items: center; gap: 16px; font: 600 18px system-ui; color: #374151; cursor: pointer; }
.sw input { position: absolute; opacity: 0; }
.track { width: 110px; height: 52px; border-radius: 30px; background: #e5e7eb; padding: 6px; box-sizing: border-box;
  box-shadow: inset 6px 6px 12px #c3c6cc, inset -6px -6px 12px #fff; transition: background .4s; }
.knob { display: block; width: 40px; height: 40px; border-radius: 50%; background: #e5e7eb;
  box-shadow: 4px 4px 10px #b5b8be, -4px -4px 10px #fff; transition: transform .4s cubic-bezier(.5,1.6,.5,1), background .4s; }
input:checked + .track { background: #86efac; }
input:checked + .track .knob { transform: translateX(58px); background: #f0fdf4; }
input:focus-visible + .track { outline: 3px solid #2563eb; outline-offset: 3px; }
.txt::before { content: "Off"; } input:checked ~ .txt::before { content: "On"; }`,
},
{
  id: 'cube', title: 'Glass Cube', tags: ['3D transforms', 'perspective'], bg: '#111827',
  note: 'Six faces placed with rotateX/Y and translateZ inside a preserve-3d parent. One rotation animates the whole cube.',
  html: `<div class="stage"><div class="cube"><i>A</i><i>B</i><i>C</i><i>D</i><i>E</i><i>F</i></div></div>`,
  css: `.stage { perspective: 600px; }
.cube { position: relative; width: 110px; height: 110px; transform-style: preserve-3d; animation: roll 9s linear infinite; }
.cube i { position: absolute; inset: 0; display: grid; place-items: center; font: 700 34px system-ui; color: rgba(255,255,255,.9);
  background: linear-gradient(135deg, rgba(56,189,248,.35), rgba(167,139,250,.35)); border: 1.5px solid rgba(255,255,255,.55); backdrop-filter: blur(2px); }
.cube i:nth-child(1) { transform: translateZ(55px); }
.cube i:nth-child(2) { transform: rotateY(90deg) translateZ(55px); }
.cube i:nth-child(3) { transform: rotateY(180deg) translateZ(55px); }
.cube i:nth-child(4) { transform: rotateY(-90deg) translateZ(55px); }
.cube i:nth-child(5) { transform: rotateX(90deg) translateZ(55px); }
.cube i:nth-child(6) { transform: rotateX(-90deg) translateZ(55px); }
@keyframes roll { from { transform: rotateX(-24deg) rotateY(0); } to { transform: rotateX(-24deg) rotateY(360deg); } }`,
},
{
  id: 'ball', title: 'Squash Ball', tags: ['easing', 'squash and stretch'], bg: '#fef3c7',
  note: 'The animation principle of squash and stretch: the ball flattens on impact with scale, while the shadow shrinks as it rises.',
  html: `<div class="floor"><div class="ball"></div><div class="shadow"></div></div>`,
  css: `.floor { position: relative; width: 220px; height: 220px; }
.ball { position: absolute; left: 80px; top: 0; width: 60px; height: 60px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fb7185, #be123c); transform-origin: 50% 100%;
  animation: bounce 1.1s cubic-bezier(.3,0,.6,1) infinite; }
@keyframes bounce {
  0% { transform: translateY(0) scale(.92, 1.1); animation-timing-function: cubic-bezier(.55,0,1,.45); }
  48% { transform: translateY(142px) scale(.95, 1.05); }
  50% { transform: translateY(160px) scale(1.35, .62); animation-timing-function: cubic-bezier(0,.55,.45,1); }
  52% { transform: translateY(142px) scale(.95, 1.05); }
  100% { transform: translateY(0) scale(.92, 1.1); }
}
.shadow { position: absolute; left: 70px; bottom: 0; width: 80px; height: 14px; border-radius: 50%; background: rgba(0,0,0,.25);
  animation: shade 1.1s cubic-bezier(.3,0,.6,1) infinite; }
@keyframes shade { 0%, 100% { transform: scale(.45); opacity: .15; } 50% { transform: scale(1); opacity: .35; } }`,
},
{
  id: 'cradle', title: "Newton's Cradle", tags: ['keyframes', 'transform-origin'], bg: '#f1f5f9',
  note: 'Only the first and last balls swing, on opposite half-cycles, which is what makes the physics read correctly.',
  html: `<div class="frame"><div class="ball b1"><s></s></div><div class="ball"><s></s></div><div class="ball"><s></s></div><div class="ball"><s></s></div><div class="ball b5"><s></s></div></div>`,
  css: `.frame { display: flex; padding-top: 14px; border-top: 8px solid #475569; width: 250px; justify-content: center; border-radius: 4px; }
.ball { width: 50px; height: 140px; transform-origin: 50% 0; position: relative; }
.ball::before { content: ""; position: absolute; left: 50%; top: 0; width: 2px; height: 100px; background: #94a3b8; }
.ball s { position: absolute; bottom: 0; left: 0; width: 50px; height: 50px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff, #94a3b8 60%, #475569); box-shadow: 0 6px 10px rgba(0,0,0,.18); }
.b1 { animation: left 1.4s ease-in-out infinite; }
.b5 { animation: right 1.4s ease-in-out infinite; }
@keyframes left { 0% { transform: rotate(0); animation-timing-function: ease-out; } 25% { transform: rotate(32deg); animation-timing-function: ease-in; } 50%, 100% { transform: rotate(0); } }
@keyframes right { 0%, 50% { transform: rotate(0); animation-timing-function: ease-out; } 75% { transform: rotate(-32deg); animation-timing-function: ease-in; } 100% { transform: rotate(0); } }`,
},
{
  id: 'giza', title: 'Giza at Night', tags: ['clip-path', 'twinkle', 'gradients'], bg: '#020617',
  note: 'The pyramids are clip-path triangles with a light and a dark half. Stars are box-shadow dots, so 20 stars cost one element.',
  html: `<div class="sky"><div class="stars"></div><div class="moon"></div><div class="py p1"></div><div class="py p2"></div><div class="py p3"></div><div class="sand"></div></div>`,
  css: `.sky { position: relative; width: 300px; height: 200px; overflow: hidden; border-radius: 14px; background: linear-gradient(#0b1026, #1e3a8a 70%, #7c3aed); }
.stars { position: absolute; top: 10px; left: 10px; width: 2px; height: 2px; border-radius: 50%; background: #fff; animation: tw 2.5s ease-in-out infinite;
  box-shadow: 40px 20px #fff, 90px 8px #fde68a, 140px 34px #fff, 190px 12px #fff, 250px 28px #fde68a, 20px 60px #fff, 120px 70px #fff, 210px 58px #fff, 270px 78px #fff, 70px 44px #fff; }
@keyframes tw { 50% { opacity: .25; } }
.moon { position: absolute; right: 36px; top: 24px; width: 34px; height: 34px; border-radius: 50%; background: #fef9c3; box-shadow: 0 0 24px 8px rgba(254,249,195,.45); }
.moon::after { content: ""; position: absolute; left: 10px; top: -4px; width: 32px; height: 32px; border-radius: 50%; background: #1d2a6b; }
.py { position: absolute; bottom: 40px; clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: linear-gradient(90deg, #fcd34d 50%, #b45309 50%); }
.p1 { left: 70px; width: 130px; height: 100px; }
.p2 { left: 175px; width: 90px; height: 70px; opacity: .95; }
.p3 { left: 30px; width: 60px; height: 46px; opacity: .9; }
.sand { position: absolute; left: 0; right: 0; bottom: 0; height: 44px; background: linear-gradient(#92400e, #451a03); }`,
},
{
  id: 'type', title: 'Typewriter', tags: ['steps()', 'ch units'], bg: '#fafaf9',
  note: 'The width animates from 0 to the text length in ch units with steps(), so each step reveals exactly one character. The cursor is the right border.',
  html: `<p class="line">Pure CSS can type.</p>`,
  css: `.line { font: 500 28px "Courier New", monospace; color: #1c1917; white-space: nowrap; overflow: hidden;
  width: 18ch; border-right: 3px solid #c2410c; margin: 0;
  animation: typing 3.2s steps(18) infinite alternate, caret .7s step-end infinite; }
@keyframes typing { from { width: 0; } to { width: 18ch; } }
@keyframes caret { 50% { border-color: transparent; } }`,
},
{
  id: 'glitch', title: 'Glitch Text', tags: ['clip-path', 'attr()', 'pseudo-elements'], bg: '#09090b',
  note: 'The text is duplicated by ::before and ::after using attr(data-t), each clipped to a slice and nudged on a jittery steps() timeline.',
  html: `<h1 class="g" data-t="GLITCH">GLITCH</h1>`,
  css: `.g { position: relative; margin: 0; font: 800 64px system-ui; color: #fafafa; letter-spacing: 4px; }
.g::before, .g::after { content: attr(data-t); position: absolute; inset: 0; }
.g::before { color: #22d3ee; animation: a 2.2s steps(1) infinite; mix-blend-mode: screen; }
.g::after { color: #f43f5e; animation: b 2.2s steps(1) infinite; mix-blend-mode: screen; }
@keyframes a { 0%, 100% { clip-path: inset(0 0 100% 0); transform: none; } 10% { clip-path: inset(10% 0 60% 0); transform: translate(-6px, 1px); } 30% { clip-path: inset(55% 0 20% 0); transform: translate(5px, -1px); } 50% { clip-path: inset(0 0 100% 0); } 70% { clip-path: inset(75% 0 5% 0); transform: translate(-4px, 0); } }
@keyframes b { 0%, 100% { clip-path: inset(0 0 100% 0); } 15% { clip-path: inset(60% 0 15% 0); transform: translate(6px, 0); } 40% { clip-path: inset(20% 0 55% 0); transform: translate(-5px, 1px); } 60% { clip-path: inset(0 0 100% 0); } 80% { clip-path: inset(35% 0 40% 0); transform: translate(4px, -1px); } }`,
},
{
  id: 'burger', title: 'Menu Morph', tags: [':checked', 'transform'], bg: '#ecfeff',
  note: 'The three bars are one element with two pseudo-elements. Checking the box rotates the outer two into an X and fades the middle one.',
  html: `<label class="m"><input type="checkbox"><span class="bar"></span></label>`,
  css: `.m { display: grid; place-items: center; width: 96px; height: 96px; border-radius: 28px; background: #0e7490; cursor: pointer; transition: border-radius .4s, background .4s; }
.m input { position: absolute; opacity: 0; }
.bar, .bar::before, .bar::after { display: block; width: 40px; height: 5px; border-radius: 3px; background: #fff; transition: transform .35s cubic-bezier(.6,-.3,.3,1.4), opacity .2s, background .3s; }
.bar { position: relative; }
.bar::before, .bar::after { content: ""; position: absolute; left: 0; }
.bar::before { top: -13px; } .bar::after { top: 13px; }
.m:has(input:checked) { border-radius: 50%; background: #be123c; }
input:checked + .bar { background: transparent; }
input:checked + .bar::before { transform: translateY(13px) rotate(45deg); }
input:checked + .bar::after { transform: translateY(-13px) rotate(-45deg); }
input:focus-visible + .bar { outline: 3px solid #fde047; outline-offset: 10px; }`,
},
{
  id: 'heart', title: 'Heartbeat', tags: ['clip-path', 'keyframes'], bg: '#fff1f2',
  note: 'The heart is two rounded rectangles rotated into a shape. The pulse is a double beat: two quick scales then a rest, like a real rhythm.',
  html: `<div class="heart"></div><div class="ring"></div>`,
  css: `.heart { position: relative; width: 90px; height: 90px; background: #e11d48; transform: rotate(45deg); animation: beat 1.3s infinite; box-shadow: 0 0 40px rgba(225,29,72,.35); }
.heart::before, .heart::after { content: ""; position: absolute; width: 90px; height: 90px; border-radius: 50%; background: #e11d48; }
.heart::before { left: -45px; top: 0; } .heart::after { top: -45px; left: 0; }
@keyframes beat { 0%, 100% { transform: rotate(45deg) scale(1); } 14% { transform: rotate(45deg) scale(1.18); } 28% { transform: rotate(45deg) scale(1); } 42% { transform: rotate(45deg) scale(1.12); } 70% { transform: rotate(45deg) scale(1); } }
.ring { position: absolute; width: 90px; height: 90px; border-radius: 50%; border: 3px solid #e11d48; opacity: 0; animation: wave 1.3s infinite; }
@keyframes wave { 0% { transform: scale(1); opacity: .6; } 60%, 100% { transform: scale(3); opacity: 0; } }`,
},
{
  id: 'border', title: 'Aurora Card', tags: ['@property', 'conic-gradient', ':hover'], bg: '#0b0f19',
  note: '@property makes an angle animatable, which lets a conic-gradient border rotate smoothly. No JavaScript and no extra wrapper element.',
  html: `<div class="card"><h3>Aurora</h3><p>Hover to speed up.</p></div>`,
  css: `@property --a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.card { width: 200px; padding: 40px 24px; text-align: center; color: #e5e7eb; font-family: system-ui; border-radius: 18px;
  border: 3px solid transparent;
  background: linear-gradient(#0b0f19, #0b0f19) padding-box, conic-gradient(from var(--a), #22d3ee, #a78bfa, #f472b6, #22d3ee) border-box;
  animation: rot 4s linear infinite; }
.card:hover { animation-duration: 1.2s; }
.card h3 { margin: 0 0 6px; font-size: 26px; } .card p { margin: 0; color: #9ca3af; font-size: 14px; }
@keyframes rot { to { --a: 360deg; } }`,
},
]

export const frameDoc = (html, css, bg) =>
  `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;height:100%}body{display:grid;place-items:center;background:${bg};overflow:hidden}</style><style id="piece">${css}</style></head><body>${html}</body></html>`
