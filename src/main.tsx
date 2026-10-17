import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { initAnalytics } from './lib/analytics'
import { LangProvider } from './lib/i18n'
import './index.css'

initAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LangProvider>
      <App />
    </LangProvider>
  </BrowserRouter>
)
