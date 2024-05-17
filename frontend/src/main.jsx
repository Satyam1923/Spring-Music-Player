import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './HomePage.jsx'
import About from './components/About/About.jsx'
import FAQ from './components/FAQ/FAQ.jsx'
import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements, createRoutesFromChildren } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
    <Route path='/' element={<HomePage/>}/>
    <Route path='about' element={<About/>}/>
    <Route path="faq" element={<FAQ />} />
    <Route path="app" element={<App />} />

    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
