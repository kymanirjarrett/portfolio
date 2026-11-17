import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Tooltip from '@/components/Tooltip'

function renderTooltip() {
  render(
    <>
      <button type="button">Before</button>
      <Tooltip label="GitHub">
        <a href="https://example.com" aria-label="GitHub">
          icon
        </a>
      </Tooltip>
    </>
  )
  const bubble = screen.getByText('GitHub', { selector: 'span' }).parentElement!
  return { link: screen.getByRole('link', { name: 'GitHub' }), bubble }
}

describe('Tooltip', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }))
  afterEach(() => vi.useRealTimers())

  it('opens after a short hover delay and closes when the pointer leaves', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const { link, bubble } = renderTooltip()

    await user.hover(link)
    expect(bubble).toHaveAttribute('data-open', 'false')
    act(() => vi.advanceTimersByTime(300))
    expect(bubble).toHaveAttribute('data-open', 'true')

    await user.unhover(link)
    expect(bubble).toHaveAttribute('data-open', 'false')
  })

  it('opens on keyboard focus and closes on Escape', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const { bubble } = renderTooltip()

    await user.tab()
    await user.tab()
    act(() => vi.advanceTimersByTime(10))
    expect(bubble).toHaveAttribute('data-open', 'true')

    await user.keyboard('{Escape}')
    expect(bubble).toHaveAttribute('data-open', 'false')
  })

  it('is hidden from screen readers, since the control already has the name', () => {
    const { bubble } = renderTooltip()
    expect(bubble).toHaveAttribute('aria-hidden', 'true')
  })
})
