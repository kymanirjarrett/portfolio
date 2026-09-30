import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroAtmosphere, { STATIC_GRADIENT_SRC } from '@/components/HeroAtmosphere'

const reducedMotion = vi.fn(() => false)
vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => reducedMotion() }))
vi.mock('@/hooks/useWebGL', () => ({ useWebGL: () => true }))
vi.mock('@/hooks/useMediaQuery', () => ({ DESKTOP_QUERY: '', useMediaQuery: () => true }))

// If the live scene were ever imported under reduced motion, this would render it.
vi.mock('@/components/ShaderGradientScene', () => ({
  default: () => <div data-testid="shader-scene" />,
}))

describe('HeroAtmosphere', () => {
  it('shows only the static gradient under reduced motion', () => {
    reducedMotion.mockReturnValue(true)
    render(<HeroAtmosphere active />)
    expect(screen.getByTestId('hero-gradient-static')).toHaveAttribute('src', STATIC_GRADIENT_SRC)
    expect(screen.queryByTestId('hero-gradient-live')).toBeNull()
  })

  it('layers the live gradient over the static one when motion is allowed', async () => {
    reducedMotion.mockReturnValue(false)
    render(<HeroAtmosphere active />)
    expect(screen.getByTestId('hero-gradient-static')).toBeInTheDocument()
    expect(await screen.findByTestId('shader-scene')).toBeInTheDocument()
  })
})
