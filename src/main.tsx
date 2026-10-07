import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { SchoolStoreProvider } from './context/SchoolStoreProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SchoolStoreProvider>
      <App />
    </SchoolStoreProvider>
  </StrictMode>,
)
