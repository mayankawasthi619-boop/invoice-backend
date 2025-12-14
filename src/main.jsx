import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import About from './pages/About'
import Feedback from './pages/Feedback'
import Invoice from './pages/Invoice'
import './index.css'

function App(){
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/register">Registration</Link>
        <Link to="/invoice">Invoice</Link>
        <Link to="/about">About Us</Link>
        <Link to="/feedback">Feedback</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/feedback" element={<Feedback/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
