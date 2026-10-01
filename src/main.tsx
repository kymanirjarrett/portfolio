import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts. wdth.css carries both the weight and width axes.
import '@fontsource-variable/mona-sans/wdth.css'
import '@fontsource-variable/atkinson-hyperlegible-next'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
