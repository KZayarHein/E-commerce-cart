import React from 'react'
import { customHook } from './context/StateContext'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'

import Cart from './pages/Cart'
import Detail from './pages/Detail'

const App = () => {
  
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default App