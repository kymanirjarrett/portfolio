import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import ExperiencePage from '@/pages/ExperiencePage'
import { experience } from '@/data/experience'
import { sphereLogos } from '@/data/sphereLogos'

vi.mock('@/hooks/useWebGL', () => ({ useWebGL: () => false }))

function renderPage() {
  return render(
    <MemoryRouter>
      <ExperiencePage />
    </MemoryRouter>
  )
}

describe('ExperiencePage', () => {
  it('tells the story in order: education, then roles from oldest to newest', () => {
    renderPage()
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual([
      'University of Cincinnati',
      'Toyz Electronics',
      'UC IT Solutions Center',
      'The J.M. Smucker Company',
    ])
  })

  it('spells out both majors, the track, graduation, GPA, and every Dean’s List semester', () => {
    renderPage()
    expect(screen.getByText('B.Sc. in Information Technology')).toBeInTheDocument()
    expect(screen.getByText('Software Application Development track')).toBeInTheDocument()
    expect(screen.getByText('B.Sc. in Cybersecurity')).toBeInTheDocument()
    expect(screen.getByText('May 2028')).toBeInTheDocument()
    expect(screen.getByText('3.7')).toBeInTheDocument()
    for (const semester of ['Fall 2024', 'Summer 2025', 'Spring 2026', 'Fall 2026']) {
      expect(screen.getByText(semester)).toBeInTheDocument()
    }
    expect(screen.queryByText(/internship or co-op/i)).not.toBeInTheDocument()
  })

  it('shows a flat sun without WebGL', () => {
    renderPage()
    expect(screen.getByTestId('flat-sun')).toBeInTheDocument()
    expect(document.querySelector('canvas')).not.toBeInTheDocument()
  })

  it('only names sun logos that exist on the sphere', () => {
    const names = new Set(sphereLogos.map((l) => l.name))
    for (const role of experience) {
      expect(role.sunLogos.length).toBeGreaterThan(0)
      role.sunLogos.forEach((name) => expect(names, `${role.id}: ${name}`).toContain(name))
    }
  })
})
