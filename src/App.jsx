// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
 

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
