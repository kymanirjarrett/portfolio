/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import ResumeModal from '@/components/ResumeModal'

const ResumeModalContext = createContext({ openModal: () => {} })
export const useResumeModal = () => useContext(ResumeModalContext)

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <ResumeModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </ResumeModalContext.Provider>
  )
}
