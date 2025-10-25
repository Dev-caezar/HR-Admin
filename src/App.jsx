import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Element } from './router/Router'

const App = () => {
  return (
    <RouterProvider router={Element} />
  )
}

export default App