import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { spotlightTiles, type SpotlightTile } from '@/data/spotlight'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { DESKTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { useInViewport } from '@/hooks/useInViewport'
import { usePageVisible } from '@/hooks/usePageVisible'
import { useScrollToId } from '@/hooks/useScrollToId'
import { cn } from '@/lib/utils'

export const AUTO_ADVANCE_MS = 4500

/** Next on-screen tile after `current`, wrapping. Stays put when none are on screen. */
function nextVisible(current: number, visible: Set<number>, total: number): number {
  for (let step = 1; step <= total; step++) {
    const candidate = (current + step) % total
    if (visible.has(candidate)) return candidate
  }
  return current
}

interface TileProps {
  tile: SpotlightTile
  active: boolean
  onFocusTile: () => void
  onLeaveTile: () => void
}

function Tile({ tile, active, onFocusTile, onLeaveTile }: TileProps) {
  const scrollToId = useScrollToId()

  const className = cn(
    'flex h-full flex-col justify-between gap-10 rounded-panel p-7 transition-[background-color,color,box-shadow] duration-500 ease-out-expo lg:p-10',
    active
      ? 'bg-cobalt text-paper shadow-[0_18px_40px_-12px_rgb(47_84_235/0.55)]'
      : 'text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/35'
  )

  const content = (
    <>
      <div>
        <p className={cn('font-display font-medium', active ? 'text-paper' : 'text-muted')}>
          {tile.subtitle}
        </p>
        <h3 className="mt-3 font-display text-[clamp(2rem,1.3rem+2.2vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] [font-stretch:112%]">
          {tile.title}
        </h3>
      </div>
      <div>
        <p className="max-w-[40ch]">{tile.description}</p>
        <span
          className={cn(
            'mt-6 inline-block font-display font-semibold underline underline-offset-4',
            active ? 'decoration-paper/50' : 'text-cobalt decoration-cobalt/30'
          )}
        >
          {tile.action}
        </span>
      </div>
    </>
  )

  const handlers = {
    onMouseEnter: onFocusTile,
    onFocus: onFocusTile,
    onMouseLeave: onLeaveTile,
    onBlur: onLeaveTile,
    'data-active': active ? 'true' : 'false',
    className,
  }

  if (tile.isRoute) {
    return (
      <Link to={tile.href} {...handlers}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={tile.href}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(tile.href.slice(1))
      }}
      {...handlers}
    >
      {content}
    </a>
  )
}

export default function Spotlight() {
  const reduced = useReducedMotion()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const scrubbed = desktop && !reduced

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const tileRefs = useRef<(HTMLLIElement | null)[]>([])
  const visibleTiles = useRef<Set<number>>(new Set())

  const inView = useInViewport(sectionRef)
  const pageVisible = usePageVisible()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [distance, setDistance] = useState(0)
  const total = spotlightTiles.length

  // How far the strip must travel so its last tile reaches the right gutter.
  useEffect(() => {
    const track = trackRef.current
    if (!scrubbed || !track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [scrubbed])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  // Track which tiles are mostly on screen so the highlight never lands off screen.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index)
          if (entry.isIntersecting) visibleTiles.current.add(index)
          else visibleTiles.current.delete(index)
        }
      },
      { threshold: 0.6 }
    )
    tileRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-advance runs only while the section is on screen, the tab is visible,
  // nobody is hovering or focusing a tile, and motion is allowed.
  useEffect(() => {
    if (reduced || paused || !inView || !pageVisible) return
    const id = setTimeout(
      () => setActive((i) => nextVisible(i, visibleTiles.current, total)),
      AUTO_ADVANCE_MS
    )
    return () => clearTimeout(id)
  }, [active, paused, inView, pageVisible, reduced, total])

  const focusTile = useCallback((i: number) => {
    setActive(i)
    setPaused(true)
  }, [])
  const leaveTile = useCallback(() => setPaused(false), [])

  return (
    <section
      id="spotlight"
      ref={sectionRef}
      aria-labelledby="spotlight-heading"
      className={cn('relative', !scrubbed && 'py-section')}
      style={scrubbed ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          scrubbed && 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
        )}
      >
        <h2 id="spotlight-heading" className="heading-display mb-10 px-gutter text-h2 lg:mb-14">
          Highlights
        </h2>

        <motion.ul
          ref={trackRef}
          style={scrubbed ? { x } : undefined}
          className={cn(
            'flex gap-[var(--grid-gap)] px-gutter',
            scrubbed
              ? 'w-max'
              : 'scroll-px-gutter snap-x snap-mandatory overflow-x-auto pb-12 [scrollbar-width:thin]'
          )}
        >
          {spotlightTiles.map((tile, i) => (
            <li
              key={tile.id}
              ref={(el) => {
                tileRefs.current[i] = el
              }}
              data-index={i}
              className="h-[26rem] w-[82vw] flex-none snap-start sm:w-[58vw] lg:h-[min(64vh,38rem)] lg:w-[clamp(22rem,34vw,44rem)]"
            >
              <Tile
                tile={tile}
                active={i === active}
                onFocusTile={() => focusTile(i)}
                onLeaveTile={leaveTile}
              />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
