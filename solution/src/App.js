import React from 'react'
import Router from './Router'

import './Styles/main.scss'
import { ModalProvider } from './Hooks/useModal'


function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Router />
      </ModalProvider>
    </div>
  )
}

export default App
