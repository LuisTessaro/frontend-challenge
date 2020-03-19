import React, { useState, createContext } from "react";

const ModalContext = createContext();

export function ModalProvider(props) {
  const [isOpen, setOpen] = useState(false)
  const [callbacks, setCallbacks] = useState({
    onComplete: null,
    onClose: null
  })
  const [data, setData] = useState({})

  function open(data, onComplete, onClose = null) {
    setData(data)
    setCallbacks({ onComplete: onComplete, onClose: onClose })
    setOpen(true)
  }

  function close() {
    setOpen(false)
  }

  function getProps() {
    return {
      isOpen,
      onClose: callbacks.onClose,
      onComplete: callbacks.onComplete,
      data,
      open,
      close
    }
  }

  return (
    <ModalContext.Provider
      value={{
        // MARK: Data
        isOpen,
        data,
        // MARK: Functions
        open,
        close,

        setOpen,
        getProps
      }}
      {...props}
    />
  )
}

export function useModal() {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}