import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Spotlight from '@/sections/Spotlight'
import { spotlightTiles } from '@/data/spotlight'

vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
      span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

function renderSpotlight() {
  return render(
    <MemoryRouter>
      <Spotlight />
    </MemoryRouter>,
  )
}

function getActiveTileHeading() {
  return screen.getByRole('heading', { level: 3 })
}

describe('Spotlight', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the first tile as the active heading by default', () => {
    renderSpotlight()
    expect(getActiveTileHeading()).toHaveTextContent(spotlightTiles[0].title)
  })

  it('advances to next tile when next button is clicked', () => {
    renderSpotlight()
    const nextBtn = screen.getByRole('button', { name: /next spotlight/i })
    fireEvent.click(nextBtn)
    expect(getActiveTileHeading()).toHaveTextContent(spotlightTiles[1].title)
  })

  it('wraps to last tile when prev is clicked from the first', () => {
    renderSpotlight()
    const prevBtn = screen.getByRole('button', { name: /previous spotlight/i })
    fireEvent.click(prevBtn)
    expect(getActiveTileHeading()).toHaveTextContent(spotlightTiles[spotlightTiles.length - 1].title)
  })

  it('does not auto-advance when prefers-reduced-motion is true', () => {
    renderSpotlight()
    act(() => vi.advanceTimersByTime(10_000))
    expect(getActiveTileHeading()).toHaveTextContent(spotlightTiles[0].title)
  })

  it('renders all thumbnail nav buttons', () => {
    renderSpotlight()
    spotlightTiles.forEach((tile) => {
      expect(screen.getByRole('button', { name: `Go to ${tile.title}` })).toBeInTheDocument()
    })
  })
})
