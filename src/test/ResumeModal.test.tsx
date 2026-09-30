import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ResumeModal from '@/components/ResumeModal'

vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => true }))

function renderModal(open: boolean, onClose = vi.fn()) {
  return { onClose, ...render(<ResumeModal open={open} onClose={onClose} />) }
}

describe('ResumeModal', () => {
  it('renders nothing when closed', () => {
    renderModal(false)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows the dialog when open', () => {
    renderModal(true)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText('Resume preview')).toBeInTheDocument()
  })

  it('has a download link pointing to /resume.pdf', () => {
    renderModal(true)
    const links = screen.getAllByRole('link', { name: /download/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute('href', '/resume.pdf')
    expect(links[0]).toHaveTextContent('Download resume')
  })

  it('calls onClose when the close button is clicked', () => {
    const { onClose } = renderModal(true)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape is pressed', () => {
    const { onClose } = renderModal(true)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })
})
