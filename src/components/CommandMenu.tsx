import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { ArrowRight, Copy, Check } from 'lucide-react'
import PixelMark from '@/components/PixelMark'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/contact'

const PAGES = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Leadership', to: '/leadership' },
]

const COPIED_MS = 1600

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Keyboard command menu. cmdk renders it inside a Radix dialog, which traps
 * focus, closes on Escape, and returns focus to whatever was focused before.
 */
export default function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])

  function go(to: string) {
    onOpenChange(false)
    navigate(to)
  }

  function openExternal(url: string) {
    onOpenChange(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), COPIED_MS)
    } catch {
      // Clipboard can be blocked (insecure context, permissions): fall back to mail.
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command menu"
      loop
      overlayClassName="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]"
      contentClassName="fixed left-1/2 top-[14vh] z-50 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl bg-canvas text-ink shadow-[0_24px_60px_-20px_rgb(31_42_36/0.45)] ring-1 ring-ink/10"
    >
      <div className="flex items-center gap-3 border-b border-ink/10 px-4">
        <PixelMark grid className="h-5 w-auto shrink-0 text-accent" />
        <Command.Input
          placeholder="Where to?"
          className="h-14 w-full bg-transparent font-display text-body text-ink outline-none placeholder:text-muted"
        />
      </div>

      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain p-2">
        <Command.Empty className="px-3 py-6 text-center text-small text-muted">
          Nothing matches that.
        </Command.Empty>

        <Command.Group heading="Navigate" className={GROUP}>
          {PAGES.map(({ label, to }) => (
            <MenuItem key={to} onSelect={() => go(to)} icon={<ArrowRight size={16} aria-hidden />}>
              {label}
            </MenuItem>
          ))}
        </Command.Group>

        <Command.Group heading="Contact" className={GROUP}>
          <MenuItem
            value="Email copy address"
            onSelect={copyEmail}
            icon={copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          >
            <span className="flex-1">Email</span>
            <span className="font-mono text-[0.75rem] text-muted">{copied ? 'Copied' : EMAIL}</span>
          </MenuItem>
          <MenuItem
            value="GitHub"
            onSelect={() => openExternal(GITHUB_URL)}
            icon={<GitHubIcon size={16} />}
          >
            GitHub
          </MenuItem>
          <MenuItem
            value="LinkedIn"
            onSelect={() => openExternal(LINKEDIN_URL)}
            icon={<LinkedInIcon size={16} />}
          >
            LinkedIn
          </MenuItem>
        </Command.Group>
      </Command.List>

      {/* Announces the copy confirmation to screen readers. */}
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied' : ''}
      </p>
    </Command.Dialog>
  )
}

const GROUP =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-muted'

interface MenuItemProps {
  children: ReactNode
  icon: ReactNode
  onSelect: () => void
  value?: string
}

function MenuItem({ children, icon, onSelect, value }: MenuItemProps) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 font-display text-ink data-[selected=true]:bg-level-0"
    >
      <span className="text-muted">{icon}</span>
      {children}
    </Command.Item>
  )
}
