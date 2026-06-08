import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { spotlightTiles } from '@/data/spotlight'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const AUTO_ADVANCE_MS = 4500

export default function Spotlight() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const navigate = useNavigate()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const totalTiles = spotlightTiles.length

  const advance = useCallback((dir: 1 | -1) => {
    setActive((i) => (i + dir + totalTiles) % totalTiles)
  }, [totalTiles])

  useEffect(() => {
    if (reduced || paused) return
    timerRef.current = setTimeout(() => advance(1), AUTO_ADVANCE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, paused, reduced, advance])

  function handleTileAction(tile: (typeof spotlightTiles)[0]) {
    if (tile.isRoute) {
      navigate(tile.href)
    } else {
      const id = tile.href.slice(1)
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  function handleTileKeyDown(e: React.KeyboardEvent, tile: (typeof spotlightTiles)[0]) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleTileAction(tile)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      advance(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      advance(1)
    }
  }

  function handleSectionFocusIn() {
    setPaused(true)
  }

  function handleSectionFocusOut(e: React.FocusEvent<HTMLElement>) {
    // Only unpause when focus leaves the section entirely
    if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
      setPaused(false)
    }
  }

  const activeTile = spotlightTiles[active]

  return (
    <section
      id="spotlight"
      ref={sectionRef}
      className="bg-paper py-24 px-6"
      aria-label="Spotlight reel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={handleSectionFocusIn}
      onBlurCapture={handleSectionFocusOut}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Spotlight</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-12">Selected facets</h2>

        {/* Main featured tile */}
        <div className="relative">
          <motion.div
            key={activeTile.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full rounded-2xl overflow-hidden cursor-pointer group"
            style={{ background: `linear-gradient(135deg, ${activeTile.accentColor}18 0%, ${activeTile.accentColor}08 100%)` }}
            onClick={() => handleTileAction(activeTile)}
            onKeyDown={(e) => handleTileKeyDown(e, activeTile)}
            tabIndex={0}
            role="button"
            aria-label={`${activeTile.title}: ${activeTile.subtitle} — ${activeTile.description}. Press Enter to open.`}
          >
            <div
              className="p-8 md:p-12 border rounded-2xl border-ink/8 transition-all duration-300 group-hover:border-opacity-100"
              style={{ borderColor: `${activeTile.accentColor}20` }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <span
                    className="inline-block font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: activeTile.accentColor }}
                  >
                    {activeTile.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-4xl md:text-5xl text-ink mb-4">{activeTile.title}</h3>
                  <p className="text-muted text-lg leading-relaxed">{activeTile.description}</p>
                </div>
                <div
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors group-hover:text-white"
                  style={{ borderColor: activeTile.accentColor, color: activeTile.accentColor }}
                >
                  {activeTile.isRoute ? 'Case study ↗' : 'View section ↓'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dot indicators — plain buttons, not tab role */}
            <div className="flex gap-2" aria-label="Spotlight position" role="group">
              {spotlightTiles.map((tile, i) => (
                <button
                  key={tile.id}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1} of ${totalTiles}: ${tile.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-ink' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => advance(-1)}
                aria-label="Previous spotlight"
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-muted hover:text-ink hover:border-ink/40 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => advance(1)}
                aria-label="Next spotlight"
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-muted hover:text-ink hover:border-ink/40 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <ul className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3" role="list">
          {spotlightTiles.map((tile, i) => (
            <li key={tile.id}>
              <button
                onClick={() => setActive(i)}
                className={`w-full p-3 rounded-xl border text-left transition-all duration-200 ${
                  i === active
                    ? 'border-ink/20 bg-white shadow-sm'
                    : 'border-transparent hover:border-ink/10 hover:bg-white/60'
                }`}
                aria-label={`Go to ${tile.title}`}
                aria-current={i === active ? 'true' : undefined}
              >
                <div
                  className="w-5 h-5 rounded-md mb-2"
                  style={{ background: `${tile.accentColor}30` }}
                  aria-hidden
                />
                <p className="text-xs font-medium text-ink leading-tight">{tile.title}</p>
                <p className="text-xs text-muted leading-tight mt-0.5 hidden md:block">{tile.subtitle}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
