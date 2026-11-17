import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts: Space Grotesk for everything, JetBrains Mono for tiny labels.
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
