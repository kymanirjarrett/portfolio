import type { SphereLogo } from '@/data/sphereLogos'

interface LogoMarkProps {
  logo: SphereLogo
  size?: number
}

/** A brand mark drawn in the current text color. */
export default function LogoMark({ logo, size = 22 }: LogoMarkProps) {
  return (
    <svg
      role="img"
      aria-label={logo.name}
      viewBox={logo.viewBox}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d={logo.path} />
    </svg>
  )
}
