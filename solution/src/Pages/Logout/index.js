import React, { useEffect } from 'react'

const Logout = ({ history, ...props }) => {
  useEffect(() => {
    localStorage.clear()
    history.push('/login')
  }, [])
  return (
    < >
    </ >
  )
}

export default Logout
