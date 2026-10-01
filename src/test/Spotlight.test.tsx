import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Spotlight, { AUTO_ADVANCE_MS } from '@/sections/Spotlight'
import { spotlightTiles } from '@/data/spotlight'
import { setAllIntersecting } from './setup'

const reducedMotion = vi.fn(() => false)
vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => reducedMotion() }))

function renderSpotlight() {
  return render(
    <MemoryRouter>
      <Spotlight />
    </MemoryRouter>
  )
}

function activeTitle() {
  const active = document.querySelector('[data-active="true"]')
  return active?.querySelector('h3')?.textContent
}

describe('Spotlight', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    reducedMotion.mockReturnValue(false)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders every tile as a link with its action text', () => {
    renderSpotlight()
    spotlightTiles.forEach((tile) => {
      const heading = screen.getByRole('heading', { level: 3, name: tile.title })
      const link = heading.closest('a')
      expect(link).toHaveAttribute('href', tile.href)
      expect(link).toHaveTextContent(tile.action)
    })
  })

  it('uses no per-tile accent colors', () => {
    spotlightTiles.forEach((tile) => expect(tile).not.toHaveProperty('accentColor'))
    renderSpotlight()
    document.querySelectorAll('#spotlight a').forEach((a) => expect(a).not.toHaveAttribute('style'))
  })

  it('highlights the first tile by default', () => {
    renderSpotlight()
    expect(activeTitle()).toBe(spotlightTiles[0].title)
  })

  it('does not auto-advance while the section is off screen', () => {
    renderSpotlight()
    act(() => vi.advanceTimersByTime(AUTO_ADVANCE_MS * 3))
    expect(activeTitle()).toBe(spotlightTiles[0].title)
  })

  it('auto-advances while the section is on screen', () => {
    renderSpotlight()
    act(() => setAllIntersecting(true))
    act(() => vi.advanceTimersByTime(AUTO_ADVANCE_MS))
    expect(activeTitle()).toBe(spotlightTiles[1].title)
  })

  it('stops auto-advancing when the section leaves the screen', () => {
    renderSpotlight()
    act(() => setAllIntersecting(true))
    act(() => vi.advanceTimersByTime(AUTO_ADVANCE_MS))
    act(() => setAllIntersecting(false))
    act(() => vi.advanceTimersByTime(AUTO_ADVANCE_MS * 3))
    expect(activeTitle()).toBe(spotlightTiles[1].title)
  })

  it('pauses on hover and highlights the hovered tile', () => {
    renderSpotlight()
    act(() => setAllIntersecting(true))
    const third = screen
      .getByRole('heading', { level: 3, name: spotlightTiles[2].title })
      .closest('a')!
    fireEvent.mouseEnter(third)
    expect(activeTitle()).toBe(spotlightTiles[2].title)
    act(() => vi.advanceTimersByTime(AUTO_ADVANCE_MS * 3))
    expect(activeTitle()).toBe(spotlightTiles[2].title)
  })

  it('never auto-advances under reduced motion', () => {
    reducedMotion.mockReturnValue(true)
    renderSpotlight()
    act(() => setAllIntersecting(true))
    act(() => vi.advanceTimersByTime(AUTO_ADVANCE_MS * 3))
    expect(activeTitle()).toBe(spotlightTiles[0].title)
  })
})
