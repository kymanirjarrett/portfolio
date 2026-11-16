import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CommandMenuProvider, useCommandMenu } from '@/contexts/CommandMenuContext'

function Trigger() {
  const { toggle } = useCommandMenu()
  return (
    <button type="button" onClick={toggle}>
      Open menu
    </button>
  )
}

function renderMenu() {
  return render(
    <MemoryRouter>
      <CommandMenuProvider>
        <Trigger />
      </CommandMenuProvider>
    </MemoryRouter>
  )
}

describe('CommandMenu', () => {
  it.each([
    ['⌘K', '{Meta>}k{/Meta}'],
    ['Ctrl+K', '{Control>}k{/Control}'],
  ])('opens with %s and closes with Escape', async (_name, keys) => {
    const user = userEvent.setup()
    renderMenu()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.keyboard(keys)
    const dialog = await screen.findByRole('dialog', { name: 'Command menu' })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /Projects/ })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /LinkedIn/ })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('returns focus to the trigger when it closes', async () => {
    const user = userEvent.setup()
    renderMenu()
    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    await screen.findByRole('dialog', { name: 'Command menu' })
    expect(trigger).not.toHaveFocus()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())
  })
})
