import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TechSphere from '@/components/TechSphere'
import { sphereLogos } from '@/data/skills'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ gl: { setPixelRatio: vi.fn() } }),
}))

vi.mock('@react-three/drei', () => ({
  Billboard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  OrbitControls: () => null,
}))

const mockUseReducedMotion = vi.fn(() => false)
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}))

describe('TechSphere', () => {
  it('renders the fallback grid when WebGL is not supported', () => {
    mockUseReducedMotion.mockReturnValue(false)
    render(<TechSphere webGLSupported={false} />)
    expect(screen.getByLabelText('Technology logos')).toBeInTheDocument()
    const logos = screen.getAllByRole('img')
    expect(logos.length).toBeGreaterThanOrEqual(sphereLogos.length)
  })

  it('renders the fallback grid when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true)
    render(<TechSphere webGLSupported={true} />)
    expect(screen.getByLabelText('Technology logos')).toBeInTheDocument()
  })

  it('renders the 3D canvas when WebGL is supported and motion is allowed', () => {
    mockUseReducedMotion.mockReturnValue(false)
    render(<TechSphere webGLSupported={true} />)
    expect(screen.getByRole('img', { name: /interactive 3d sphere/i })).toBeInTheDocument()
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })
})
