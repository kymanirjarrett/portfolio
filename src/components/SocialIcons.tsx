import { siGithub } from 'simple-icons'
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/contact'
import { cn } from '@/lib/utils'

interface IconProps {
  size?: number
  className?: string
}

export function GitHubIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={siGithub.path} />
    </svg>
  )
}

/**
 * LinkedIn's "In" logo. Simple Icons dropped it at LinkedIn's request, so it is
 * drawn here from LinkedIn's brand guidelines, in the current text color.
 */
export function LinkedInIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface SocialLinksProps {
  className?: string
  linkClassName?: string
  size?: number
}

/** GitHub and LinkedIn as icon links. Each has an accessible name and opens in a new tab. */
export function SocialLinks({ className, linkClassName, size = 20 }: SocialLinksProps) {
  const link = cn(
    'inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 hover:text-accent',
    linkClassName
  )
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      <li>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={link}
        >
          <GitHubIcon size={size} />
        </a>
      </li>
      <li>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={link}
        >
          <LinkedInIcon size={size} />
        </a>
      </li>
    </ul>
  )
}
