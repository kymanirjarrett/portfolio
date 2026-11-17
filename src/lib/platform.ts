/** True on Apple platforms, where the command menu shortcut is ⌘K rather than Ctrl+K. */
export function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const platform = nav.userAgentData?.platform ?? navigator.platform ?? ''
  return /mac|iphone|ipad|ipod/i.test(platform)
}

/** ⌘K on Apple platforms, Ctrl+K elsewhere. Either combination works everywhere, as in most apps. */
export function isCommandMenuShortcut(e: KeyboardEvent): boolean {
  return (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k'
}
