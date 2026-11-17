import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Home from '@/pages/Home'

const env = vi.hoisted(() => ({ webGL: false, reduced: false }))
vi.mock('@/hooks/useWebGL', () => ({ useWebGL: () => env.webGL }))
vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => env.reduced }))

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
}

const nameControl = () =>
  screen.getByRole('button', { name: 'Show the name as a contribution graph' })

describe('Home', () => {
  beforeEach(() => {
    env.webGL = false
    env.reduced = false
  })

  it('keeps the full name as real heading text', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hey, I'm Kymani Jarrett")
  })

  it('falls back to the flat 2D grid and the palm image without WebGL', () => {
    const { container } = renderHome()
    const grid = within(nameControl()).getByTestId('name-grid-2d')
    expect(grid.children).toHaveLength(371)
    expect(container.querySelector('img[src="/palm-poster.webp"]')).toBeInTheDocument()
    expect(container.querySelector('canvas')).not.toBeInTheDocument()
  })

  it('animates the grid column by column when motion is allowed', () => {
    renderHome()
    const grid = screen.getByTestId('name-grid-2d')
    expect(grid).toHaveAttribute('data-animated', 'true')
    const lastCell = grid.children[grid.children.length - 1] as HTMLElement
    expect(lastCell.style.transitionDelay).toBe('468ms')
  })

  it('swaps instantly under reduced motion', () => {
    env.reduced = true
    renderHome()
    const grid = screen.getByTestId('name-grid-2d')
    expect(grid).toHaveAttribute('data-animated', 'false')
    for (const cell of grid.children) {
      expect((cell as HTMLElement).style.transition).toBe('none')
      expect((cell as HTMLElement).style.transitionDelay).toBe('')
    }
  })

  it('plays the graph on keyboard focus and toggles with Enter', async () => {
    const user = userEvent.setup()
    renderHome()
    const control = nameControl()

    while (document.activeElement !== control) await user.tab()
    expect(control).toHaveAttribute('aria-pressed', 'true')

    await user.keyboard('{Enter}')
    expect(control).toHaveAttribute('aria-pressed', 'false')

    await user.tab()
    expect(control).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows the graph on hover and settles back on leave', async () => {
    const user = userEvent.setup()
    renderHome()
    const control = nameControl()

    await user.hover(control)
    expect(control).toHaveAttribute('aria-pressed', 'true')
    await user.unhover(control)
    expect(control).toHaveAttribute('aria-pressed', 'false')
  })

  it('toggles on tap', async () => {
    const user = userEvent.setup()
    renderHome()
    const control = nameControl()

    await user.pointer({ keys: '[TouchA]', target: control })
    expect(control).toHaveAttribute('aria-pressed', 'true')
    await user.pointer({ keys: '[TouchA]', target: control })
    expect(control).toHaveAttribute('aria-pressed', 'false')
  })
})
