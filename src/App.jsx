import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { PIECES, frameDoc } from './pieces.js'

const SPEEDS = [0.1, 0.25, 0.5, 1, 2]

function Thumb({ p, onOpen }) {
  return (
    <button onClick={() => onOpen(p)} className="group block w-full text-left rounded-2xl bg-bone ring-1 ring-ink/10 overflow-hidden transition hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1" aria-label={`Open ${p.title}`}>
      <div className="relative h-56 overflow-hidden">
        <iframe title={`${p.title} preview`} sandbox="allow-same-origin" srcDoc={frameDoc(p.html, p.css, p.bg)} tabIndex={-1} className="pointer-events-none absolute inset-0 h-full w-full border-0" loading="lazy" />
      </div>
      <div className="p-4">
        <h3 className="text-xl">{p.title}</h3>
        <p className="mono mt-1 text-[11px] text-ink/60">{p.tags.join('  /  ')}</p>
      </div>
    </button>
  )
}

function Studio({ p, onClose }) {
  const [css, setCss] = useState(p.css)
  const [speed, setSpeed] = useState(1)
  const [paused, setPaused] = useState(false)
  const [copied, setCopied] = useState('')
  const frame = useRef(null)
  const timer = useRef(null)

  const applyPlayback = () => {
    const d = frame.current?.contentDocument
    if (!d) return
    d.getAnimations().forEach((a) => { a.playbackRate = speed; paused ? a.pause() : a.play() })
  }
  useEffect(() => { const t = setTimeout(applyPlayback, 60); return () => clearTimeout(t) }, [speed, paused])
  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const d = frame.current?.contentDocument
      const st = d?.getElementById('piece')
      if (st) { st.textContent = css; setTimeout(applyPlayback, 60) }
    }, 250)
    return () => clearTimeout(timer.current)
  }, [css])
  useEffect(() => { const k = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [])

  const copy = (what, text) => { navigator.clipboard?.writeText(text).catch(() => {}); setCopied(what); setTimeout(() => setCopied(''), 1400) }
  const fullHtml = `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<style>\n${css}\n</style>\n</head>\n<body>\n${p.html}\n</body>\n</html>`
  const changed = css !== p.css

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/70 md:items-center md:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()} className="max-h-[96vh] w-full overflow-y-auto rounded-t-3xl bg-bone shadow-2xl md:max-w-5xl md:rounded-3xl">
        <div className="flex items-start justify-between gap-4 p-5 pb-3">
          <div><h2 className="text-3xl">{p.title}</h2><p className="mono mt-1 text-xs text-ink/60">{p.tags.join('  /  ')}</p></div>
          <button onClick={onClose} aria-label="Close" className="h-10 w-10 shrink-0 rounded-full bg-ink text-xl text-white">&times;</button>
        </div>
        <div className="grid gap-4 p-5 pt-2 md:grid-cols-2">
          <div>
            <iframe ref={frame} title={`${p.title} live`} sandbox="allow-same-origin" srcDoc={frameDoc(p.html, p.css, p.bg)} onLoad={applyPlayback} className="h-72 w-full rounded-2xl border-0 md:h-[340px]" />
            <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Playback">
              <button onClick={() => setPaused(!paused)} aria-pressed={paused} className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white">{paused ? 'Play' : 'Pause'}</button>
              <span className="mono text-xs text-ink/60">speed</span>
              {SPEEDS.map((s) => <button key={s} onClick={() => setSpeed(s)} aria-pressed={speed === s} className={`mono rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ${speed === s ? 'bg-clay text-white ring-clay' : 'bg-white ring-ink/20'}`}>{s}x</button>)}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/80"><strong>How it works.</strong> {p.note}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between"><label htmlFor="css" className="serif text-lg">CSS <span className="mono text-xs text-ink/50">edit me, it updates live</span></label>
              {changed && <button onClick={() => setCss(p.css)} className="text-sm font-bold text-clay underline">Reset</button>}</div>
            <textarea id="css" spellcheck={false} value={css} onInput={(e) => setCss(e.target.value)} className="mono mt-1 min-h-[300px] flex-1 resize-y rounded-2xl bg-ink p-3 text-[12.5px] leading-relaxed text-[#fde8d3]" />
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => copy('css', css)} className="rounded-lg bg-clay px-4 py-2 text-sm font-bold text-white">{copied === 'css' ? 'Copied!' : 'Copy CSS'}</button>
              <button onClick={() => copy('html', fullHtml)} className="rounded-lg bg-white px-4 py-2 text-sm font-bold ring-1 ring-ink/20">{copied === 'html' ? 'Copied!' : 'Copy full HTML file'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  const [tag, setTag] = useState('all')
  const tags = useMemo(() => ['all', ...new Set(PIECES.flatMap((p) => p.tags))].sort((a, b) => (a === 'all' ? -1 : b === 'all' ? 1 : a.localeCompare(b))), [])
  const shown = PIECES.filter((p) => tag === 'all' || p.tags.includes(tag))
  useEffect(() => {
    const id = location.hash.slice(1); const p = PIECES.find((x) => x.id === id); if (p) setOpen(p)
  }, [])
  const openP = (p) => { setOpen(p); history.replaceState(null, '', '#' + p.id) }
  const closeP = () => { setOpen(null); history.replaceState(null, '', location.pathname) }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2"><span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-clay text-white serif text-xl">{'{ }'}</span><span className="serif text-2xl">CSS Gallery</span></div>
        <p className="mono hidden text-xs text-ink/60 sm:block">12 pieces / 0 images / 0 JavaScript inside the art</p>
      </header>
      <main className="mx-auto max-w-6xl px-5 pb-16">
        <section className="py-8 md:py-12">
          <h1 className="max-w-3xl text-5xl leading-[1.02] md:text-7xl">Pure CSS art. <span className="text-clay">Open it up</span> and change it.</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/75">Twelve pieces built with nothing but HTML and CSS. Open any piece, edit its stylesheet and watch it update, drag the speed down to see how the animation is built, then copy the code.</p>
        </section>
        <nav aria-label="Filter by technique" className="flex flex-wrap gap-2">
          {tags.map((t) => <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t} className={`mono rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 ${tag === t ? 'bg-ink text-white ring-ink' : 'bg-bone ring-ink/20 hover:bg-white'}`}>{t}</button>)}
        </nav>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <li key={p.id}><Thumb p={p} onOpen={openP} /></li>)}
        </ul>
      </main>
      <footer className="border-t border-ink/10"><p className="mono mx-auto max-w-6xl px-5 py-5 text-xs text-ink/60">CSS Gallery - a demo by Malak Mohamed. The pieces are plain CSS, the gallery around them is Preact.</p></footer>
      {open && <Studio key={open.id} p={open} onClose={closeP} />}
    </div>
  )
}
